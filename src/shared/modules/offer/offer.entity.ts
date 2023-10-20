import { getModelForClass, prop, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { CityName, Coords, Offer, OfferAmenity, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ required: true, trim: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, trim: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({ required: true })
  public city: CityName;

  @prop({ required: true })
  public preview: string;

  @prop({ required: true })
  public photos: string[];

  @prop({ required: true })
  public premium: boolean;

  @prop({ required: true })
  public favorite: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rate: number;

  @prop({ required: true })
  public type: OfferType;

  @prop({ required: true, min: 1, max: 8 })
  public rooms: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price: number;

  @prop({ required: true })
  public services: OfferAmenity[];

  @prop({ required: true })
  public author: UserEntity;

  @prop()
  public commentsCount?: number;

  @prop({ required: true })
  public coords: Coords;
}

export const OfferModel = getModelForClass(OfferEntity);
