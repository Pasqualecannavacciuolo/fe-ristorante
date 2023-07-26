import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// CHARTS
import { NgApexchartsModule } from "ng-apexcharts";
import { AreaComponent } from './components/charts/area/area.component';
import { LineComponent } from './components/charts/line/line.component';
import { SimpletableComponent } from './components/table/simpletable/simpletable.component';
import { ActiontableComponent } from './components/table/actiontable/actiontable.component';



@NgModule({
  declarations: [
    AreaComponent,
    LineComponent,
    SimpletableComponent,
    ActiontableComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    AreaComponent,
    LineComponent,
    SimpletableComponent,
    ActiontableComponent
  ]
})
export class SharedModule { }
