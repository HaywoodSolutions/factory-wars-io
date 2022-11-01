import { isLand } from "./isLand";
import Projection from "./Projection";
import { WORLD_SIZE, WORLD_WIDTH } from "./WorldSize";

export const genMap = (size: number, latlng: {
  lat: number,
  lng: number
}) => {
  const cord = Projection.degreesToPixels(latlng, WORLD_SIZE);
  const topLeftCord = {
    x: Math.round(cord.x) - size / 2,
    y: Math.round(cord.y) - size / 2
  };

  let map = [];
  for (let y = 0; y < size; y++) {
    let row = "";
    for (let x = 0; x < size; x++) {
      const cord = Projection.pixelsToDegrees({
        x: topLeftCord.x + x + 0.5,
        y: topLeftCord.y + y + 0.5
      }, WORLD_SIZE);
      row += isLand(cord) ? "1" : "0";
    }
    map.push(row)
  }

  return map;
}