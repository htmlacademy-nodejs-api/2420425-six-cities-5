import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  RequestQuery,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/common.js';
import { Component } from '../../types/index.js';
import { AmenityService } from './amenity-service.interface.js';
import { OfferService } from '../offer/index.js';
import { AmenityRdo } from './rdo/amenity.rdo.js';
import { CreateAmenityDto } from './dto/create-amenity.dto.js';
import { ParamAmenityId } from './types/index.js';
import { OfferRdo } from '../offer/rdo/offer.rdo.js';

@injectable()
export class AmenityController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.AmenityService) private readonly amenityService: AmenityService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for AmenityController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateAmenityDto),
      ],
    });
    this.addRoute({
      path: '/:amenityId/offers',
      method: HttpMethod.Get,
      handler: this.getOffersWithAmenity,
      middlewares: [new ValidateObjectIdMiddleware('amenityId')],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const amenities = await this.amenityService.find();
    const responseData = fillDTO(AmenityRdo, amenities);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateAmenityDto>,
    res: Response
  ): Promise<void> {

    const existCategory = await this.amenityService.findByAmenityName(body.name);

    if (existCategory) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Amenity with name «${body.name}» exists.`,
        'AmenityController'
      );
    }

    const result = await this.amenityService.create(body);
    this.created(res, fillDTO(AmenityRdo, result));
  }

  public async getOffersWithAmenity(
    { params, query }: Request<ParamAmenityId, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.findByAmenityId(params.amenityId, query.limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
