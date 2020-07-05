import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import {timer} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

StockModule(Highcharts);

@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.scss']
})
export class TimeseriesComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  val = 0.0;

  chart: Highcharts.Options = {
    title: { text: 'Random Walk' },
    navigator: { enabled: false },
    rangeSelector: { enabled: false },
    series: [{
      type: 'line',
      data: [this.val]
    }]};

  chartInstance: Highcharts.Chart;
  private timerPeriod = 100;
  private animateToggle = 'off';

  constructor() { }

  ngOnInit(): void {
  }

  addValue() {
    const up = Math.random() >= 0.5;
    this.val += up ? 1.0 : -1.0;
    this.chartInstance.series[0].addPoint(this.val);
  }

  memChartInstance(chartInstance: Highcharts.Chart) {
    console.log('Chart instance: ', chartInstance);
    this.chartInstance = chartInstance;
  }

  startAnimation() {
    timer(0, this.timerPeriod).pipe(takeWhile(() => this.animateToggle === "on"))
      .subscribe(idx => {
        this.addValue();
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
}
