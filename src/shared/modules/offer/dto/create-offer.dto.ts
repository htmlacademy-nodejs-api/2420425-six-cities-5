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
import {
  MIN_OFFER_TITLE_LENGTH,
  MAX_OFFER_TITLE_LENGTH,
  MIN_OFFER_DESCRIPTION_LENGTH,
  MAX_OFFER_DESCRIPTION_LENGTH,
  MIN_OFFER_RATE_NUMBER,
  MAX_OFFER_RATE_NUMBER,
  MIN_OFFER_ROOMS_COUNT,
  MAX_OFFER_ROOMS_COUNT,
  MIN_OFFER_GUESTS_COUNT,
  MAX_OFFER_GUESTS_COUNT,
  MIN_OFFER_PRICE,
  MAX_OFFER_PRICE,
  OFFER_PHOTOS_COUNT,
} from '../offer.constant.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(MIN_OFFER_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(MAX_OFFER_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @Length(MIN_OFFER_DESCRIPTION_LENGTH, MAX_OFFER_DESCRIPTION_LENGTH, {
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
  @ArrayMinSize(OFFER_PHOTOS_COUNT, { message: CreateOfferValidationMessage.photos.invalidNumberOfPhoto })
  @ArrayMaxSize(OFFER_PHOTOS_COUNT, { message: CreateOfferValidationMessage.photos.invalidNumberOfPhoto })
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
  @Min(MIN_OFFER_RATE_NUMBER, { message: CreateOfferValidationMessage.rate.minValue })
  @Max(MAX_OFFER_RATE_NUMBER, { message: CreateOfferValidationMessage.rate.maxValue })
  public rate: number;

  @IsEnum(Estate, { message: CreateOfferValidationMessage.type.invalid })
  public type: Estate;

  @IsInt({ message: CreateOfferValidationMessage.rooms.invalidFormat })
  @Min(MIN_OFFER_ROOMS_COUNT, { message: CreateOfferValidationMessage.rooms.minValue })
  @Max(MAX_OFFER_ROOMS_COUNT, { message: CreateOfferValidationMessage.rooms.maxValue })
  public rooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(MIN_OFFER_GUESTS_COUNT, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(MAX_OFFER_GUESTS_COUNT, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(MIN_OFFER_PRICE, { message: CreateOfferValidationMessage.price.minValue })
  @Max(MAX_OFFER_PRICE, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsMongoId({
    each: true,
    message: CreateOfferValidationMessage.amenities.invalidId,
  })
  public amenities: string[];

  public userId: string;
}
