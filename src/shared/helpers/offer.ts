import { CityName, Offer, Amenity, Estate, UserType } from '../types/index.js';

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
    amenities,
    coords,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
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
    type: Estate[offerType as keyof typeof Estate],
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number.parseInt(price, 10),
    amenities: amenities.split(';') as Amenity[],
    user: user,
    coords: {
      latitude,
      longitude,
    },
  };
}
