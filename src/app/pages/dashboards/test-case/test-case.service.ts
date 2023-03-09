import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TestCaseService {
  obs = new Subject();

  constructor(private http: HttpClient) {}

  url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=A0EPWRBZXYCD52ZY";

  getEquityData() {
    return this.http.get(this.url);
  }
}
