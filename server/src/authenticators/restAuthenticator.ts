import { Request } from 'express';
import { Role } from '../cfg';
import { SessionService } from '../services/SessionService';

export const RestAuthenticator = async (req: Request, securityName: string) => {
  switch (securityName) {
    case 'user':
      validateAuthToken(req);
      break;
    case 'admin':
      validateAdminPrivileges(req);
      break;
    case 'everyone':
    default:
      // OPEN THE GATES
      break;
  }
};

/**
 * validation for the basic logged in users who provide an authtoken header
 * @param req
 */
const validateAuthToken = async (req: Request) => {
  const { authtoken } = req.headers;

  try {
    const session = await SessionService.getByToken(authtoken as string);

    if (session && session.token === authtoken && session.user) {
      if (session.user.role !== Role.UNFINISHED) {
        return session;
      }
    }
  } catch (e) {
    console.warn('could not validate auth token', req);
  }

  throw Error('You are missing authorization!');
};

/**
 * validation for admin by checking their session role based on the provided authtoken header
 * @param req
 */
const validateAdminPrivileges = async (req: Request) => {
  const session = await validateAuthToken(req);

  if (!session || !session.user || !session.user.isAdmin) {
    throw Error('Not enough privileges!');
  }
};
