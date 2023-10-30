import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { CityName, MockServerData, OfferAmenity, Estate, UserType } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { CITIES } from '../../constants/coords.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_RATE = 1;
const MAX_RATE = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const photos = getRandomItems(this.mockData.photos);
    const preview = getRandomItem(this.mockData.previews);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const userType = getRandomItem(Object.keys(UserType));
    const city = getRandomItem(Object.keys(CityName) as CityName[]);
    const premium = getRandomItem([true, false]);
    const favorite = getRandomItem([true, false]);
    const rooms = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    const rate = generateRandomValue(MIN_RATE, MAX_RATE);
    const offerType = getRandomItem(Object.keys(Estate));
    const guests = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    const services = getRandomItems(Object.keys(OfferAmenity));
    const coords = CITIES[city];

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const offer = {
      name,
      email,
      avatar,
      userType,
      title,
      description,
      postDate,
      city,
      preview,
      photo: photos.join(';'),
      premium,
      favorite,
      rate,
      offerType,
      rooms,
      guests,
      price,
      services: services.join(';'),
      coords: Object.values(coords).join(','),
    };

    return Object.values(offer).join('\t');
  }
}
