import { CityName } from './city-name.enum.js';

export type Coords = {
  latitude: string;
  longitude: string;
}

export type City = {
  id: string;
  name: CityName;
} & Coords;
