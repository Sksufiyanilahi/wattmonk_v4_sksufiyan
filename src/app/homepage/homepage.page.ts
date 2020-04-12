import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { ErrorModel } from '../model/error.model';
import { DesginDataModel } from '../model/design.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {


  searchQuery: string = '';
  items: string[];


  constructor(
    private utils:UtilitiesService,
    private apiService:ApiService,
    private datePipe: DatePipe,
    private storage: StorageService
  ) {
    this.initializeItems();
  }

  ngOnInit() {
  }


  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  clearList() {

  }

}


