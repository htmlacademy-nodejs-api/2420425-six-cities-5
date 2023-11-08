import { Types } from 'mongoose';
import { CityName, Estate } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  /**
   * TODO - Исправить на объект с coords
   */
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
  public userId: Types.ObjectId;
}
