import { Component } from "@angular/core";
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";
import {
  Order,
  tableSalesData,
} from "../../../../static-data/table-sales-data";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { FormControl, FormGroup } from "@angular/forms";
import { TestCaseService } from "./test-case.service";
import { DateTime } from "luxon";
import moment from "moment";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-test-case",
  templateUrl: "./test-case.component.html",
  styleUrls: ["./test-case.component.scss"],
})
export class TestCaseComponent {
  readonly NOW = new Date();
  readonly TWO_MONTHS_AGO = new Date(
    new Date().setMonth(this.NOW.getMonth() - 2)
  );
  readonly DATE_FORMAT = "YYYY-MM-DD";
  companyList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];
  selectedCompanies = new FormControl(["IBM", "AAPL"]);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dataSource = [];
  displayedDateColumns: string[] = [];
  displayedColumns: string[] = [];
  loading = false;

  constructor(private testCaseService: TestCaseService) {}

  filter() {
    this.loading = true;

    const forkJoinParam = {};
    for (const company of this.selectedCompanies.value) {
      forkJoinParam[company] =
        this.testCaseService.getEquityDataByCompany(company);
    }

    // forkJoin(forkJoinParam).subscribe(
    //   (res) => {
    //     const labels = this.createChartLabels();

    //     this.formatTableData(res, labels);
    //   },
    //   (err) => console.error(err),
    //   () => (this.loading = false)
    // );

    const self = this;
    forkJoin(forkJoinParam).subscribe({
      next(value) {
        const labels = self.createChartLabels();
        self.formatTableData(value, labels);
      },
      error(err) {
        console.error(err);
        // self.loading = false;
      },
      complete() {
        self.loading = false;
      },
    });

    // this.testCaseService.getEquityDataByCompany("").subscribe((data) => {
    //   const labels = this.createChartLabels(data);

    //   this.testCaseService.obs.next(labels);

    //   this.formatTableData(data);
    // });
  }

  isFilterButtonDisabled() {
    return (
      this.loading ||
      !this.selectedCompanies.value.length ||
      !this.range.value.start ||
      !this.range.value.end
    );
  }

  createChartLabels() {
    const { start, end } = this.range.value;

    let startMoment = moment(start);
    const endMoment = moment(end);

    const days = [];
    while (startMoment <= endMoment) {
      days.push(startMoment.format(this.DATE_FORMAT));
      startMoment.add(1, "days");
    }

    const labels = [];
    for (const day of days) {
      const time = moment(day).toDate().getTime();
      labels.push(time);
    }

    return labels;
  }

  chartSeries: ApexAxisChartSeries = [
    {
      name: "Users",
      data: [10, 50, 26],
    },
    {
      name: "Sessions",
      data: [5, 21, 42],
    },
  ];

  formatTableData(res: any, labels: string[]) {
    let displayedColumnsChange = true;
    const displayedColumns = [];
    const dataSource = [];

    const dates = labels.map((i) => moment(i).format(this.DATE_FORMAT));

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
}
