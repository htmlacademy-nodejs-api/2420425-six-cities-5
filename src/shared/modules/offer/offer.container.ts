import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { DefaultOfferService } from './DefaultOfferService.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}