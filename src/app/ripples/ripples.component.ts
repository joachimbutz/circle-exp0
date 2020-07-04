import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Buffer} from "../buffer";
import {timer} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-ripples',
  templateUrl: './ripples.component.html',
  styleUrls: ['./ripples.component.scss']
})
export class RipplesComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  width = 400;
  height = 400;

  current: Buffer = new Buffer(this.width, this.height);
  previous: Buffer = new Buffer(this.width, this.height);

  damping: number = 0.9999999999999;
  timerPeriod = 100;

  animateToggle = 'off';
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    // const imageData = ctx.createImageData(this.width, this.height);
    // this.ctx.strokeText('Hallo!!!', 50, 50);
    this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
  }

  processWater() {
    for (let x = 1; x < this.width - 1; ++x) {
      for (let y = 1; y < this.height - 1; ++y) {
        this.current.put(x, y,
          (this.previous.get(x - 1, y) + this.previous.get(x + 1, y) +
            this.previous.get(x, y + 1) + this.previous.get(x, y - 1)) / 2 - this.current.get(x, y));
        if (this.current.get(x, y) < 0.0) {
          this.current.put(x, y, 0.0);
        }
        this.current.put(x, y, this.current.get(x, y) * this.damping);
      }
    }
    let tmp = this.previous;
    this.previous = this.current;
    this.current = tmp;
  }

  animateStep() {
    this.rain();
    this.renderWater();
    this.processWater();
  }

  renderWater() {
    for (var y = 0; y < this.imageData.height; y++) {
      for (var x = 0; x < this.imageData.width; x++) {
        this.imageData.data[4 * (y * this.imageData.width + x)] = this.previous.get(x, y) * 255; // Rotwert
        this.imageData.data[4 * (y * this.imageData.width + x) + 1] = 0; // Grünwert
        this.imageData.data[4 * (y * this.imageData.width + x) + 2] = 0; // Blauwert
        this.imageData.data[4 * (y * this.imageData.width + x) + 3] = 255; // Alphawert
      }
    }
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  pebble($event: MouseEvent) {
    console.log($event);
    //this.previous.put($event.clientX, $event.clientY - 40,  1.0);
    //this.renderWater();
  }

  startAnimation() {
    timer(0, this.timerPeriod).pipe(takeWhile(() => this.animateToggle === "on"))
      .subscribe(idx => {
        this.animateStep();
      });
  }

  onChangeAnimate($event: MatButtonToggleChange) {
    console.log($event);
    const shouldStartAnimation = this.animateToggle === 'off' && $event.value === 'on';
    this.animateToggle = $event.value;
    if (shouldStartAnimation) {
      this.startAnimation();
    }
  }

  rain() {
    for (let i = 0; i < 1; ++i) {
      const x = this.randomInt(1, this.width-1);
      const y = this.randomInt(1, this.height-1);
      this.previous.put(x, y,  1.0);
      this.previous.put(x-1, y,  1.0);
      this.previous.put(x, y-1,  1.0);
      this.previous.put(x-1, y-1,  1.0);
    }
  }

  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

}
