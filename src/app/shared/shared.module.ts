import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// CHARTS
import { NgApexchartsModule } from "ng-apexcharts";
import { AreaComponent } from './components/charts/area/area.component';
import { LineComponent } from './components/charts/line/line.component';



@NgModule({
  declarations: [
    AreaComponent,
    LineComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    AreaComponent,
    LineComponent
  ]
})
export class SharedModule { }
