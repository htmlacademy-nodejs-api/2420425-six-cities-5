import { IsEnum } from 'class-validator';
import { Amenity } from '../../../types/offer.enum.js';
import { CreateAmenityMessages } from './create-amenity.messages.js';

export class CreateAmenityDto {
  @IsEnum(Amenity, { message: CreateAmenityMessages.name.invalidFormat })
  public name: Amenity;
}
