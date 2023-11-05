import { DocumentType } from '@typegoose/typegoose';
import { CreateAmenityDto } from './dto/create-amenity.dto.js';
import { AmenityEntity } from './amenity.entity.js';
import { Amenity } from '../../types/offer.enum.js';

export interface AmenityService {
  create(dto: CreateAmenityDto): Promise<DocumentType<AmenityEntity>>;
  findOrCreate(dto: CreateAmenityDto): Promise<DocumentType<AmenityEntity>>
  findById(amenityId: string): Promise<DocumentType<AmenityEntity> | null>
  findByAmenityName(name: Amenity): Promise<DocumentType<AmenityEntity> | null>
  find(): Promise<DocumentType<AmenityEntity>[]>
}
