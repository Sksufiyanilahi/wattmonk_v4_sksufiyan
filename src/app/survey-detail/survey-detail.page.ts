import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilitiesService } from '../utilities.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController, ModalController } from '@ionic/angular';
import { SurveyDataModel } from '../model/survey.model';
import { UserRoles } from '../model/constants';
import { AssigneeModel } from '../model/assignee.model';
import { StorageService } from '../storage.service';
import { DrawerState } from 'ion-bottom-drawer';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from '../model/error.model';
import { Subscription } from 'rxjs';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { ROLES } from '../contants';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { User } from '../model/user.model';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.page.html',
  styleUrls: ['./survey-detail.page.scss'],
})
export class SurveyDetailPage implements OnInit, OnDestroy {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  surveyId: number;
  survey: SurveyDataModel;
  listOfAssignees: AssigneeModel[] = [];
  drawerState = DrawerState.Bottom;
  date: Date;
  user:User;
  reviewcomments:any
  rescheduleForm: FormGroup;
  assigned = false;
  assigneeForm: FormGroup;
  dataSubscription: Subscription;
  refreshDataOnPreviousPage = 0;
  segments:any='SiteDetils';
  electricals:any='MSB';

  reviewenddatetime:number;

  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };

  iseditable = true;

  constructor(
    public utilities: UtilitiesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private storage: StorageService,
    private datePicker: DatePicker,
    private formBuilder: FormBuilder,
    private launchNavigator: LaunchNavigator,
    private toastController: ToastController,
    private modalController:ModalController,
    private photoViewer: PhotoViewer,
    private router:Router
  ) {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
    this.rescheduleForm = this.formBuilder.group({
      datetime: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required])
    });
    this.assigneeForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required])
    });

    if (this.storage.getUser().role.id == ROLES.Surveyor) {
      this.iseditable = false;
    }
  }

  ngOnInit() {
    this.user=this.storage.getUser();

    this.dataSubscription = this.utilities.getSurveyDetailsRefresh().subscribe((result) => {
      this.refreshDataOnPreviousPage++;
      this.getSurveyDetails();
      this.getAssignees();
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    if (this.refreshDataOnPreviousPage > 1) {
      this.utilities.sethomepageSurveyRefresh(true);
    }
  }

  getSurveyDetails() {
    this.utilities.showLoading('Getting Survey Details').then((success) => {
      this.apiService.getSurveyDetail(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading().then(() => {
          this.setData(result);


        });
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  setData(result: SurveyDataModel) {

    this.survey = result;
    if (this.survey.acdisconnect) {
      if (this.survey.acdisconnect === 'true') {
        this.survey.acdisconnect = 'yes';
      } else {
        this.survey.acdisconnect = 'no';
      }
    }
    if (this.survey.pvmeter) {
      if (this.survey.pvmeter === 'true') {
        this.survey.pvmeter = 'yes';
      } else {
        this.survey.pvmeter = 'no';
      }
    }
    this.assigned = this.survey.assignedto !== null && this.survey.assignedto !== undefined;
    this.rescheduleForm.patchValue({
      datetime: this.survey.datetime
    });
  }

  chat() {

  }

  goBack() {
    this.navController.pop();
  }

  getSurveyImages() {
    return this.survey.mspimages.length
      + this.survey.utilitymeterimages.length
      + this.survey.pvinverterimages.length
      + this.survey.pvmeterimages.length
      + this.survey.roofimages.length
      + this.survey.acdisconnectimages.length
      + this.survey.existingsubpanelimages.length
      + this.survey.appliancesimages.length
      + this.survey.atticimages.length
      + this.survey.roofdimensionimages.length
      + this.survey.obstaclesimages.length
      + this.survey.obstaclesdimensionsimages.length;
  }

  async deleteSurvey() {
    const toast = await this.toastController.create({
      header: 'Delete Survey',
      message: 'Are you sure you want to delete this survey?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteSurveyFromServer();
          }
        }, {
          text: 'No'
        }
      ]
    });
    toast.present();
  }

  assignedTo(surveyData){

    let postData = {
      assignedto: this.user.id,
      status: "surveyinprocess"
    };
    this.apiService.updateSurveyForm(postData,surveyData.id).subscribe(res=>{

    })
    this.router.navigate(['/camera/' + surveyData.id + '/' + surveyData.jobtype + '/' + surveyData.city + '/' + surveyData.state + '/' + surveyData.latitude + '/' + surveyData.longitude]);


  }


  deleteSurveyFromServer() {
    this.utilities.showLoading('Deleting Survey').then((success) => {
      this.apiService.deleteSurvey(this.surveyId).subscribe((result) => {
        this.utilities.hideLoading().then(()=>{
          this.utilities.showSnackBar('Survey deleted successfully');
          this.navController.pop();
          this.utilities.sethomepageSurveyRefresh(true);
        });
      }, (error) => {
        this.utilities.hideLoading().then(() => {
          this.utilities.errorSnackBar('Some Error Occurred');
        });
      });
    });
  }

  getAssignees() {
    this.apiService.getSurveyors().subscribe(assignees => {
      this.listOfAssignees = [];
      assignees.forEach(item => this.listOfAssignees.push(item));

    });
  }

  reschedule() {
    this.drawerState = DrawerState.Docked;
    this.date = this.survey.datetime;
  }

  changeDate() {
    const currentDate = new Date(this.date);

    this.datePicker.show({
      date: new Date(this.date),
      minDate: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.date = date;
        this.rescheduleForm.patchValue({
          datetime: this.date.getTime()
        });
      },

    );
  }

  changeTime() {
    const currentDate = new Date(this.date);

    this.datePicker.show({
      date: new Date(this.date),
      mode: 'time',
      minDate: new Date(),
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        const oldDate = new Date(this.date);
        oldDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        this.date = oldDate;
        this.rescheduleForm.patchValue({
          datetime: this.date.getTime()
        });
      },

    );
  }

  rescheduleSurvey() {
    if (this.rescheduleForm.status === 'INVALID') {
      this.utilities.errorSnackBar('Invalid Data');
    } else {
      this.utilities.showLoading('Updating').then(() => {
        this.apiService.updateSurveyForm(this.rescheduleForm.value, this.surveyId).subscribe(response => {
          this.utilities.hideLoading().then(() => {
            this.survey = response;
            this.drawerState = DrawerState.Bottom;
          });
        }, responseError => {
          this.utilities.hideLoading().then(() => {
            const error: ErrorModel = responseError.error;
            if (error.message instanceof String) {
              this.utilities.errorSnackBar(error.message);
            } else if (error.message instanceof Array) {
              this.utilities.errorSnackBar(error.message[0].messages[0].message);
            }
          });
        });
      });
    }
  }

  dismissBottomSheet() {
    this.drawerState = DrawerState.Bottom;
  }

  updateAssignee() {
    if (this.assigneeForm.status === 'INVALID') {
      this.utilities.errorSnackBar('Please select an assignee');
    } else {
      this.utilities.showLoading('Updating').then(() => {
        this.apiService.updateSurveyForm(this.assigneeForm.value, this.surveyId).subscribe((success) => {
          this.utilities.hideLoading().then(() => {
            this.utilities.showSnackBar('Assignee selected');
            this.setData(success);
            this.refreshDataOnPreviousPage++;
          });
        }, (error) => {
          this.utilities.hideLoading().then(() => {
            this.utilities.errorSnackBar('Some Error Occurred');
          });
        });
      });

    }
  }

  openAddressOnMap(address: string) {
    this.launchNavigator.navigate(address, this.options);
  }

  async openModal(image){


    const modal = await this.modalController.create({
      component: ModalPageComponent,
      showBackdrop:true,
      backdropDismiss: true,
      componentProps: {
        image_url : image,
      },
    });
    return await modal.present();
  }

  reportDesignReviewFailure(){


        let cdate = Date.now();
        this.reviewenddatetime = cdate;
       const postData = {
        status: "reviewfailed",
       reviewissues : this.reviewcomments,
        reviewendtime : this.reviewenddatetime,

      };





      this.apiService.updateSurveyForm(
        postData,
        this.survey.id

        )
        .subscribe(
          response => {
            this.utilities.showSnackBar("Survey status has been updated successfully.");
            this.utilities.sethomepageSurveyRefresh(true);
            if(this.user.role.type=='qcinspector'){
              this.navController.navigateRoot(['analystoverview/survey']);}
              else{
                this.navController.navigateRoot(['homepage/survey']);
              }
            //this.data.triggerEditEvent = false;
            //this.dialogRef.close(this.data);
          },
          error => {
            this.utilities.errorSnackBar(

              "Error"
            );
          }
        );
    }


  reportDesignReviewSuccess(){
   // this.countdownservice.stopTimer();
    let cdate = Date.now();
    this.reviewenddatetime = cdate;
  const postData = {
    status: "reviewpassed",
    //reviewissues : this.reviewIssuesForm.get('reviewIssues').value,
    //reviewstarttime : this.reviewstartdatetime,
    reviewissues : this.reviewcomments,
    reviewendtime : this.reviewenddatetime
  };
  this.apiService
  .updateSurveyForm(
    postData,
    this.survey.id

  )
  .subscribe(
    response => {
      this.utilities.showSnackBar("Survey status has been updated successfully.");
      this.utilities.sethomepageSurveyRefresh(true);
      if(this.user.role.type=='qcinspector'){
        this.navController.navigateRoot(['analystoverview/survey']);}
        else{
          this.navController.navigateRoot(['homepage/survey']);
        }
     // this.triggerEditEvent = false;
      //this.dialogRef.close(this.data);
    },
    error => {
      this.utilities.errorSnackBar(
        "Error"
      );
    }
  );
​




  }



  async openreviewPassed(value){
    var checkValue = value;

    if(checkValue == 'pass'){
  const alert = await this.alertController.create({
      cssClass: 'alertClass',
      header: 'Confirm!',
      message:'Would you like to  Add Comments!!',
      inputs:
       [ {name:'comment',
       id:'comment',
          type:'textarea',
        placeholder:'Enter Comment'}
        ] ,
      buttons: [
        {
          text: 'Passed',
        cssClass: 'secondary',
          handler: (alertData) => {

            this.reviewcomments=alertData.comment;
            this.reportDesignReviewSuccess();
           // if(checkValue == 'pass'){
           // this.reportDesignReviewSuccess();
           // }
           // else if(checkValue == 'fail')
           // {
           //   if(this.reviewcomments !== "")
              // {
              // this.reportDesignReviewFailure();
              // }
              // else{
              //   this.utilities.errorSnackBar("Please Enter Issues");
              // }
            }
          }
      ]
    });
    await alert.present();
  }
  else if(checkValue == 'fail'){
    const alert = await this.alertController.create({
      cssClass: 'alertClass',
      header: 'Confirm!',
      message:'Would you like to  Add Comments!!',
      inputs:
       [ {name:'comment',
       id:'comment',
          type:'textarea',
        placeholder:'Enter Comment'}
        ] ,
      buttons: [
        {
          text: 'Failed',
        cssClass: 'secondary',
          handler: (alertData) => {

            this.reviewcomments=alertData.comment;
            if(this.reviewcomments !== ""){
            this.reportDesignReviewFailure();
            }
            else{
              this.utilities.errorSnackBar("Please Enter Issues");
            }
            // if(checkValue == 'pass'){
            // this.reportDesignReviewSuccess();
            // }
            // else if(checkValue == 'fail')
            // {
            //   if(this.reviewcomments !== "")
            //   {
            //   this.reportDesignReviewFailure();
            //   }
            //   else{
            //     this.utilities.errorSnackBar("Please Enter Issues");
            //   }
            // }
          }
        }
      ]
    });
    await alert.present();
  }
  }


showimage(url){
  this.photoViewer.show(url);
}


  }



