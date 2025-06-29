import {  Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
  stroke?: ApexStroke;
};

export type RadialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-top-area',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './top-area.component.html',
  styleUrl: './top-area.component.scss'
})


export class TopAreaComponent {
  barChartSeries: ApexAxisChartSeries = [
    { name: 'Low Risk', data: [30, 40, 45, 50, 49, 60, 70, 91, 65, 70, 50, 60] },
    { name: 'Medium Risk', data: [20, 30, 35, 40, 39, 50, 60, 80, 55, 60, 45, 50] },
    { name: 'High Risk', data: [10, 20, 25, 30, 29, 40, 50, 70, 45, 50, 35, 40] }
  ];

  barChart: ApexChart = {
  type: 'bar',
  height: window.innerWidth < 768 ? 300 : 350,
  stacked: true,
  toolbar: { show: true }
};

  barChartXAxis: ApexXAxis = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  barChartTooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => `${val} vendors`
    }
  };

  barChartLegend: ApexLegend = {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px'
  };

  barChartFill: ApexFill = {
    opacity: 1
  };

  barChartStroke: ApexStroke = {
    width: 1,
    colors: ['#fff']
  };

  radialSeries: ApexNonAxisChartSeries = [80];

  radialChart: ApexChart = {
    type: 'radialBar',
    height: 250,
    offsetY: -10
  };

  radialPlotOptions: ApexPlotOptions = {
    radialBar: {
      hollow: {
        size: '60%'
      },
      dataLabels: {
        name: { show: false },
        value: {
          fontSize: window.innerWidth < 768 ? '20px' : '30px',
          fontWeight: 'bold',
          color: '#5e2ceb',
          offsetY: 6
        }
      }
    }
  };

  radialLabels: string[] = ['Vendors Monitored'];

  radialFill: ApexFill = {
    colors: ['#7a5af5']
  };
}