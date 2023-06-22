import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  series : any = [];
  chart : any = {};
  dataLabels : any = {};
  stroke : any = {};
  xaxis : any = {};
  tooltip : any = {};

  constructor() {}

  ngOnInit(): void {
    this.series = [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ];

    this.chart = {
      height: 350,
      width: 500,
      type: "area",
    };

    this. dataLabels = {
      enabled: false
    };

    this.stroke = {
      curve: "smooth"
    };

    this.xaxis = {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
    };

    this.tooltip = {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    };

  }

}
