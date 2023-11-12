import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import {
  createOffer,
  getErrorMessage,
  getMongoURI,
} from '../../shared/helpers/index.js';
import {
  DefaultUserService,
  UserModel,
  UserService,
} from '../../shared/modules/user/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/modules/offer/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Command } from './command.interface.js';
import { Offer } from '../../shared/types/index.js';
import {
  AmenityModel,
  DefaultAmenityService,
  AmenityService,
} from '../../shared/modules/amenity/index.js';
import {
  CityModel,
  CityService,
  DefaultCityService,
} from '../../shared/modules/city/index.js';

export class ImportCommand implements Command {
  private amenityService: AmenityService;
  private cityService: CityService;
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.amenityService = new DefaultAmenityService(this.logger, AmenityModel);
    this.cityService = new DefaultCityService(this.logger, CityModel);
    this.offerService = new DefaultOfferService(
      this.logger,
      OfferModel,
      AmenityModel
    );
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(
    line: string,
    resolve: () => void
  ): Promise<void> {
    const offer = createOffer(line);
    await this.saveOffer(offer);

    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  private async saveOffer(offer: Offer) {
    const offerUser = await this.userService.findOrCreate(
      {
        ...offer.user,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, amenities, city, coords, ...rest } = offer;

    const offerAmenities = await Promise.all(
      offer.amenities.map((amenity) =>
        this.amenityService.findOrCreate({ name: amenity })
      )
    );

    const offerCity = await this.cityService.findOrCreate({ name: city, ...coords });

    await this.offerService.create({
      ...rest,
      userId: offerUser.id,
      amenities: offerAmenities.map((amenity) => amenity.id),
      city: offerCity.id,
    });
  }

  /**
   * Команда для запуска
   *
   * -- --import './mocks/mock-data.tsv' 'admin_main' 'password' '127.0.0.1' 'main_db' 'secret'
   */
  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    const fileReader = new TSVFileReader(filename.trim());
    this.salt = salt;

    await this.databaseClient.connect(uri);

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error: unknown) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
