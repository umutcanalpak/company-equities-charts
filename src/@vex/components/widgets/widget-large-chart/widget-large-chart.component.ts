import { Component, Input, OnInit } from "@angular/core";
import { ApexOptions } from "../../chart/chart.component";
import { defaultChartOptions } from "../../../utils/default-chart-options";
import { DashboardAnalyticsService } from "src/app/pages/dashboards/dashboard-analytics/dashboard-analytics.service";

@Component({
  selector: "vex-widget-large-chart",
  templateUrl: "./widget-large-chart.component.html",
  styleUrls: ["./widget-large-chart.component.scss"],
})
export class WidgetLargeChartComponent implements OnInit {
  optionsParam: any = this.defaultOptionsParam();
  @Input() series: ApexNonAxisChartSeries | ApexAxisChartSeries = []
  @Input() options: ApexOptions = defaultChartOptions(this.optionsParam);

  constructor(private dashboardAnalyticsService: DashboardAnalyticsService) {}

  ngOnInit() {
    this.dashboardAnalyticsService.labelChange.subscribe((labels: number[]) => {
      const param: any = this.defaultOptionsParam();

      param.labels = labels;

      this.options = param;
    });
  }

  defaultOptionsParam() {
    return {
      grid: {
        show: true,
        strokeDashArray: 3,
        padding: {
          left: 16,
        },
      },
      chart: {
        type: "area",
        height: 384,
        sparkline: {
          enabled: false,
        },
        zoom: {
          enabled: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 90, 100],
        },
      },
      colors: ["#008ffb", "#ff9800", "#D30A31", "#E7F905", "#5DD525"],
      labels: [],
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
        },
      },
      yaxis: {
        labels: {
          show: true,
        },
      },
      legend: {
        show: true,
        itemMargin: {
          horizontal: 4,
          vertical: 4,
        },
      },
    };
  }
}
