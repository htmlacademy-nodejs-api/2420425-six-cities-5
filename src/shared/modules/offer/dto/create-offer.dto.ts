import { Types } from 'mongoose';
import { CityName, Coords, Amenity, Estate } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: CityName;
  public preview: string;
  public photos: string[];
  public premium: boolean;
  public favorite: boolean;
  public rate: number;
  public type: Estate;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: Amenity[];
  public userId: Types.ObjectId;
  public coords: Coords;
}
