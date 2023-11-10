import { Types } from 'mongoose';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import { CityName, Estate } from '../../../types/index.js';


export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @Length(20, 1024, {
    message: UpdateOfferValidationMessage.description.length,
  })
  public description?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: UpdateOfferValidationMessage.postDate.invalidFormat }
  )
  public postDate?: Date;
  /**
   * TODO - Исправить на объект с coords
   * оставить только ссылку на сущность
   */

  @IsOptional()
  public city?: CityName;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.preview.invalidFormat })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: UpdateOfferValidationMessage.photos.invalidNumberOfPhoto })
  @ArrayMaxSize(6, { message: UpdateOfferValidationMessage.photos.invalidNumberOfPhoto })
  @IsString({
    each: true,
    message: UpdateOfferValidationMessage.photos.invalidPhotoFormat
  })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.premium.invalidFormat })
  public premium?: boolean;

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.favorite.invalidFormat })
  public favorite?: boolean;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.rate.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.rate.minValue })
  @Max(5, { message: UpdateOfferValidationMessage.rate.maxValue })
  public rate?: number;

  @IsOptional()
  @IsEnum(Estate, { message: UpdateOfferValidationMessage.type.invalid })
  public type?: Estate;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.rooms.maxValue })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.guests.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.guests.maxValue })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(200000, { message: UpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.amenities.invalidFormat })
  @IsMongoId({
    each: true,
    message: UpdateOfferValidationMessage.amenities.invalidId,
  })
  public amenities?: Types.ObjectId[];
}
