import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../comment.constant.js';

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `min is ${MIN_COMMENT_LENGTH}, max is ${MAX_COMMENT_LENGTH}`,
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
} as const;
