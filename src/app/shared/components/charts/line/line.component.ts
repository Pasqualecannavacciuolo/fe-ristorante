import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() inputSeries : any = [];
  @Input() inputChart : any = {};
  @Input() inputXaxis : any = {};
  @Input() inputYaxis : any = {};
  @Input() inputDataLabels : any = {};
  @Input() inputTitle : any = {};
  @Input() inputGrid : any = {};
  @Input() inputStroke : any = {};

  constructor() {
    this.chartOptions = {};
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.inputSeries,
      chart: this.inputChart,
      dataLabels: this.inputDataLabels,
      title: this.inputTitle,
      xaxis: this.inputXaxis,
      yaxis: this.inputYaxis,
      grid: this.inputGrid,
      stroke: this.inputStroke
    };

  }

}
