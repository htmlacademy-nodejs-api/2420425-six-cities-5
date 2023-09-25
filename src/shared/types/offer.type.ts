import { CityName } from './city-name.enum.js';
import { Coords } from './city.type.js';
import { OfferService, OfferType } from './offer-type.enum.js';
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
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  services: OfferService[];
  author: User;
  commentsCount?: number;
  coords: Coords;
}
