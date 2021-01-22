import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Pestamp } from '../model/pestamp.model';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pestamp-design-details',
  templateUrl: './pestamp-design-details.page.html',
  styleUrls: ['./pestamp-design-details.page.scss'],
})
export class PestampDesignDetailsPage implements OnInit {
  
  designId:any;
  design:Pestamp;
  enableDisable:boolean=false;
  user:User;

  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private utilities:UtilitiesService,
              private apiService:ApiService,
              private navController: NavController,
              private toastController: ToastController,
              private storage: StorageService,
              private launchNavigator: LaunchNavigator,
              private iab: InAppBrowser) { 
    this.designId = +this.route.snapshot.paramMap.get('id');
    console.log(this.designId);
  }

  ngOnInit() {
    this.user=this.storage.getUser();
    console.log(this.user);
    this.getDesignDetails();
  }

  getDesignDetails() {
    //this.getAssignees();

    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getPestampDetails(this.designId).subscribe((result) => {
        this.utilities.hideLoading();
        console.log('re', result);
        //this.setData(result);
        //this.timer();
        this.design = result;
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  goBack() {
    this.navController.pop();
  }

  async deleteDesign() {
    this.utilities.showHideIntercom(true);
        this.enableDisable= true;
        const toast = await this.toastController.create({
          header: 'Delete Design',
          message: 'Are you sure you want to delete this design?',
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
                this.enableDisable=false;
              }
            }
          ]
        });
        toast.present();
      }

      deleteDesignFromServer() {
        this.utilities.showLoading('Deleting Design').then((success) => {
          this.apiService.deletePestamp(this.designId).subscribe((result) => {
            console.log('result', result);
            this.utilities.hideLoading().then(() => {
              this.utilities.showSnackBar(this.design.personname+" "+'has been deleted successfully');
              this.navController.pop();
              this.utilities.setHomepageDesignRefresh(true);
            });
          }, (error) => {
            this.utilities.hideLoading().then(() => {
              this.utilities.errorSnackBar('Some Error Occurred');
            });
    
          });
        });
      }

      openAddressOnMap(address: string) {
        this.launchNavigator.navigate(address, this.options);
      }

      showreasonImage(attachmentFile:any){
        const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }
}

