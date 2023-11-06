import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface AmenityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'amenities'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class AmenityEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name: string;
}

export const AmenityModel = getModelForClass(AmenityEntity);
