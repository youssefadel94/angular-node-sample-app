import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ReportsService } from '../service/reports.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reports: any;

  constructor(public reportsService: ReportsService, private http: HttpClient) { }

  ngOnInit() {
    this.getReports()
    // interval(1000).subscribe(x => this.getReports())
    // console.log(this.getReports())
  }
  getReports() {
    // interval(3000).subscribe(x => /* do something */)
    // return this.reportsService.getSpamReports();
    this.http.get<any>('http://localhost:3000/listSpamReports').subscribe(data => {
      // console.log("data");

      console.log(data);
      this.reports = data;
      return data
    })
  }
  updateReport(id: any, state: any) {
    ///updateReport/
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.http.put<any>('http://localhost:3000/updateReport/' + id, {
      "ticketState": state
    }, {responseType: 'text' as 'json'}).subscribe(data => {
      this.getReports()
     })
    console.log(id, state);
  }
  // updateReport(id: any, state: any) {
  //   this.reportsService.updateReport(id, state);
  //   this.getReports();
  // }
}


