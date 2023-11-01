import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Amenity } from '../../types/index.js';
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface AmenityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'amenities'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class AmenityEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, enum: Amenity })
  public name: Amenity;
}

export const AmenityModel = getModelForClass(AmenityEntity);
