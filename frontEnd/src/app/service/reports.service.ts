import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  reports: any;

  constructor(private http: HttpClient) { }
  getReports() {
    this.http.get<any>('http://localhost:3000/listReports').subscribe(data => {
      console.log("data");

      console.log(data);
      this.reports = data;
    })
  }
  async getSpamReports() {
    this.http.get<any>('http://localhost:3000/listSpamReports').subscribe(data => {
      console.log("data");

      console.log(data);
      this.reports = data;
      return data
    })
    // return this.reports;
  }
  updateReport(id: any, state: any) {
    ///updateReport/
    this.http.put<any>('http://localhost:3000/updateReport/' + id, {
      "ticketState": state
    }).subscribe(data => {
      console.log(data);
    })
    console.log(id, state);
  }
}
