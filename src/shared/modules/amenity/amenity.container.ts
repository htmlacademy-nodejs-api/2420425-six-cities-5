import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { AmenityService } from './amenity-service.interface.js';
import { AmenityEntity, AmenityModel } from './amenity.entity.js';
import { DefaultAmenityService } from './default-amenity.service.js';

export function createAmenityContainer() {
  const amenityContainer = new Container();

  amenityContainer.bind<AmenityService>(Component.AmenityService).to(DefaultAmenityService);
  amenityContainer.bind<types.ModelType<AmenityEntity>>(Component.AmenityModel).toConstantValue(AmenityModel);

  return amenityContainer;
}
