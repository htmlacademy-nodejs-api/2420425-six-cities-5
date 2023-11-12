import { IsEnum, IsString } from 'class-validator';
import { CreateCityMessages } from './create-city.messages.js';
import { CityName } from '../../../types/index.js';

export class CreateCityDto {
  @IsEnum(CityName, { message: CreateCityMessages.name.invalidFormat })
  public name: CityName;

  @IsString({ message: CreateCityMessages.latitude.invalidFormat })
  public latitude: string;

  @IsString({ message: CreateCityMessages.longitude.invalidFormat })
  public longitude: string;
}
