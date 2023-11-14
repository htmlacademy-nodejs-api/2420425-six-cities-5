import { DocumentType } from '@typegoose/typegoose';
import { Amenity } from '../../types/index.js';
import { AmenityEntity } from './amenity.entity.js';
import { CreateAmenityDto } from './dto/index.js';

export interface AmenityService {
  create(dto: CreateAmenityDto): Promise<DocumentType<AmenityEntity>>;
  findOrCreate(dto: CreateAmenityDto): Promise<DocumentType<AmenityEntity>>
  findById(amenityId: string): Promise<DocumentType<AmenityEntity> | null>
  findByAmenityName(name: Amenity): Promise<DocumentType<AmenityEntity> | null>
  find(): Promise<DocumentType<AmenityEntity>[]>
}
