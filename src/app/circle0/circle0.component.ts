import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {timer} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {Mth} from "../mth";
import {Circle} from "../circle";
import {Coord2d} from "../coord2d";
import {Painter} from "../painter";

@Component({
  selector: 'app-circle0',
  templateUrl: './circle0.component.html',
  styleUrls: ['./circle0.component.sass']
})
export class Circle0Component implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
  private animateToggle = 'off';

  width = 400;
  height = 400;
  cntCoords = 100;
  timerPeriod = 150;
  private circle: Circle;
  private coordsOnCircle: Coord2d[];
  private painter: Painter;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange($event: any) {
    console.log($event);
  }

  onInput($event: MatSliderChange) {
    console.log($event);
    this.circle = {
      radius: $event.value,
      center: {x: this.width / 2, y: this.height / 2}
    };
    this.coordsOnCircle = Mth.coordsOnCircle(this.cntCoords, this.circle.radius, this.circle.center);

    this.painter = new Painter(this.canvasRef.nativeElement.getContext('2d'));
    this.painter.clear(this.width, this.height);
    this.painter.drawCircle(this.circle);
    this.painter.drawCoordsOnCircle(this.coordsOnCircle);
  }

  onChangeAnimate($event: MatButtonToggleChange) {
    console.log($event);
    const shouldStartAnimation = this.animateToggle === 'off' && $event.value === 'on';
    this.animateToggle = $event.value;
    if (shouldStartAnimation) {
      this.startAnimation();
    }
  }

  startAnimation() {
    timer(0, this.timerPeriod).pipe(takeWhile(() => this.animateToggle === "on"))
      .subscribe(idx => {
        this.animateStep(idx);
      });
  }

  animateStep(idx: number) {
    console.log(idx);
    this.painter.clear(this.width, this.height);
    this.painter.drawCircle(this.circle);

    const coordOnCircle = this.coordsOnCircle[idx % this.coordsOnCircle.length];
    this.painter.drawCoord(coordOnCircle, {fillStyle: 'blue'});

    const coordOnXAxis = {x: coordOnCircle.x, y: this.circle.center.y};
    this.painter.drawCoord(coordOnXAxis, {fillStyle: 'green'});

    const coordOnYAxis = {x: this.circle.center.y, y: coordOnCircle.y}
    this.painter.drawCoord(coordOnYAxis, {fillStyle: 'orange'});

    this.painter.drawLine(coordOnXAxis, coordOnYAxis);
  }
}
