import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  public enableDisable: boolean = false;

  constructor(
      private navController: NavController,
      private mixpanelService: MixpanelService
  ) { }

  ngOnInit() {
  }

  goBack() {
      this.mixpanelService.track("Settings_PAGE_CLOSE", {
      });
      this.navController.pop();
  }

  logout(): void {
      console.log('logout');
  }

}

