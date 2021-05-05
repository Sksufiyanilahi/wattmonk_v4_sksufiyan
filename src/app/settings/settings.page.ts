import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MixpanelService } from '../utilities/mixpanel.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  

  constructor(private navController: NavController,private mixpanelService:MixpanelService) { }

  ngOnInit() {
  }

  goBack() {
    this.mixpanelService.track("Settings_PAGE_CLOSE", {
    });
    this.navController.pop();
  }

}
