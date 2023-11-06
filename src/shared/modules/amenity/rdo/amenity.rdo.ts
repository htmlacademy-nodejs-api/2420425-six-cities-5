import { Expose } from 'class-transformer';

export class AmenityRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;
}
