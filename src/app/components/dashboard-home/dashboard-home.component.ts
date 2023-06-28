import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  // Area chart
  series : any = [];
  chart : any = {};
  dataLabels : any = {};
  stroke : any = {};
  xaxis : any = {};
  tooltip : any = {};

  // Line chart
  title : any = {};
  grid : any = {};
  lineXaxis : any = {};
  lineYaxis : any = {};
  lineSeries : any = [];
  lineChart : any = {};
  lineDataLabels : any = {};
  lineStroke : any = {};

  constructor() {}

  ngOnInit(): void {

    // AREA CHART
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

    this.title = {
      text: "Product Trends by Month",
      align: "left"
    };

    this.grid = {
      show: false,
      /*row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }*/
    };

    // LINE CHART
    this.lineSeries = [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ];

    this.lineChart = {
      height: 200,
      width: 350,
      type: "line",
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true,
    }
    };

    this. lineDataLabels = {
      enabled: false
    };

    this.lineStroke = {
      curve: "straight"
    };

    this.lineXaxis = {
      labels: {
        show: false
      },
      /*categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep"
      ]*/
    }

    this.lineYaxis = {
      show: false
    }

  }

}
