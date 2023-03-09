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
  companyList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];
  selectedCompanies = new FormControl(["IBM", "AAPL"]);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dataSource = [];
  displayedDateColumns: string[] = [];
  displayedColumns: string[] = [];

  readonly NOW = new Date();
  readonly TWO_MONTHS_AGO = new Date(
    new Date().setMonth(this.NOW.getMonth() - 2)
  );

  constructor(private testCaseService: TestCaseService) {
    setTimeout(() => {
      this.filter();
    }, 3000);
  }

  filter() {
    const forkJoinParam = {};
    for (const company of this.selectedCompanies.value) {
      forkJoinParam[company] =
        this.testCaseService.getEquityDataByCompany(company);
    }

    forkJoin(forkJoinParam).subscribe((res) => {
      this.formatTableData(res);
    });

    // this.testCaseService.getEquityDataByCompany("").subscribe((data) => {
    //   const labels = this.createChartLabels(data);

    //   this.testCaseService.obs.next(labels);

    //   this.formatTableData(data);
    // });
  }

  createChartLabels(data: any) {
    const { start, end } = this.range.value;

    let startMoment = moment(start);
    const endMoment = moment(end);

    const days = [];
    while (startMoment <= endMoment) {
      days.push(startMoment.format("YYYY-MM-DD"));
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

  formatTableData(res: any) {
    console.log(1111111);
    console.log(res);
    console.log(1111111);

    let displayedColumnsChange = true;
    const displayedColumns = [];
    const dataSource = [];

    for (const parentKey in res) {
      if (Object.prototype.hasOwnProperty.call(res, parentKey)) {
        const element = res[parentKey];
        const row = { company: parentKey };
        const series = element["Time Series (Daily)"];

        for (const key in series) {
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

    console.log(22222222222222222);
    console.log(this.displayedColumns);
    console.log(22222222222222222);

    console.log(333333333333333);
    console.log(this.dataSource);
    console.log(333333333333333);

    // const series = res["Time Series (Daily)"];

    // const displayedColumns = ["company"];

    // const company = this.selectedCompanies.value[0];

    // console.log(2222222);
    // console.log(company);
    // console.log(2222222);

    // const data = { company };

    // for (const key in series) {
    //   displayedColumns.push(key);
    //   data[key] = series[key]["4. close"];
    // }

    // const dataSource: any = [data];

    // this.displayedColumns = displayedColumns;
    // this.displayedDateColumns = displayedColumns.slice(1);
    // this.dataSource = dataSource;
  }
}
