import { CityName, Offer, OfferService, OfferType, User, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    email,
    avatarPath,
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
    offerType,
    rooms,
    guests,
    price,
    services,
    coords,
  ] = offerData.replace('\n', '').split('\t');

  const user: User = {
    name,
    email,
    avatarPath,
    type: UserType[userType as keyof typeof UserType],
  };

  const [latitude, longitude] = coords.split(',');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: CityName[city as keyof typeof CityName],
    preview,
    photos: photos.split(';'),
    premium: premium === 'false',
    favorite: favorite === 'false',
    rate: Number(rate),
    type: OfferType[offerType as keyof typeof OfferType],
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number.parseInt(price, 10),
    services: services.split(';') as OfferService[],
    author: user,
    coords: {
      latitude,
      longitude,
    },
  };
}
