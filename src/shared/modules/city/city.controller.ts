import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestQuery,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo, OfferService } from '../offer/index.js';
import { CityService } from './city-service.interface.js';
import { CreateCityDto } from './dto/index.js';
import { CityRdo } from './rdo/index.js';
import { ParamCityId } from './types/index.js';

@injectable()
export class CityController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CityService) private readonly cityService: CityService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    this.addRoute({
      path: '/:cityId/offers',
      method: HttpMethod.Get,
      handler: this.getPremiumOffersByCityId,
      middlewares: [new ValidateObjectIdMiddleware('cityId')],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const responseData = fillDTO(CityRdo, cities);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>,
    res: Response
  ): Promise<void> {

    const existsCity = await this.cityService.findByCityName(body.name);

    if (existsCity) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `City with name «${body.name}» exists.`,
        'CityController'
      );
    }

    const result = await this.cityService.create(body);
    this.created(res, fillDTO(CityRdo, result));
  }

  public async getPremiumOffersByCityId(
    { params, query }: Request<ParamCityId, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.findPremiumOffersByCityId(params.cityId, query.limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
