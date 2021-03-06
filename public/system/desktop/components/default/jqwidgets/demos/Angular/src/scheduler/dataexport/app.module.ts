import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component'; 
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, CommonModule, jqxSchedulerModule, jqxButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }


