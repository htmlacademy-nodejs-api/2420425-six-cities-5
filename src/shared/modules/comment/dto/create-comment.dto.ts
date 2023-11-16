import { IsMongoId, IsString, Length } from 'class-validator';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../comment.constant.js';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, {
    message: CreateCommentMessages.text.lengthField,
  })
  public text: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  public userId: string;
}
