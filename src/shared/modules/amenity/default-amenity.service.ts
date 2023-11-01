import { inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Amenity } from '../../types/index.js';
import { AmenityEntity } from './amenity.entity.js';
import { AmenityService } from './amenity-service.interface.js';
import { CreateAmenityDto } from './dto/create-amenity.dto.js';

export class DefaultAmenityService implements AmenityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.AmenityModel) private readonly amenityModel: types.ModelType<AmenityEntity>
  ) { }

  public async create(dto: CreateAmenityDto): Promise<DocumentType<AmenityEntity>> {
    const result = await this.amenityModel.create(dto);
    this.logger.info(`New amenity has created: ${dto.name}`);

    return result;
  }

  public async findByAmenityName(name: Amenity): Promise<DocumentType<AmenityEntity> | null> {
    return this.amenityModel.findOne({ name });
  }

  public async findByAmenityId(amenityId: string): Promise<DocumentType<AmenityEntity> | null> {
    return this.amenityModel.findById(amenityId);
  }

  public async findOrCreate(dto: CreateAmenityDto): Promise<DocumentType<AmenityEntity>> {
    const amenity = await this.findByAmenityName(dto.name);

    if(amenity) {
      return amenity;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<AmenityEntity>[]> {
    return this.amenityModel.find();
  }
}
