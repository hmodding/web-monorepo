import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { cfg } from '../cfg';
import { AccountCreation } from '../entities/AccountCreation';
import { User } from '../entities/User';
import {
  AccountCreation as AccountCreationModel,
  User as UserModel,
} from '../_legacy/models';

export interface Replaces {
  [key: string]: string;
}

export class Mailer {
  private readonly opts: SMTPTransport.Options;
  private readonly transporter: Transporter;

  constructor(opts: SMTPTransport.Options) {
    this.opts = opts;
    this.transporter = nodemailer.createTransport(opts);
  }

  /**
   * Sent when the user requests a password-reset
   * @param user User
   * @param token string
   */
  async sendPasswordResetMail(
    user: UserModel | User,
    token: string,
  ): Promise<void> {
    const { email, username } = user;
    const baseUrl = cfg.frontendBaseUrl;
    const url = `${baseUrl}forgotpassword?token=${token}`;

    const mailData = {
      from: this.opts.from,
      to: email,
      subject: 'Password rest for raftmodding.com',
      text: this.loadTemplate('resetPassword.txt', { username, baseUrl, url }),
    };

    try {
      await this.transporter.sendMail(mailData);
    } catch (e) {
      console.error('failed to send reset-password-mail: ', e);
    }
  }

  async sendAccountCreationMail(
    accountCreation: AccountCreationModel | AccountCreation,
  ): Promise<void> {
    const { token, username, email } = accountCreation;
    const baseUrl = cfg.frontendBaseUrl;
    const url = `${baseUrl}signup?token=${token}`;

    const mailData = {
      from: this.opts.from,
      to: email,
      subject: `Account confirmation for user ${username} on the RaftModding site`,
      text: this.loadTemplate('accountCreation.txt', {
        username,
        baseUrl,
        email,
        url,
      }),
    };

    try {
      await this.transporter.sendMail(mailData);
    } catch (e) {
      console.error('failed to send reset-password-mail: ', e);
    }
  }

  private loadTemplate(filename: string, replaces: Replaces) {
    const file = path.join(__dirname, 'templates', filename);

    if (!fs.existsSync(file)) {
      throw new Error('given template not found!');
    }

    let template = fs.readFileSync(file, { encoding: 'utf-8' });

    if (replaces && Object.keys(replaces)) {
      const keys = Object.keys(replaces);

      keys.forEach((key: string) => {
        template = template.replace(`{{ ${key} }}`, replaces[key]);
      });
    }

    return template;
  }
}

export const mailer = new Mailer(cfg.mailConfig);
