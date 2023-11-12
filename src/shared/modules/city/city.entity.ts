import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public latitude: string;

  @prop({ required: true })
  public longitude: string;
}

export const CityModel = getModelForClass(CityEntity);
