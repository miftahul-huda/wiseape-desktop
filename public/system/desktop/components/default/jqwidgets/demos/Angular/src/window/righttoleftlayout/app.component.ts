import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    @ViewChild('window', { static: false }) window: jqxWindowComponent;

    ngAfterViewInit(): void {
        this.window.focus();
    }

    showWindowButtonClick(): void {
        this.window.open();
    }
}