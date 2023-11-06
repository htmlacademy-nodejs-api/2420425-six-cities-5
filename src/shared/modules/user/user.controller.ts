import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { BaseController, HttpMethod, TypedRequst } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CreateUserDto } from './index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public create(
    _req: TypedRequst<CreateUserDto>,
    _res: Response
  ): void {
    throw new Error('[UserController] Oops');
  }
}
