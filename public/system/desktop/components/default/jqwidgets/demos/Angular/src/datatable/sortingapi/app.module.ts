import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';

@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule, CommonModule, jqxDataTableModule, jqxButtonModule, jqxDropDownListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }