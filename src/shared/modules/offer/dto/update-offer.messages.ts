import { Estate } from '../../../types/index.js';

export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    length: 'description length must be greater than 20 and less than 1024',
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
    invalidNumberOfPhoto: 'photos length must be 6',
  },
  premium: {
    invalidFormat: 'premium must be true or false'
  },
  favorite: {
    invalidFormat: 'favorite must be true or false'
  },
  rate: {
    invalidFormat: 'Rate must be an integer',
    minValue: 'Minimum rate is 1',
    maxValue: 'Maximum rate is 5',
  },
  type: {
    invalid: `type must be one of these values: ${Object.values(Estate).join(', ')}`,
  },
  rooms: {
    invalidFormat: 'Rooms must be an integer',
    minValue: 'Minimum rooms is 1',
    maxValue: 'Maximum rooms is 8',
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: 'Minimum guests is 1',
    maxValue: 'Maximum guests is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100 000',
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array',
    invalidId: 'Amenities field must be an array of valid id',
  },
} as const;
