import { CityName } from '../../../types/index.js';

export const CreateCityMessages = {
  name: {
    invalidFormat: `City must be one of these values: ${Object.values(CityName).join(', ')}`,
  },
  latitude: {
    invalidFormat: 'Latitude must be a string',
  },
  longitude: {
    invalidFormat: 'longitude must be a string',
  },
} as const;
