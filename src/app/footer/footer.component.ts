import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  getFullYear: any=new Date();

  constructor() {
    this.getFullYear = this.getFullYear.getFullYear();
  }

  ngOnInit() {}

}
