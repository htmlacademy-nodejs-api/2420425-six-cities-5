import { DocumentType } from '@typegoose/typegoose';
import { CityName } from '../../types/city-name.enum.js';
import { CreateCityDto } from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityService {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>>
  findById(cityId: string): Promise<DocumentType<CityEntity> | null>
  findByCityName(name: CityName): Promise<DocumentType<CityEntity> | null>
  find(): Promise<DocumentType<CityEntity>[]>
}
