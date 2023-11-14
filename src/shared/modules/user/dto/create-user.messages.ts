import {
  MIN_USER_NAME_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_USER_PASSPORT_LENGTH,
  MAX_USER_PASSPORT_LENGTH,
} from '../user.constant.js';

export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatarPath: {
    invalidFormat: 'avatarPath is required',
  },
  name: {
    invalidFormat: 'name is required',
    lengthField: `min length is ${MIN_USER_NAME_LENGTH}, max is ${MAX_USER_NAME_LENGTH}`,
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `min length for password is ${MIN_USER_PASSPORT_LENGTH}, max is ${MAX_USER_PASSPORT_LENGTH}`
  },
} as const;
