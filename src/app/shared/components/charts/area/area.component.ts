import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() inputSeries : any = [];
  @Input() inputChart : any = {};
  @Input() inputXaxis : any = {};
  @Input() inputDataLabels : any = {};
  @Input() inputTooltip : any = {};
  @Input() inputStroke : any = {};

  actualSeries : any[] = [];

  constructor() {
    this.chartOptions = {};
   }

  ngOnInit(): void {
    this.inputSeries.forEach((element: any) => {
      this.actualSeries.push(element);
    });


    this.chartOptions = {
      series: this.actualSeries,
      chart: this.inputChart,
      dataLabels: this.inputDataLabels,
      stroke: this.inputStroke,
      xaxis: this.inputXaxis,
      tooltip: this.inputTooltip,
    };
  }

}
