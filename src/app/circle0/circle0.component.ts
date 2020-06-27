import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {timer} from "rxjs";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-circle0',
  templateUrl: './circle0.component.html',
  styleUrls: ['./circle0.component.sass']
})
export class Circle0Component implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
  private animateToggle: string;
  private _coords: Array<[number, number]>;
  private _radius: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange($event: any) {
    console.log($event);
  }

  onInput($event: MatSliderChange) {
    console.log($event);
    this.drawCircle($event.value);
  }

  private drawCircle(value: number) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const radius = value;
    ctx.clearRect(0,0, 400, 400);
    ctx.beginPath();
    ctx.arc(200, 200, radius, 0, 2 * Math.PI);
    ctx.stroke();

    const coords = this.coords(100, radius);
    coords.forEach(coord => {
      ctx.beginPath();
      ctx.arc(coord[0], coord[1], 10, 0, 2 * Math.PI);
      // ctx.arc(coord[0], coord[1], radius, 0, 2 * Math.PI);
      ctx.stroke();
    });
    this._coords = coords;
    this._radius = radius;
  }

  circleX(radian, radius) {
    return Math.sin(radian) * radius;
  }

  circleY(radian, radius) {
    return Math.cos(radian) * radius;
  }

  coords(nr, radius): Array<[number, number]> {
    const coords = [];
    const inc = (2 * Math.PI) / nr;
    for (let i = 0; i < nr; ++i) {
      const coord = [200 + this.circleX(inc * i, radius), 200 + this.circleY(inc * i, radius)];
      coords.push(coord);
    }
    return coords;
  }

  onChangeAnimate($event: MatButtonToggleChange) {
    console.log($event);
    this.animateToggle = $event.value;
    if (this.animateToggle === "on") {
      timer(0, 100).pipe(takeWhile(() => this.animateToggle === "on"))
        .subscribe(res => {
          console.log(res);
          this.drawCircle(this._radius);
          this.drawCoord(res);
        });
    }
  }

  private drawCoord(idx: number) {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx.beginPath();
    const coord = this._coords[idx % this._coords.length];
    ctx.arc(coord[0], coord[1], 10, 0, 2 * Math.PI);
    // ctx.arc(coord[0], coord[1], radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(coord[0], 200, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'orange';
    ctx.arc(200, coord[1], 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(coord[0], 200);
    ctx.lineTo(200, coord[1]);
    ctx.stroke();
  }
}
