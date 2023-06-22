import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// CHARTS
import { NgApexchartsModule } from "ng-apexcharts";
import { AreaComponent } from './components/charts/area/area.component';



@NgModule({
  declarations: [
    AreaComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    AreaComponent
  ]
})
export class SharedModule { }
