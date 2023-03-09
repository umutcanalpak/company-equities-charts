import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import moment from "moment-timezone";
import { forkJoin } from "rxjs";
import { DashboardAnalyticsService } from "./dashboard-analytics.service";

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent {

  readonly NOW = new Date();
  readonly TWO_MONTHS_AGO = new Date(
    new Date().setMonth(this.NOW.getMonth() - 2)
  );
  readonly DATE_FORMAT = "YYYY-MM-DD";
  companyList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];
  selectedCompanies = new FormControl([]);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dataSource = [];
  displayedDateColumns: string[] = [];
  displayedColumns: string[] = [];
  loading = false;
  chartSeries: ApexAxisChartSeries = [];

  constructor(private dashboardAnalyticsService: DashboardAnalyticsService) {}

  filter() {
    this.loading = true;

    const forkJoinParam = {};
    for (const company of this.selectedCompanies.value) {
      forkJoinParam[company] =
        this.dashboardAnalyticsService.getEquityDataByCompany(company);
    }

    const self = this;

    forkJoin(forkJoinParam).subscribe({
      next(value) {
        const timeArray = self.createTimeArray();
        self.formatTableData(value, timeArray);
        self.formatChartData();
      },
      error(err) {
        console.error(err);
      },
      complete() {
        self.loading = false;
      },
    });
  }

  createTimeArray(): number[] {
    const { start, end } = this.range.value;

    let startMoment = moment(start);
    const endMoment = moment(end);

    const days = [];
    while (startMoment <= endMoment) {
      days.push(startMoment.format(this.DATE_FORMAT));
      startMoment.add(1, "days");
    }

    const times = [];
    for (const day of days) {
      const time = moment(day).toDate().getTime();
      times.push(time);
    }

    return times;
  }


  formatChartData() {
    const data: ApexAxisChartSeries = [];
    const labels = [];

    for (const row of this.dataSource) {
      const values = [];

      for (const key in row) {
        if (key === "company") {
          continue;
        }

        if (Object.prototype.hasOwnProperty.call(row, key)) {
          labels.push(moment.tz(key, "Europe/London").toDate().getTime());
          values.push(row[key]);
        }
      }

      data.push({
        name: row.company,
        data: values,
      });
    }

    this.chartSeries = data;
    this.dashboardAnalyticsService.obs.next(labels);
  }

  formatTableData(res: any, timeArray: number[]) {
    let displayedColumnsChange = true;
    const displayedColumns = [];
    const dataSource = [];

    const dates = timeArray.map((i) => moment(i).format(this.DATE_FORMAT));

    for (const parentKey in res) {
      if (Object.prototype.hasOwnProperty.call(res, parentKey)) {
        const element = res[parentKey];
        const row = { company: parentKey };
        const series = element["Time Series (Daily)"];

        for (const key in series) {
          if (!dates.includes(key)) {
            continue;
          }

          row[key] = series[key]["4. close"];

          if (displayedColumnsChange) {
            displayedColumns.unshift(key);
          }
        }

        displayedColumnsChange = false;

        dataSource.push(row);
      }
    }

    this.displayedDateColumns = [...displayedColumns];
    this.displayedColumns = ["company", ...this.displayedDateColumns];
    this.dataSource = dataSource;
  }

  isFilterButtonDisabled() {
    return (
      this.loading ||
      !this.selectedCompanies.value.length ||
      !this.range.value.start ||
      !this.range.value.end
    );
  }

}
