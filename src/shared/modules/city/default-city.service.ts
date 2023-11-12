import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';
import { CityName, Component } from '../../types/index.js';
import { CityService } from './city-service.interface.js';
import { CityEntity } from './city.entity.js';
import { CreateCityDto } from './dto/create-city.dto.js';

@injectable()
export class DefaultCityService implements CityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) { }

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city has created: ${dto.name}`);

    return result;
  }

  public async findByCityName(name: CityName): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name });
  }

  public async findById(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId);
  }

  public async findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const city = await this.findByCityName(dto.name);

    if (city) {
      return city;
    }

    return this.create(dto);
  }

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel.find();
  }
}
