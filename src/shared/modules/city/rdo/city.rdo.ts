import { Expose } from 'class-transformer';

export class CityRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public latitude: string;

  @Expose()
  public longitude: string;
}
