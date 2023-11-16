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

export const CreateOfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${MIN_OFFER_TITLE_LENGTH}`,
    maxLength: `Maximum title length must be ${MAX_OFFER_TITLE_LENGTH}`,
  },
  description: {
    length: `description length must be greater than ${MIN_OFFER_DESCRIPTION_LENGTH} and less than ${MAX_OFFER_DESCRIPTION_LENGTH}`,
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalidId: 'City field must be a valid id',
  },
  preview: {
    invalidFormat: 'preview must be a string',
  },
  photos: {
    invalidFormat: 'photos must be an array',
    invalidPhotoFormat: 'photo must be a string',
    invalidNumberOfPhoto: `photos length must be ${OFFER_PHOTOS_COUNT}`,
  },
  premium: {
    invalidFormat: 'premium must be true or false'
  },
  favorite: {
    invalidFormat: 'favorite must be true or false'
  },
  rate: {
    invalidFormat: 'Rate must be an integer',
    minValue: `Minimum rate is ${MIN_OFFER_RATE_NUMBER}`,
    maxValue: `Maximum rate is ${MAX_OFFER_RATE_NUMBER}`,
  },
  type: {
    invalid: `type must be one of these values: ${Object.values(Estate).join(', ')}`,
  },
  rooms: {
    invalidFormat: 'Rooms must be an integer',
    minValue: `Minimum rooms is ${MIN_OFFER_ROOMS_COUNT}`,
    maxValue: `Maximum rooms is ${MAX_OFFER_ROOMS_COUNT}`,
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: `Minimum guests is ${MIN_OFFER_GUESTS_COUNT}`,
    maxValue: `Maximum guests is ${MAX_OFFER_GUESTS_COUNT}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${MIN_OFFER_PRICE}`,
    maxValue: `Maximum price is ${MAX_OFFER_PRICE}`,
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array',
    invalidId: 'Amenities field must be an array of valid id',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
