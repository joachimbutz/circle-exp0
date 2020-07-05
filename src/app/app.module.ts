import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Circle0Component } from './circle0/circle0.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RipplesComponent } from './ripples/ripples.component'
import {MatButtonModule} from "@angular/material/button";
import {HighchartsChartModule} from "highcharts-angular";
import { TimeseriesComponent } from './timeseries/timeseries.component';

@NgModule({
  declarations: [
    AppComponent,
    Circle0Component,
    RipplesComponent,
    TimeseriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatButtonToggleModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
