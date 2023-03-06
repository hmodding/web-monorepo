// noinspection JSUnusedGlobalSymbols

import {Request as ExpressRequest} from 'express';
import {reCaptchaService} from '../services/ReCaptchaService';
import jwt, {JwtPayload, TokenExpiredError} from "jsonwebtoken";
import {cfg} from "../cfg";
import {AuthenticationError} from "../errors/AuthenticationError";
import {ApiRequest} from "ApiRequest";
import {AuthtokenPayload} from "AuthtokenPayload";

/**
 *
 * @param req
 * @param securityName custom name of security method
 * @param scopes for auth_token can have the scope "user" or "admin" (for now)
 * {@link https://tsoa-community.github.io/docs/authentication.html}
 */
export const expressAuthentication = async (
  req: ApiRequest,
  securityName: string,
  scopes?: string[],
) => {
  try {
    const authtoken = req.headers.authtoken as string;
    switch (securityName) {
      case 'captcha':
        await validateCaptcha(req);
        break;
      case 'auth_token':
        req.jwt = await verifyAuthtoken(authtoken);
        break;
      default: // OPEN THE GATES
        break;
    }
    console.log('    🔑 authentication successful!');
    return Promise.resolve({success: true});
  } catch (err: unknown) {
    const authErr = err as AuthenticationError;
    console.error('    🔒 authentication failed:', authErr.details);
    return Promise.reject(authErr);
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
    throw new AuthenticationError('Invalid CAPTCHA!');
  }
};

const verifyAuthtoken = async (authtoken: string): Promise<AuthtokenPayload> => {
  const token = authtoken.substring(8); //remove starting 'Bearer: '
  try {
    const payload = jwt.verify(token, cfg.server.jwtSecret);
    if (!payload) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error("Invalid token!");
    }
    return payload as AuthtokenPayload;
  } catch (err: unknown) {
    const error = err as Error;
    throw new AuthenticationError(error.message, err instanceof TokenExpiredError);
  }
}

/**
 * validation for the basic logged-in users who provide an authtoken header
 * @param jwtPayload JwtPayload | string
 */
const validateUserPrivileges = async (jwtPayload: JwtPayload | string) => {
  console.log('validate user privileges: ', jwtPayload);
  throw new AuthenticationError('User privileges check not implemented yet!');
};

/**
 * validation for admin by checking their session role based on the provided authtoken header
 * @param jwtPayload JwtPayload | string
 */
const validateAdminPrivileges = async (jwtPayload: JwtPayload | string) => {
  console.log('validate admin privileges: ', jwtPayload);
  throw new AuthenticationError('Admin privileges check not implemented yet!');
};
