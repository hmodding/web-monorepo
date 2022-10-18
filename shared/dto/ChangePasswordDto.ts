import { UserDto } from './UserDto';

export interface ChangePasswordDto extends Pick<UserDto, 'password'> {
  currentPassword: string;
  passwordConfirm: string;
}
