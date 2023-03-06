import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { cfg } from '../cfg';
import { AccountCreation } from '../entities/AccountCreation';
import { User } from '../entities/User';
import { getResourcesPath } from '../utils';

export class MailerService {
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
  async sendPasswordResetMail(user: User, token: string): Promise<void> {
    const { email, username } = user;
    const baseUrl = cfg.vite.baseUrl;
    const brand = cfg.vite.brand;
    const url = `${baseUrl}forgotpassword?token=${token}`;

    const mailData = {
      from: this.opts.from,
      to: email,
      subject: `Password reset for ${brand}.com`,
      text: this.loadTemplate('resetPassword.txt', { username, baseUrl, url, brand }),
    };

    try {
      await this.transporter.sendMail(mailData);
    } catch (e) {
      console.error('failed to send reset-password-mail: ', e);
    }
  }

  async sendAccountCreationMail(
    accountCreation: AccountCreation,
  ): Promise<void> {
    const { token, username, email } = accountCreation;
    const baseUrl = cfg.vite.baseUrl;
    const brand = cfg.vite.brand;
    const url = `${baseUrl}signup?token=${token}`;

    const mailData = {
      from: this.opts.from,
      to: email,
      subject: `Account confirmation for user ${username} on the ${brand} site`,
      text: this.loadTemplate('accountCreation.txt', {
        username,
        baseUrl,
        email,
        url,
        brand,
      }),
    };

    try {
      await this.transporter.sendMail(mailData);
    } catch (e) {
      console.error('failed to send reset-password-mail: ', e);
    }
  }

  private loadTemplate(filename: string, replaces: Record<string, string>) {
    const file = path.join(getResourcesPath(), '/mailer/templates', filename);

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

export const mailer = new MailerService(cfg.mailConfig || {});
