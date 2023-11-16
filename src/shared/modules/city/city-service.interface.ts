import { DocumentType } from '@typegoose/typegoose';
import { CityName } from '../../types/index.js';
import { CreateCityDto } from './dto/index.js';
import { CityEntity } from './city.entity.js';

export interface CityService {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>>
  findById(cityId: string): Promise<DocumentType<CityEntity> | null>
  findByCityName(name: CityName): Promise<DocumentType<CityEntity> | null>
  find(): Promise<DocumentType<CityEntity>[]>
}
