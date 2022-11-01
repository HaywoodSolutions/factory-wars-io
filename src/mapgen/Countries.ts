import countries from './countries.geo3.json';

export type Country = {
  name: string,
  code: string,
  bounds: {
    minLat: number,
    maxLat: number,
    minLng: number,
    maxLng: number
  },
  polygons: [number, number][][]
};

const processCountries = (c: any): Country => {
  const polygons = c.geometry.type == "Polygon" ? [c.geometry.coordinates.reduce((lss: [number, number][][], ls: any) => {
    lss.push(...ls.map((v: any) => [v[1], v[0]]));
    return lss;
  }, [])] : c.geometry.coordinates.reduce((lss: [number, number][][], ls: any) => {
    lss.push(...ls.map((v: any) => v.map((v: [number, number]) => [v[1], v[0]])));
    return lss;
  }, []);

  const lat = polygons.reduce((o: number[], l: any[]) => {
    o.push(...l.map(v => v[0]));
    return o;
  }, []);

  const lng = polygons.reduce((o: number[], l: any[]) => {
    o.push(...l.map(v => v[1]));
    return o;
  }, []);

  return {
    name: c.properties.ADMIN,
    code: c.properties.ISO_A3,
    bounds: {
      minLat: Math.min(...lat),
      maxLat: Math.max(...lat),
      minLng: Math.min(...lng),
      maxLng: Math.max(...lng),
    },
    polygons: polygons
  };
}

export const Countries: Country[] = ((countries as any).features.map(processCountries));

export const filterCountries = (latLng: {lat: number, lng: number}): Country[] => {
  return Countries.filter(v => {
    return v.bounds.minLat <= latLng.lat && v.bounds.maxLat >= latLng.lat && 
      v.bounds.minLng <= latLng.lng && v.bounds.maxLng >= latLng.lng;
  })
}

export const getCountryByCode = (id: string): Country => {
  return Countries.filter(v => v.code == id)[0]
};