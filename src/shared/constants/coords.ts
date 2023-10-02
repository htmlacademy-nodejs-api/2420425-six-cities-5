import { CityName, Coords } from '../types/index.js';

export const CITIES: { [Key in CityName]: Coords } = {
  [CityName.Amsterdam]: { latitude: '52.370216', longitude: '4.895168' },
  [CityName.Brussels]: { latitude: '50.846557', longitude: '4.351697' },
  [CityName.Cologne]: { latitude: '50.938361', longitude: '6.959974' },
  [CityName.Dusseldorf]: { latitude: '51.225402', longitude: '6.776314' },
  [CityName.Hamburg]: { latitude: '53.550341', longitude: '10.000654' },
  [CityName.Paris]: { latitude: '48.85661', longitude: '2.351499' }
};
