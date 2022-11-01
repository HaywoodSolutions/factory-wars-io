import { getCountryByCode } from "../../mapgen/Countries";
import { isLandInCountry } from "../../mapgen/isLand";
import Projection from "../../mapgen/Projection";
import { createRoom } from "./Example";

export const CountryTile = (countryId: string) => {
	const xs: number[] = [];
	const ys: number[] = [];

  const country = getCountryByCode(countryId)

	country.polygons.forEach(ls => {
		ls.forEach(latlng => {
			const {x, y} = Projection.degreesToPixels({lat: latlng[0], lng: latlng[1]});
			xs.push(x);
			ys.push(y);
		});
	});

	const countryBounds = {
		x: [Math.floor(Math.min(...xs)), Math.ceil(Math.max(...xs))],
		y: [Math.floor(Math.min(...ys)), Math.ceil(Math.max(...ys))],
	}

  let str = "";
  for (let y=countryBounds.y[0]; y<=countryBounds.y[1]; y+=10) {
    for (let x=countryBounds.x[0]; x<=countryBounds.x[1]; x+=10) {
        str += isLandInCountry(Projection.pixelsToDegrees({x, y}), country) ? "1" : "0";
    }
  }


  const size = {
    w: (countryBounds.x[1] - countryBounds.x[0]) / 10,
    h: (countryBounds.y[1] - countryBounds.y[0]) / 10
  }
  console.log(size);
  console.log(`
  `,str);
	
	return createRoom(str, {
    size,
    styles: {
      background: true,
      paths: [
        {
          name: "wall",
          cell: 1,
          draw: [
            {
              stroke: '#3A506B99',
              fill: '#1C2541ff',
              'stroke-width': 10,
              'paint-order': 'stroke'
            },
            {
              fill: '#00000033',
            }
          ]
        }
      ]
    }
  });
}