import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
})
export class GroupDetailsPage implements OnInit {

  designData:any;
  enableDisable: boolean = false;

  constructor(private modalCtrl:ModalController,
              private route:Router,
              private nav:NavParams,
              private toastController:ToastController,
              private utils:UtilitiesService,
              private apiservice:ApiService) { }

  ngOnInit() {
    this.designData= this.nav.get('designData');
  }

  goBack() {
    // this.mixpanelService.track("TEAM_DESIGN_DETAIL_PAGE_CLOSE", {});
   this.modalCtrl.dismiss({'dismissed':true})
    this.route.navigate(['/team-home/group'])
    //this.utils.setteamModuleRefresh(true);
   //this.modalCtrl.dismiss({'dismissed':true})
  // this.utils.setteamModuleRefresh(true);
  // this.navController.pop();
  
  }

  edit(){
    this.modalCtrl.dismiss({'dismissed':true})
    
   // this.route.navigate(['/team-schedule/'+this.designData.id])
   let objToSend: NavigationExtras = {
    queryParams: {
     designData:this.designData,
  
     
    },
    skipLocationChange: false,
    fragment: 'top' 
  };
  this.route.navigate(['/group-schedule/'+this.designData.id], { 
    state: { productdetails: objToSend }
    });
}

async deleteDesign() {
    
  this.enableDisable = true;
  const toast = await this.toastController.create({
    header: 'Delete Design',
    message: 'Are you sure you want to delete this group?',
    cssClass: 'my-custom-delete-class',
    buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.deleteDesignFromServer();
        }
      }, {
        text: 'No',
        handler: () => {
          this.enableDisable = false;
        }
      }
    ]
  });
  toast.present();
}
deleteDesignFromServer() {
  this.utils.showLoading('Deleting Design').then((success) => {
    this.apiservice.deleteGroup(this.designData.id).subscribe((result) => {
      this.utils.hideLoading().then(() => {
        this.utils.showSnackBar(this.designData.firstname + " " + 'has been deleted successfully');
      //  this.navController.pop();
      this.modalCtrl.dismiss({'dismissed':true})
      
      
      this.route.navigate(['/team-home/group'])
      this.utils.setteamModuleRefresh(true);
       // this.utils.setteamModuleRefresh(true);
      });
    }, (error) => {
      this.utils.hideLoading().then(() => {
        this.utils.errorSnackBar('Some Error Occurred');
        this.enableDisable = false;
      });
    });
  });
}

}
