import { Component } from "@angular/core";
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";
import {
  Order,
  tableSalesData,
} from "../../../../static-data/table-sales-data";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-test-case",
  templateUrl: "./test-case.component.html",
  styleUrls: ["./test-case.component.scss"],
})
export class TestCaseComponent {
  stocks = new FormControl("");
  stockList: string[] = ["IBM", "AAPL", "MSFT", "AMZN", "GOOG"];

  dataSource =  [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  displayedColumns: string[] =  ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'weight', 'symbol', 'weight', 'symbol', 'weight', 'symbol', 'weight', 'symbol', 'weight', 'symbol', 'weight', 'symbol'];

  

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  tableColumns: TableColumn<Order>[] = [
    {
      label: "",
      property: "status",
      type: "badge",
    },
    {
      label: "PRODUCT",
      property: "name",
      type: "text",
    },
    {
      label: "$ PRICE",
      property: "price",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: "DATE",
      property: "timestamp",
      type: "text",
      cssClasses: ["text-secondary"],
    },
  ];
  tableData = tableSalesData;

  series: ApexAxisChartSeries = [
    {
      name: "Subscribers",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44],
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

  salesSeries: ApexAxisChartSeries = [
    {
      name: "Sales",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87],
    },
  ];

  pageViewsSeries: ApexAxisChartSeries = [
    {
      name: "Page Views",
      data: [405, 800, 200, 600, 105, 788, 600, 204],
    },
  ];

  uniqueUsersSeries: ApexAxisChartSeries = [
    {
      name: "Unique Users",
      data: [356, 806, 600, 754, 432, 854, 555, 1004],
    },
  ];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: "area",
      height: 100,
    },
    colors: ["#ff9800"],
  });
}