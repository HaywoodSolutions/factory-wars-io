export const SANDBOX_SIZE = 3;

export type WORLD = {
  width: number,
  height: number,
  mapData: Record<number, Record<number, string>>
}

const generateSimWorldTerrain = (
  x: number, y: number,
  width: number = SANDBOX_SIZE,
  height: number = SANDBOX_SIZE
): string => {
  return [
    y == 0 ? "1".repeat(50) : ((x == 0 ? "1" : "0") + "0".repeat(48) + (x == (width - 1) ? "1" : "0")),
    ((x == 0 ? "1" : "0") + "0".repeat(48) + (x == (width - 1) ? "1" : "0")).repeat(48),
    y == (height - 1) ? "1".repeat(50) : ((x == 0 ? "1" : "0") + "0".repeat(48) + (x == (width - 1) ? "1" : "0")),
  ].join("");
}

export const SANDBOX_WORLDS: WORLD = {
  width: SANDBOX_SIZE,
  height: SANDBOX_SIZE,
  mapData: [...new Array(SANDBOX_SIZE)].reduce((ys, _, y) => {
    ys[y] = [...new Array(SANDBOX_SIZE)].reduce((xs, _, x) => {
      xs[x] = generateSimWorldTerrain(x, y);
      return xs;
    }, {})
    return ys;
  }, {})
}