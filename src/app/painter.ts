import {Circle} from "./circle";
import {Coord2d} from "./coord2d";
import {PaintOpts} from "./paint-opts";

export class Painter {
  private ctx: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
  }

  clear(w: number, h: number) {
    this.ctx.clearRect(0, 0, w, h);
  }

  drawCircle(c: Circle) {
    this.ctx.beginPath();
    this.ctx.arc(c.center.x, c.center.y, c.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawCoordsOnCircle(coords: Coord2d[]) {
    coords.forEach(coord => {
      this.ctx.beginPath();
      this.ctx.arc(coord.x, coord.y, 10, 0, 2 * Math.PI);
      // ctx.arc(coord[0], coord[1], radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    });
  }

  drawCoord(coord: Coord2d, opts: PaintOpts) {
    this.ctx.beginPath();
    this.ctx.arc(coord.x, coord.y, 10, 0, 2 * Math.PI);
    this.ctx.fillStyle = opts.fillStyle;
    this.ctx.fill();
  }

  drawLines(c: Coord2d, coords: Coord2d[], opts: PaintOpts) {
    this.ctx.beginPath();
    coords.forEach(coord => {
      this.ctx.moveTo(c.x, c.y);
      this.ctx.lineTo(coord.x, coord.y);
      this.ctx.strokeStyle = opts.strokeStyle;
      this.ctx.stroke();
    });
  }

  drawLine(c1: Coord2d, c2: Coord2d, opts: PaintOpts) {
    this.ctx.beginPath();
    this.ctx.moveTo(c1.x, c1.y);
    this.ctx.lineTo(c2.x, c2.y);
    this.ctx.strokeStyle = opts.strokeStyle;
    this.ctx.stroke();
  }
}
