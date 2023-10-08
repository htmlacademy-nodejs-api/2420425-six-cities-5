import { Container } from 'inversify';
import { RestApplication } from './rest/rest.application.js';
import { RestConfig } from './shared/libs/config/rest.config.js';
import { Component } from './shared/types/component.enum.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { Config, RestSchema } from './shared/libs/config/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication);
  container.bind<Logger>(Component.Logger).to(PinoLogger);
  container.bind<Config<RestSchema>>(Component.RestApplication).to(RestConfig);

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
