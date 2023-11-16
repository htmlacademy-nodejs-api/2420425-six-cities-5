import { IsEmail, IsString, Length } from 'class-validator';
import {
  MIN_USER_NAME_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_USER_PASSPORT_LENGTH,
  MAX_USER_PASSPORT_LENGTH,
} from '../user.constant.js';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(MIN_USER_PASSPORT_LENGTH, MAX_USER_PASSPORT_LENGTH, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
