// noinspection JSUnusedGlobalSymbols

import {Request as ExpressRequest} from 'express';
import {reCaptchaService} from '../services/ReCaptchaService';
import {SessionService} from "../services/SessionService";

/**
 *
 * @param req
 * @param securityName custom name of security method
 * @param scopes for api_key can be "user" or "admin"
 * {@link https://tsoa-community.github.io/docs/authentication.html}
 */
export const expressAuthentication = async (
  req: ExpressRequest,
  securityName: string,
  scopes?: string[],
) => {
  try {
    switch (securityName) {
      case 'captcha':
        await validateCaptcha(req);
        break;
      case 'api_key':
        await validateApiKey(req, scopes)
        break;
      case 'everyone':
      default:
        // OPEN THE GATES
        break;
    }
    console.log('    🔑 authentication successful!');
    return Promise.resolve({success: true});
  } catch (err) {
    console.error('    🔒 authentication failed:', err);
    return Promise.reject(err);
  }
};

/**
 * validation for captcha (e.g. password reset & account creation)
 * @param req
 */
const validateCaptcha = async (req: ExpressRequest) => {
  const {recaptcha} = req.body;
  const isValidRecaptcha = await reCaptchaService.verifyResponseToken(
    recaptcha,
  );

  if (!isValidRecaptcha) {
    throw new Error('Invalid CAPTCHA!');
  }
};

const validateApiKey = async (req: ExpressRequest, scopes: string[] = []) => {
  if (scopes.includes('admin')) {
    await validateAdminPrivileges(req);
  } else if (scopes.includes('user')) {
    await validateAuthToken(req);
  }
}

/**
 * validation for the basic logged-in users who provide an authtoken header
 * @param req
 */
const validateAuthToken = async (req: ExpressRequest) => {
  const {authtoken} = req.headers;

  try {
    const session = await SessionService.getBySid(authtoken as string);

    if (session && session.token === authtoken && session.user) {
      if (session.user.role !== 'UNFINISHED') {
        return session;
      }
    }
  } catch (e) {
    console.warn('❗ could not validate auth token', req);
  }

  throw Error('You are missing authorization!');
};

/**
 * validation for admin by checking their session role based on the provided authtoken header
 * @param req
 */
const validateAdminPrivileges = async (req: ExpressRequest) => {
  const session = await validateAuthToken(req);

  if (!session || !session.user || !session.user.isAdmin) {
    throw Error('Not enough privileges!');
  }
};
