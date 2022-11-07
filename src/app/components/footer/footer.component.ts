import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    constructor(
        private iab: InAppBrowser
    ) { }

    ngOnInit() { }

    privacy() {
        const browser = this.iab.create('https://www.wattmonk.com/privacy-policy');
    }

    agreement() {
        const browser = this.iab.create('https://www.wattmonk.net/service-agreement');
    }

}
