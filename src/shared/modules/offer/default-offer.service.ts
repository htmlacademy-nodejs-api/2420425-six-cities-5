import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { StatusCodes } from 'http-status-codes';
import { SortType } from '../../types/index.js';
import { AmenityEntity } from '../amenity/index.js';
import { CityEntity } from '../city/index.js';
import { Component } from '../../types/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.AmenityModel) private readonly amenityModel: types.ModelType<AmenityEntity>,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const foundAmenities = await this.amenityModel.find({ _id: { $in: dto.amenities }});
    if (foundAmenities.length !== dto.amenities.length) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Some amenities not exists', 'DefaultOfferService');
    }

    const city = await this.cityModel.findById(dto.city);
    if (!city) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'City does not exists', 'DefaultOfferService');
    }

    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId', 'amenities', 'city'])
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate(['userId', 'amenities', 'city'])
      .exec();
  }

  public async deleteById(offerId: string, userId: string): Promise<DocumentType<OfferEntity>> {
    const usersOffer = await this.offerModel
      .findOneAndDelete({ _id: offerId, userId })
      .exec();

    if (!usersOffer) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'You do not have access rights to the content', 'DefaultOfferService');
    }

    return usersOffer;
  }

  public async findByAmenityId(amenityId: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({ amenities: amenityId }, {}, { limit })
      .populate(['userId', 'amenities', 'city'])
      .exec();
  }

  public async findPremiumOffersByCityId(cityId: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_PREMIUM_OFFER_COUNT;
    return this.offerModel
      .find({ city: cityId, premium: true }, {}, { limit })
      .sort({ createdAt: SortType.Down })
      .populate(['userId', 'amenities', 'city'])
      .exec();
  }

  public async findFavoritesOffers(userId: string, count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ favorite: true, userId })
      .limit(count)
      .populate(['userId', 'amenities', 'city'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto, userId: string): Promise<DocumentType<OfferEntity>> {
    const usersOffer = await this.offerModel
      .findOneAndUpdate({ _id: offerId, userId }, dto, { new: true })
      .populate(['userId', 'amenities', 'city'])
      .exec();

    if (!usersOffer) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'You do not have access rights to the content', 'DefaultOfferService');
    }

    if (dto.amenities) {
      const foundAmenities = await this.amenityModel.find({ _id: { $in: dto.amenities }});
      if (foundAmenities.length !== dto.amenities.length) {
        throw new HttpError(StatusCodes.BAD_REQUEST, 'Some amenities not exists', 'DefaultOfferService');
      }
    }

    return usersOffer;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }
      }).exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate(['userId', 'amenities', 'city'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['userId', 'amenities', 'city'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: documentId })) !== null;
  }
}
