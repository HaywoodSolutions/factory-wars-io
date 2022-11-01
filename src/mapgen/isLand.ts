import { isInsidePolygon } from './isInPolygon';
import { filterCountries } from './Countries';

export function isLand(point: {
  lat: number,
  lng: number
}): string | null {
  const countries = filterCountries(point);
  for (const country of countries) {
    for (let list of country.polygons) {
      if (isInsidePolygon(point, list)) {
        return country.code;
      }
    }
  }
  return null;
}

export function isLandInCountry(point: {
  lat: number,
  lng: number
}, country: any): string | null {
  for (let list of country.polygons) {
    if (isInsidePolygon(point, list)) {
      return country.code;
    }
  }
  return null;
}