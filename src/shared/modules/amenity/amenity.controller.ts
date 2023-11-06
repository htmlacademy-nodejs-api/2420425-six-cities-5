import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { fillDTO } from '../../helpers/common.js';
import { Component } from '../../types/index.js';
import { AmenityService } from './amenity-service.interface.js';
import { AmenityRdo } from './rdo/amenity.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateAmenityDto } from './index.js';

@injectable()
export class AmenityController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.AmenityService) private readonly amenityService: AmenityService,
  ) {
    super(logger);

    this.logger.info('Register routes for AmenityController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
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
}
