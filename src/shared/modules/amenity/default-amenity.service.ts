import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';
import { Amenity, SortType, Component } from '../../types/index.js';
import { AmenityEntity } from './amenity.entity.js';
import { AmenityService } from './amenity-service.interface.js';
import { CreateAmenityDto } from './dto/index.js';
import { MAX_AMENITIES_COUNT } from './amenity.constant.js';

@injectable()
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

  public async findById(amenityId: string): Promise<DocumentType<AmenityEntity> | null> {
    return this.amenityModel.findById(amenityId);
  }

  public async findOrCreate(dto: CreateAmenityDto): Promise<DocumentType<AmenityEntity>> {
    const amenity = await this.findByAmenityName(dto.name);

    if (amenity) {
      return amenity;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<AmenityEntity>[]> {
    return this.amenityModel
      .aggregate([
        {
          $lookup: {
            from: 'offers',
            let: { amenityId: '$_id' },
            pipeline: [
              { $match: { $expr: { $in: ['$$amenityId', '$amenities'] } } },
              { $project: { _id: 1 } }
            ],
            as: 'offers'
          },
        },
        {
          $addFields:
            { id: { $toString: '$_id' }, offerCount: { $size: '$offers' } }
        },
        { $unset: 'offers' },
        { $limit: MAX_AMENITIES_COUNT },
        { $sort: { offerCount: SortType.Down } }
      ]).exec();
  }
}
