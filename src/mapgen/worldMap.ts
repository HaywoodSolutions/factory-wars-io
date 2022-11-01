import { isLand } from "./isLand";
import Projection from "./Projection";

const worldWidth = 500;
const sampleSize = {
  width: worldWidth,
  height: worldWidth
};

export const genWorldMap = () => {
  let map = [];

  for (let y = 0; y < sampleSize.height; y++) {
    let row = "";
    for (let x = 0; x < sampleSize.width; x++) {
      const cord = Projection.pixelsToDegrees({
        x: x + 0.5,
        y: y + 0.5
      }, sampleSize);
      const code = isLand(cord);
      if (code == null) {
        row += "1";
      } else {
        row += "0"
      }
    }
    map.push(row)
  }

  return map;
}