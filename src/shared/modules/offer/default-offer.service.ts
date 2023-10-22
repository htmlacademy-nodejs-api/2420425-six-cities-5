import { inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { CreateOfferDto } from './index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';


export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
