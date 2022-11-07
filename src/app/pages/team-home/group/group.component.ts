import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { GroupModel } from 'src/app/models/group.model';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { GroupDetailsPage } from '../../group-details/group-details.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {


  private TeamRefreshSubscription: Subscription;
  groupData:GroupModel[];
  noDesignFound: string;
  constructor(private utils:UtilitiesService,
              private apiService:ApiService,
              private modalController:ModalController) { }

  ngOnInit() {
    this.TeamRefreshSubscription = this.utils.getteamModuleRefresh().subscribe((result) => {
      this.getGroups(null);
    })
  }

  getGroups(event) {

    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.getGroupData(event,showLoader);
  }

  getGroupData(event,showLoader:boolean){
    this.groupData = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Groups').then((success) => {
      this.apiService.getGroupData().subscribe((res:any)=>{
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {

        if(res.length > 0){
          this.groupData = res;
        }else{
          this.noDesignFound = "No Design Found";
        }

        if (event !== null) {
          event.target.complete();
        }
        })
      }, (error) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (event !== null) {
            event.target.complete();
          }
          this.utils.errorSnackBar('Some Error Occurred');
        });
      })
    })
  }

  async groupdetail(data, event) {
    event.stopPropagation();
    // this.mixpanelService.track("DECLINE_TEAM_DETAIL_PAGE_OPEN", {
    // });
    const modal = await this.modalController.create({
      component: GroupDetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        designData: data
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {


      if (data.data.cancel == 'cancel') {
      } else {
      }
    });
    return await modal.present();
  }

  refreshDesigns(event) {
    // this.skip=0;
    let showLoader = true;
    if (event !== null && event !== undefined) {
      showLoader = false;
    }
    this.getGroupData(event,showLoader);
  }


}
