import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReportsComponent } from './reports/reports.component';
import { ReportsService } from './service/reports.service';

@NgModule({
  declarations: [
    AppComponent, ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [ReportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
