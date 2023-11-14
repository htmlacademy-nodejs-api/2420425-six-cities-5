import { CityName } from './city-name.enum.js';
import { Coords } from './city.type.js';
import { Amenity, Estate } from './offer.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityName;
  preview: string;
  photos: string[];
  premium: boolean;
  favorite: boolean;
  rate: number;
  type: Estate;
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  user: User;
  commentsCount?: number;
  coords: Coords;
}
