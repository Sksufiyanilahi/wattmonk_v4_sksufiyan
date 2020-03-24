import { Component, OnInit } from '@angular/core';
import { DesignModel } from "../../model/design.model";

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {

  listOfDesigns: DesignModel[] = [];

  constructor() {
    this.listOfDesigns.push({
      date: 'Today',
      designs: [
        {
          customer: 'John Doe',
          customerEmail: 'johndoe@gmail.com',
          customerPhone: '+91-9711302357',
          customerAddress: '25, Wainwright St,.\nProvince Road, USA'
        },
        {
          customer: 'John Doe',
          customerEmail: 'johndoe@gmail.com',
          customerPhone: '+91-9711302357',
          customerAddress: '25, Wainwright St,.\nProvince Road, USA'
        },
        {
          customer: 'John Doe',
          customerEmail: 'johndoe@gmail.com',
          customerPhone: '+91-9711302357',
          customerAddress: '25, Wainwright St,.\nProvince Road, USA'
        }
      ]
    });
    this.listOfDesigns.push({
      date: 'May 20, 2020',
      designs: [
        {
          customer: 'John Doe',
          customerEmail: 'johndoe@gmail.com',
          customerPhone: '+91-9711302357',
          customerAddress: '25, Wainwright St,.\nProvince Road, USA'
        }
      ]
    });
  }

  ngOnInit() {}

}
