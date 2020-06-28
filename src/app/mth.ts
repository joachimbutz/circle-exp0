import {Coord2d} from "./coord2d";

export class Mth {

  static coordsOnCircle(nr: number, radius = 1, center: Coord2d = {x: 0, y: 0}): Coord2d[] {
    const coords: Coord2d[] = [];
    const inc = (2 * Math.PI) / nr;
    for (let i = 0; i < nr; ++i) {
      const coord = {
        x: center.x + this.xcoord(inc * i, radius),
        y: center.y + this.ycoord(inc * i, radius)
      };
      coords.push(coord);
    }
    return coords;
  }

  static xcoord(radian, radius) {
    return Math.sin(radian) * radius;
  }

  static ycoord(radian, radius) {
    return Math.cos(radian) * radius;
  }

}
