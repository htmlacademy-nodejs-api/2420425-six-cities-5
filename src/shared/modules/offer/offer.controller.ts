import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  TypedRequst,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService, CommentRdo } from '../comment/index.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { OfferRdo } from './rdo/index.js';
import { ParamOfferId } from './types/index.js';
import {
  DEFAULT_DISCUSSED_OFFER_COUNT,
  DEFAULT_FAVORITE_OFFER_COUNT,
  DEFAULT_NEW_OFFER_COUNT,
} from './offer.constant.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/bundles/new',
      method: HttpMethod.Get,
      handler: this.getNew,
    });
    this.addRoute({
      path: '/bundles/discussed',
      method: HttpMethod.Get,
      handler: this.getDiscussed,
    });
    this.addRoute({
      path: '/user/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });
  }

  public async show(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    { body, tokenPayload }: TypedRequst<CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      userId: tokenPayload.id,
    });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId, tokenPayload.id);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    { body, tokenPayload, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(
      params.offerId,
      body,
      tokenPayload.id,
    );
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getNew(_req: Request, res: Response) {
    const newOffers = await this.offerService.findNew(DEFAULT_NEW_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, newOffers));
  }

  public async getDiscussed(_req: Request, res: Response) {
    const discussedOffers = await this.offerService.findDiscussed(
      DEFAULT_DISCUSSED_OFFER_COUNT
    );
    this.ok(res, fillDTO(OfferRdo, discussedOffers));
  }

  public async getFavorites({ tokenPayload }: Request, res: Response) {
    const favoritesOffers = await this.offerService.findFavoritesOffers(
      tokenPayload.id,
      DEFAULT_FAVORITE_OFFER_COUNT
    );
    this.ok(res, fillDTO(OfferRdo, favoritesOffers));
  }
}
