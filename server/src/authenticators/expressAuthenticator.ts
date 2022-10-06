import { Request } from 'express';
import { Role } from '../cfg';
import { reCaptchaService } from '../services/ReCaptchaService';
import { SessionService } from '../services/SessionService';

/**
 *
 * @param req `Express.Request`
 * @param securityName custom name of security method
 * @param _scopes unused (e.g. OAUTH2 needs this )
 * {@link https://tsoa-community.github.io/docs/authentication.html}
 */
export const expressAuthentication = async (
  req: Request,
  securityName: string,
  _scopes?: string[],
) => {
  try {
    switch (securityName) {
      case 'captcha':
        await validateCaptcha(req);
        break;
      case 'user':
        await validateAuthToken(req);
        break;
      case 'admin':
        await validateAdminPrivileges(req);
        break;
      case 'everyone':
      default:
        // OPEN THE GATES
        break;
    }
    console.log('✅ authentication successful!');
    return Promise.resolve({ success: true });
  } catch (err) {
    console.error('❌ authentication failed:', err);
    return Promise.reject(err);
  }
};

/**
 * validation for captcha (e.g. password reset & account creation)
 * @param req `Express.Request`
 */
const validateCaptcha = async (req: Request) => {
  const { recaptcha } = req.body;
  const isValidRecaptcha = await reCaptchaService.verifyResponseToken(
    recaptcha,
  );

  if (!isValidRecaptcha) {
    throw new Error('Invalid CAPTCHA!');
  }
};

/**
 * validation for the basic logged in users who provide an authtoken header
 * @param req `Express.Request`
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
    console.warn('❗ could not validate auth token', req);
  }

  throw Error('You are missing authorization!');
};

/**
 * validation for admin by checking their session role based on the provided authtoken header
 * @param req `Express.Request`
 */
const validateAdminPrivileges = async (req: Request) => {
  const session = await validateAuthToken(req);

  if (!session || !session.user || !session.user.isAdmin) {
    throw Error('Not enough privileges!');
  }
};
