import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { GroupdetailsPage } from 'src/app/groupdetails/groupdetails.page';
import { UtilitiesService } from 'src/app/utilities.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

  groupData:any;
  constructor(private utils:UtilitiesService,
              private apiService:ApiService,
              private modalController:ModalController) { }

  ngOnInit() {
    this.getGroupData();
  }

  getGroupData(){
    this.utils.showLoading("Getting Groups").then(()=>{
      this.apiService.getGroupData().subscribe((res:any)=>{
        console.log(res);
        this.groupData = res;
        console.log(this.groupData);
        this.utils.hideLoading();
      }, (error) => {
        this.utils.hideLoading().then(() => {
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

}
