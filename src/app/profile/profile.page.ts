import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private navController: NavController,
    private apiService: ApiService,
    private storage: StorageService
  ) {
  }

  ngOnInit() {
  }

  goBack() {
    this.navController.pop();
  }

  logout() {
    this.storage.logout();
    this.apiService.resetHeaders();
    this.navController.navigateRoot('login');
  }
}
