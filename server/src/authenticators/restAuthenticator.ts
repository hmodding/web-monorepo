import { Request } from 'express';
import { Role } from '../cfg';
import { reCaptchaClient } from '../ReCaptchaClient';
import { SessionService } from '../services/SessionService';

export const RestAuthenticator = async (req: Request, securityName: string) => {
  switch (securityName) {
    case 'captcha':
      validateCaptcha(req);
      break;
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
 * validation for captcha (e.g. password reset & account creation)
 * @param req
 */
const validateCaptcha = async (req: Request) => {
  const { recaptcha } = req.body;
  const isValidRecaptcha = await reCaptchaClient.verifyResponseToken(recaptcha);

  if (!isValidRecaptcha) {
    throw new Error('Invalid CAPTCHA!');
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
      if (session.user.role !== Role.Unfinished) {
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
