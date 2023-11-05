import { Types } from 'mongoose';
import { CityName, Estate } from '../../../types/index.js';

export class UpdateOfferDto {
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
  public amenities: Types.ObjectId[];
}
