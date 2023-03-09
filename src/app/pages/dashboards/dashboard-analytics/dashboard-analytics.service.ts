import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardAnalyticsService {
  obs = new Subject();

  constructor(private http: HttpClient) {}
  
  getEquityDataByCompany(company:string) {
    return this.http.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${company}&apikey=A0EPWRBZXYCD52ZY<`);
  }
}
