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
  companyList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];
  selectedCompanies = new FormControl(["IBM"]);
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  dataSource = [  ];
  displayedColumns: string[] = [];
  displayedDateColumns: string[] = [];

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
    this.testCaseService.getEquityData().subscribe((data) => {
      const labels = this.createChartLabels(data);

      this.testCaseService.obs.next(labels);

      this.formatTableData(data);
    });
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

  createDateArray(length: number) {
    const dates: number[] = [];

    for (let i = 0; i < length; i++) {
      dates.push(+DateTime.local().minus({ day: i }).toJSDate());
    }

    return dates.reverse();
  }

  formatTableData(dataToFormat: any) {
    const series = dataToFormat["Time Series (Daily)"];
    console.log(1111111);
    console.log(series);
    console.log(1111111);
    
    const displayedColumns = ["company"];
    
    const company = this.selectedCompanies.value[0]; 
    
    console.log(2222222);
    console.log(company);
    console.log(2222222);


    

    const data = {company};

    for (const key in series) {
      displayedColumns.push(key);
      data[key] = series[key]["4. close"];
    }

    const dataSource: any = [data];

    


    this.displayedColumns = displayedColumns;
    this.displayedDateColumns = displayedColumns.slice(1);
    this.dataSource = dataSource;
  }
  

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
