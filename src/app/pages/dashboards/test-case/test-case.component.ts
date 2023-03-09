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

@Component({
  selector: "app-test-case",
  templateUrl: "./test-case.component.html",
  styleUrls: ["./test-case.component.scss"],
})
export class TestCaseComponent {
  stocks = new FormControl(["IBM"]);
  stockList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];

  dataSource = [
    { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
    { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
    { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
    { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
    { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
    { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
    { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
    { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
    { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
    { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
  ];

  displayedColumns: string[] = ["name"];

  readonly NOW = new Date();
  readonly TWO_MONTHS_AGO = new Date(
    new Date().setMonth(this.NOW.getMonth() - 2)
  );

  constructor(private testCaseService: TestCaseService) {
    // setTimeout(() => {
    //   this.filter();
    // }, 3000);
  }

  filter() {
    this.testCaseService.getEquityData().subscribe((data) => {
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
        console.log(11111);
        console.log(time);
        // console.log(+DateTime.local().toJSDate());
        console.log(11111);

        labels.push(time)
      }

      this.testCaseService.obs.next(labels);

      this.formatData(data);
    });
  }

  createChartLabels() {

  }

  createDateArray(length: number) {
    const dates: number[] = [];

    for (let i = 0; i < length; i++) {
      dates.push(+DateTime.local().minus({ day: i }).toJSDate());
    }

    return dates.reverse();
  }

  formatData(dataToFormat: any) {
    const series = dataToFormat["Time Series (Daily)"];

    const columns = ["name"];
    const data = {
      name: "AASD",
    };

    for (const key in series) {
      columns.push(key);
      data[key] = series[key]["4. close"];
    }

    const dataSource: any = [data];

    // this.displayedColumns = ["name", "position"];

    this.displayedColumns = columns;
    this.dataSource = dataSource;
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: "Users",
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60],
    },
    {
      name: "Sessions",
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50],
    },
  ];

}
