import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { AmenityRdo } from '../../amenity/index.js';
import { CityRdo } from '../../city/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  @Type(() => CityRdo)
  public city: CityRdo;

  @Expose()
  public preview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favorite: boolean;

  @Expose()
  public rate: number;

  @Expose()
  public type: string;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  @Type(() => AmenityRdo)
  public amenities: AmenityRdo[];

  @Expose()
  public commentCount: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;
}
