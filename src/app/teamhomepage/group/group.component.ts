import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { GroupdetailsPage } from 'src/app/groupdetails/groupdetails.page';
import { GroupModel } from 'src/app/model/group.model';
import { UtilitiesService } from 'src/app/utilities.service';

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
        console.log(res);
        if(res.length > 0){
          this.groupData = res;
        }else{
          this.noDesignFound = "No Design Found";
        }
        console.log(this.groupData);
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
      component: GroupdetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        designData: data
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)

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
