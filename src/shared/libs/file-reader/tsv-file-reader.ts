import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { CityName, Offer, OfferService, OfferType, UserType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        name,
        email,
        avatarPath,
        password,
        userType,
        title,
        description,
        postDate,
        city,
        preview,
        photos,
        premium,
        favorite,
        rate,
        type,
        rooms,
        guests,
        price,
        services,
        coords,
      ]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: CityName[city as keyof typeof CityName],
        preview,
        photos: photos.split(';'),
        premium: premium === 'true',
        favorite: favorite === 'true',
        rate: Number(rate),
        type: OfferType[type as keyof typeof OfferType],
        rooms: Number(rooms),
        guests: Number(guests),
        price: Number.parseInt(price, 10),
        author: { name, email, password, avatarPath, type: UserType[userType as keyof typeof UserType] },
        services: services.split(';') as OfferService[],
        coords: {
          latitude: coords.split(';')[0],
          longitude: coords.split(';')[1],
        },
      }));
  }
}
