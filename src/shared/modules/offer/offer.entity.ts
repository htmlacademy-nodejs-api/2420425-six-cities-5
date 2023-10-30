import { getModelForClass, prop, defaultClasses, modelOptions, Ref, mongoose } from '@typegoose/typegoose';
import { CityName, Coords, OfferAmenity, Estate } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ required: true, trim: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({ required: true, type: () => String, enum: CityName })
  public city: CityName;

  @prop({ required: true })
  public preview: string;

  @prop({ required: true })
  public photos: mongoose.Types.Array<string>;

  @prop({ required: true })
  public premium: boolean;

  @prop({ required: true })
  public favorite: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rate: number;

  @prop({ required: true, enum: Estate })
  public type: Estate;

  @prop({ required: true, min: 1, max: 8 })
  public rooms: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price: number;

  @prop({ required: true, type: String, default: [] })
  public services: mongoose.Types.Array<OfferAmenity>;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({ required: true })
  public coords: mongoose.Types.Array<Coords>;
}

export const OfferModel = getModelForClass(OfferEntity);
