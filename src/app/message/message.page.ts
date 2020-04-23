import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.pop();
  }

}
