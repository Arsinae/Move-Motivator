import { Component, OnInit } from '@angular/core';
import { Activity, ActivityType } from '@app/models/activity';
import { DistanceService } from '@app/services/server-data/distance.service';
import { Chart } from 'angular-highcharts';
import { addDays, isSameDay, subDays } from 'date-fns';
import { SeriesColumnOptions, SeriesOptionsType, TooltipOptions } from 'highcharts';

@Component({
  selector: 'app-month-stat',
  templateUrl: './month-stat.component.html',
  styleUrls: ['./month-stat.component.scss']
})
export class MonthStatComponent implements OnInit {

  public chart: Chart = null;
  public startDate: Date = new Date();
  public endDate: Date = new Date();

  constructor(
    private distanceService: DistanceService,
  ) { }

  ngOnInit(): void {
    this.startDate.setHours(0, 0, 0, 0);
    this.startDate = subDays(this.startDate, 29);
    this.getStatsInfo();
  }

  public getStatsInfo(): void {
    this.distanceService.getDistancesBetweenDates(this.startDate, this.endDate).subscribe(distances => {
      this.chart = this.initChart(distances);
    })
  }

  private initChart(distances: Activity[]): Chart {
    return new Chart({
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Distance',
          style: {color: 'white'}
        },
        labels: {
          format: '{text}km'
        }
      },
      xAxis: {
        categories: this.xAxisLabels()
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        }
      },
      colors: ['#C2185B', '#00C75A', '#C75A00'],
      series: this.setChartsSeries(distances),
      tooltip: this.chartTooltip()
    });
  }

  private xAxisLabels(): string[] {
    const list = [];
    for (let date = new Date(this.startDate); date.getTime() < this.endDate.getTime(); date = addDays(date, 1)) {
      list.push(date.toLocaleDateString())
    }
    return list;
  }

  private setChartsSeries(distances: Activity[]): SeriesOptionsType[] {
    const series: SeriesColumnOptions[] = [
      {name: 'Marche', type: 'column', data: []},
      {name: 'Course', type: 'column', data: []},
      {name: 'Cyclisme', type: 'column', data: []}
    ];
    for (let date = new Date(this.startDate); date.getTime() < this.endDate.getTime(); date = addDays(date, 1)) {
      const currentDistances = distances.filter(d => isSameDay(d.creationDate, date));
      series[0].data.push(currentDistances.filter(d => d.type === ActivityType.WALK).reduce((a, b) => a + b.distance / 1000, 0));
      series[1].data.push(currentDistances.filter(d => d.type === ActivityType.RUN).reduce((a, b) => a + b.distance / 1000, 0));
      series[2].data.push(currentDistances.filter(d => d.type === ActivityType.BIKE).reduce((a, b) => a + b.distance / 1000, 0));
    }
    return series;
  }

  private chartTooltip(): TooltipOptions {
    return {
      shared: true,
      formatter: function ()  {
        const points = this.points.filter(point => point.percentage !== 0);
        return points.reduce((s, point) => {
          return s + `<br/><span style="color:${point.color}">\u25CF</span> ${point.series.name}: ${point.y}km`;
        }, `<b>${this.points[0].x}: ${this.points[0].total}km</b>`);
      }
    }
  }
}
