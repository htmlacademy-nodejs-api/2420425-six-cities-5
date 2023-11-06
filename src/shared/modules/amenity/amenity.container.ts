import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { Controller } from '../../libs/rest/index.js';
import { AmenityService } from './amenity-service.interface.js';
import { AmenityEntity, AmenityModel } from './amenity.entity.js';
import { DefaultAmenityService } from './default-amenity.service.js';
import { AmenityController } from './amenity.controller.js';

export function createAmenityContainer() {
  const amenityContainer = new Container();

  amenityContainer.bind<AmenityService>(Component.AmenityService).to(DefaultAmenityService);
  amenityContainer.bind<types.ModelType<AmenityEntity>>(Component.AmenityModel).toConstantValue(AmenityModel);
  amenityContainer.bind<Controller>(Component.AmenityController).to(AmenityController).inSingletonScope();

  return amenityContainer;
}
