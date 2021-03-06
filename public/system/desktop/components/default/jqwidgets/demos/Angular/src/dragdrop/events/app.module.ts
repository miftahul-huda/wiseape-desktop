import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { jqxDragDropModule } from 'jqwidgets-ng/jqxdragdrop';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';

@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule, CommonModule, jqxDragDropModule, jqxPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }