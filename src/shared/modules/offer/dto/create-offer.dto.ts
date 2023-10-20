import { CityName, Coords, OfferAmenity, OfferType } from '../../../types/index.js';
import { UserEntity } from '../../user/user.entity.js';

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
  public type: OfferType;
  public rooms: number;
  public guests: number;
  public price: number;
  public services: OfferAmenity[];
  public author: UserEntity;
  public coords: Coords;
}