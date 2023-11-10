import { Amenity } from '../../../types/index.js';

export const CreateAmenityMessages = {
  name: {
    invalidFormat: `name must be one of these values: ${Object.values(Amenity).join(', ')}`,
  }
} as const;
