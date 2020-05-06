import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-popup',
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss'],
})
export class MenuPopupComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) {
  }

  ngOnInit() {
  }

  showImages(keyname: string) {
    this.popoverController.dismiss(keyname);
  }
}
