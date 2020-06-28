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

  static projection(coord: Coord2d, vect: Coord2d): Coord2d {
    const uv = this.unit(vect);
    const scalarProjection = this.dotProduct(coord, uv);
    const vectorProjection = this.mult(uv, scalarProjection);
    return vectorProjection;
  }

  static norm(vec: Coord2d): number {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  }

  static unit(vec: Coord2d): Coord2d {
    const n = this.norm(vec);
    return { x: vec.x / n, y: vec.y / n };
  }

  static dotProduct(v1: Coord2d, v2: Coord2d): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  private static mult(coord: Coord2d, scalar: number): Coord2d {
    return { x: coord.x * scalar, y: coord.y * scalar};
  }

  static minus(c1: Coord2d, c2: Coord2d): Coord2d {
    return {x: c1.x - c2.x, y: c1.y - c2.y};
  }

  static plus(c1: Coord2d, c2: Coord2d): Coord2d {
    return {x: c1.x + c2.x, y: c1.y + c2.y};
  }
}
