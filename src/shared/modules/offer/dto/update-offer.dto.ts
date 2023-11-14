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

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(MIN_OFFER_TITLE_LENGTH, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(MAX_OFFER_TITLE_LENGTH, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @Length(MIN_OFFER_DESCRIPTION_LENGTH, MAX_OFFER_DESCRIPTION_LENGTH, {
    message: UpdateOfferValidationMessage.description.length,
  })
  public description?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: UpdateOfferValidationMessage.postDate.invalidFormat }
  )
  public postDate?: Date;

  @IsOptional()
  @IsMongoId({
    message: UpdateOfferValidationMessage.city.invalidId,
  })
  public city?: string;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.preview.invalidFormat })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(OFFER_PHOTOS_COUNT, { message: UpdateOfferValidationMessage.photos.invalidNumberOfPhoto })
  @ArrayMaxSize(OFFER_PHOTOS_COUNT, { message: UpdateOfferValidationMessage.photos.invalidNumberOfPhoto })
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
  @Min(MIN_OFFER_RATE_NUMBER, { message: UpdateOfferValidationMessage.rate.minValue })
  @Max(MAX_OFFER_RATE_NUMBER, { message: UpdateOfferValidationMessage.rate.maxValue })
  public rate?: number;

  @IsOptional()
  @IsEnum(Estate, { message: UpdateOfferValidationMessage.type.invalid })
  public type?: Estate;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.rooms.invalidFormat })
  @Min(MIN_OFFER_ROOMS_COUNT, { message: UpdateOfferValidationMessage.rooms.minValue })
  @Max(MAX_OFFER_ROOMS_COUNT, { message: UpdateOfferValidationMessage.rooms.maxValue })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.guests.invalidFormat })
  @Min(MIN_OFFER_GUESTS_COUNT, { message: UpdateOfferValidationMessage.guests.minValue })
  @Max(MAX_OFFER_GUESTS_COUNT, { message: UpdateOfferValidationMessage.guests.maxValue })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(MIN_OFFER_PRICE, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(MAX_OFFER_PRICE, { message: UpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.amenities.invalidFormat })
  @IsMongoId({
    each: true,
    message: UpdateOfferValidationMessage.amenities.invalidId,
  })
  public amenities?: string[];
}
