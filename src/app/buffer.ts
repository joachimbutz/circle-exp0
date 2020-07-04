export class Buffer {

  data: number[];
  width: number;
  height: number;

  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.data = new Array(this.width * this.height);

    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        this.data[y * this.width + x]  = 0;
      }
    }
  }

  put(x, y, val) {
    this.data[y * this.width + x]  = val;
  }

  get(x, y): number {
    return this.data[y * this.width + x];
  }

}
