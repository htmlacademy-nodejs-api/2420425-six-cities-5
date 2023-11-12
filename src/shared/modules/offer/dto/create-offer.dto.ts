import {
  MaxLength,
  MinLength,
  Length,
  IsDateString,
  IsEnum,
  IsArray,
  IsMongoId,
  IsInt,
  Min,
  Max,
  IsString,
  IsBoolean,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Estate } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @Length(20, 1024, {
    message: CreateOfferValidationMessage.description.length,
  })
  public description: string;

  @IsDateString(
    {},
    { message: CreateOfferValidationMessage.postDate.invalidFormat }
  )
  public postDate: Date;

  @IsMongoId({
    message: CreateOfferValidationMessage.city.invalidId,
  })
  public city: string;

  @IsString({ message: CreateOfferValidationMessage.preview.invalidFormat })
  public preview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.invalidNumberOfPhoto })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.invalidNumberOfPhoto })
  @IsString({
    each: true,
    message: CreateOfferValidationMessage.photos.invalidPhotoFormat
  })
  public photos: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.premium.invalidFormat })
  public premium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.favorite.invalidFormat })
  public favorite: boolean;

  @IsInt({ message: CreateOfferValidationMessage.rate.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rate.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rate.maxValue })
  public rate: number;

  @IsEnum(Estate, { message: CreateOfferValidationMessage.type.invalid })
  public type: Estate;

  @IsInt({ message: CreateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.rooms.maxValue })
  public rooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(200000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsMongoId({
    each: true,
    message: CreateOfferValidationMessage.amenities.invalidId,
  })
  public amenities: string[];

  public userId: string;
}
