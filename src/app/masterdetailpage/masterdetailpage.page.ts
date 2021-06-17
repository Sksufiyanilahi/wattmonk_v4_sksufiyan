import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-masterdetailpage',
  templateUrl: './masterdetailpage.page.html',
  styleUrls: ['./masterdetailpage.page.scss'],
})
export class MasterdetailpagePage implements OnInit {

  @ViewChild('tabs', { static: true }) tabs: IonTabs;

  data: any;
  allData: any;
  requesttype: string;
  user: any;

  dataCheck: any;
  isPrelim: boolean = false;
  isPermit: boolean = false;
  isSurvey: boolean = false;
  isPestamp: boolean = false;
  enableDisable: boolean = false;

  isTabCheck: boolean = true;
  isEditHide : boolean=false;
  constructor(private navController: NavController,
    private utils: UtilitiesService,
    private router: Router,
    private apiService: ApiService,
    private toastController: ToastController,
    private storageService: StorageService) {
    this.allData = this.utils.getPrelimId().value;
    this.requesttype = this.utils.getRequestType().value;
    console.log(this.allData)
    console.log(this.requesttype)
    // if(this.allData.design != null)
    // {
    //   this.isPermit = true
    // }
    // else if(this.allData.design.survey != null)
    // {
    //   this.isSurvey = true
    // }
    if (this.requesttype == 'prelim') {
      this.isPrelim = true;
    }
    else if (this.requesttype == 'survey') {
      this.isSurvey = true
      if (this.allData.prelimdesignsurvey != null) {
        this.isPrelim = true;
      }
    }
    else if (this.requesttype == 'permit') {
      this.isPermit = true;
      if (this.allData.survey != null) {
        console.log(this.allData)
        console.log(this.allData.survey)
        this.isSurvey = true;
        if (this.allData.survey.prelimdesignsurvey != null) {
          this.isPrelim = true;
        }
      }
    }
    else if (this.requesttype == 'pestamp') {
      this.isPestamp = true;
      if (this.allData.design != null) {
        this.isPermit = true;
        if (this.allData.design.survey != null) {
          this.isSurvey = true;
          this.apiService.getSurveyDetail(this.allData.design.survey).subscribe((res: any) => {
            console.log(res);
            this.dataCheck = res;
            if (res.prelimdesignsurvey != null) {
              this.isPrelim = true;
            }
          })
        }
      }

    }
    this.checkTabs();
  }

  ngOnInit() {
    this.user = this.storageService.getUser();
    console.log(this.user)
  }

  checkTabs()
  {
    if(this.isPrelim && !this.isPermit && !this.isSurvey && !this.isPestamp)
    {
      this.isTabCheck = false;
    }
    else if(this.isPermit && !this.isPrelim && !this.isSurvey && !this.isPestamp)
    {
      this.isTabCheck = false;
    }
    else if(this.isSurvey && !this.isPrelim && !this.isPermit && !this.isPestamp)
    {
      this.isTabCheck = false;
    }
    else if(this.isPestamp && !this.isPrelim && !this.isPermit && !this.isPestamp)
    {
      this.isTabCheck = false;
    }
    else 
    {
      this.isTabCheck = true;
    }

  }


  goBack() {

    this.navController.pop();
  }

  changeToggle(event) {
    console.log(event)
    if(event==this.requesttype)
    {
      this.isEditHide = false;
    }
    else{
      this.isEditHide = true;
    }
    if (event == 'prelim') {
      if (this.requesttype == 'survey') {
        this.tabs.select('prelim/'+this.allData.prelimdesignsurvey.id);
        
        //this.router.navigate(['masterdetailpage/prelim/' + this.allData.prelimdesignsurvey.id])
      }
      else if (this.requesttype == 'permit') {
        this.tabs.select('prelim/'+this.allData.prelimdesignsurvey.id);
        
        // this.router.navigate(['masterdetailpage/prelim/' + this.allData.survey.prelimdesignsurvey.id])
      }
      else {
        this.tabs.select('prelim/'+this.dataCheck.prelimdesignsurvey.id);
      
        // this.router.navigate(['masterdetailpage/prelim/' + this.dataCheck.prelimdesignsurvey.id])
      }
      // this.data = this.utils.getPrelimId()

      // this.router.navigate(['masterdetailpage/prelim/'+this.prelimId.value])
    }
    else if (event == 'survey') {
      console.log(this.requesttype)
      if (this.requesttype == 'permit') {
        console.log(this.allData)
        this.tabs.select('survey/'+this.allData.survey.id);
        // this.router.navigate(['masterdetailpage/survey/' + this.allData.survey.id])
      }
      else if (this.requesttype == 'pestamp') {
        console.log(this.allData)
        this.tabs.select('survey/'+this.allData.design.survey);
        // this.router.navigate(['masterdetailpage/survey/' + this.allData.design.survey])
      }
      // this.data = this.utils.getPrelimId()

      // this.tabs.select('prelim/'+this.prelimId.value);
      // this.router.navigate(['masterdetailpage/prelim/'+this.prelimId.value])
    }
    else if (event == 'permit') {
      if (this.requesttype == 'pestamp') {
        this.tabs.select('permit/'+this.allData.design.id);
        // this.router.navigate(['masterdetailpage/permit/' + this.allData.design.id])
      }
      debugger;
      // this.data = this.utils.getPrelimId()

      // this.tabs.select('prelim/'+this.prelimId.value);
      // this.router.navigate(['masterdetailpage/prelim/'+this.prelimId.value])
    }
  }


  edit() {
    if (this.requesttype == 'prelim') {
      if (this.allData.requirementtype == "assessment") {
        this.router.navigate(['/schedule/design/' + this.allData.id]);
      }
      else if (this.allData.requirementtype == 'proposal') {
        this.router.navigate(['/schedule/salesproposal/' + this.allData.id]);
      }
    }
    else if (this.requesttype == 'permit') {
      this.router.navigate(['/permitschedule/' + this.allData.id]);
    }
    else if (this.requesttype == 'survey') {
      this.router.navigate(['/schedule/survey/' + this.allData.id]);
    }
    else {
      this.router.navigate(['/pestamp-schedule/' + this.allData.id]);
    }
  }

  async deleteDesign() {
    this.enableDisable = true;
    if(this.requesttype=='survey'){
    const toast = await this.toastController.create({
      header: 'Delete Design',
      message: 'Are you sure you want to delete this survey?',
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
  else{
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
            this.enableDisable = false;
          }
        }
      ]
    });
    toast.present();
  }
  }

  deleteDesignFromServer() {
    this.utils.showLoading('Deleting Design').then((success) => {
      if (this.requesttype == 'prelim') {
        this.apiService.deleteDesign(this.allData.id).subscribe((result) => {
          this.utils.hideLoading().then(() => {
            this.utils.showSnackBar(this.allData.name + " " + 'has been deleted successfully');
            this.navController.pop();
            this.utils.setHomepageDesignRefresh(true);
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some Error Occurred');
          });

        });
      }
      else if (this.requesttype == 'permit') {
        this.apiService.deleteDesign(this.allData.id).subscribe((result) => {
          this.utils.hideLoading().then(() => {
            this.utils.showSnackBar(this.allData.name + " " + 'has been deleted successfully');
            this.navController.pop();
            this.utils.setHomepagePermitRefresh(true);
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some Error Occurred');
          });

        });
      }
      else if (this.requesttype == 'survey') {
        this.apiService.deleteSurvey(this.allData.id).subscribe((result) => {
          this.utils.hideLoading().then(() => {
            this.utils.showSnackBar('Survey deleted successfully');
            this.navController.pop();
            this.utils.sethomepageSurveyRefresh(true);
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some Error Occurred');
          });
        });
      }
      else {
        this.apiService.deletePestampDesign(this.allData.id).subscribe((result) => {

          this.utils.hideLoading().then(() => {
            this.utils.showSnackBar(this.allData.personname + " " + 'has been deleted successfully');
            this.navController.pop();
            this.utils.setPeStampRefresh(true);
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some Error Occurred');
          });

        });
      }
    });
  }

}
