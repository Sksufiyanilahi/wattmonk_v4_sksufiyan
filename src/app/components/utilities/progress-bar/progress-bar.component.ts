import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {

  buffer:any;
  value=0.5;
  constructor() { }

  ngOnInit() {
    this.buffer= this.value + 0.25;

  }

}
