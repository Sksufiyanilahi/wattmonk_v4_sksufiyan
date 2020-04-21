import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private navController: NavController,
    private storage: StorageService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.pop();
  }

  logout() {
    this.storage.logout();
    this.navController.navigateRoot('login');
  }
}
