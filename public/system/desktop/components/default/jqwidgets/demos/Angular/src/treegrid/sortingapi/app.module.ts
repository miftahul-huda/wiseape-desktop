import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { jqxTreeGridModule } from 'jqwidgets-ng/jqxtreegrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';

@NgModule({
    declarations: [
        AppComponent
  ],
  imports: [
      BrowserModule, CommonModule, jqxTreeGridModule, jqxButtonModule, jqxDropDownListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
