import { AccountCreationDto } from '../../../shared/dto/AccountCreationDto';
import { AccountCreation } from '../entities/AccountCreation';
import { mailer } from './MailerService';
import { AbstractService } from './AbstractService';
import { UserService } from './UserService';

export class AccountCreationService extends AbstractService {
  static getByUsernameOrEmail(username: string, email: string) {
    return AccountCreation.createQueryBuilder()
      .where('username = :username OR email = :email', { username, email })
      .getOne();
  }

  static getByToken(token: string) {
    return AccountCreation.findOneBy({ token });
  }

  /**
   * create a new AccountCreation and send an email
   * @param data
   */
  static create(data: AccountCreationDto) {
    const accountCreation = AccountCreation.create(data as AccountCreation);

    mailer.sendAccountCreationMail(accountCreation);
  }

  /**
   * replace an account creation with an actual user to finish the registration process
   * @param data
   * @param token
   * @returns
   */
  static finishRegistration(data: AccountCreationDto, token: string) {
    AccountCreation.delete({ token });

    return UserService.create(data);
  }

  static async alreadyExists(username: string, email: string) {
    const existingUser = await UserService.getByUsernameOrEmail(
      username,
      email,
    );
    const existingAccountCreation = await AccountCreationService.getByUsernameOrEmail(
      username,
      email,
    );

    return existingUser || existingAccountCreation;
  }
}
