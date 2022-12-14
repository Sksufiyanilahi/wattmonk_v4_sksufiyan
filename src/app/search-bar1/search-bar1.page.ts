import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { DesginDataModel } from '../model/design.model';
import { UtilitiesService } from '../utilities.service';
import { AssigneeModel } from '../model/assignee.model';
import {Storage} from '@ionic/storage';
import { DrawerState } from 'ion-bottom-drawer';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { StorageService } from '../storage.service';
import { DeclinepagePage } from 'src/app/declinepage/declinepage.page';
import { ErrorModel } from '../model/error.model';
import { EmailModelPage } from 'src/app/email-model/email-model.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { MixpanelService } from '../utilities/mixpanel.service';
import { NavigationExtras, Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';

@Component({
  selector: 'app-search-bar1',
  templateUrl: './search-bar1.page.html',
  styleUrls: ['./search-bar1.page.scss'],
})
export class SearchBar1Page implements OnInit {
searchElement='';
DesignModel:any;
SurveyModel:[];
PestampModel:[];
MixModel:[];
SortedModel:any;
sample:any;
sample1:any;
SearchData:any;
surveyId = 0;
surveyData:any;
segments:any='requesttype=prelim&status=created&status=outsourced&status=requestaccepted';
Type='all';
listOfDesigns: DesginDataModel[];
listOfDesignsHelper: any[];
designerData: any;
listOfAssignees: AssigneeModel[] = [];
listOfAssignees2: AssigneeModel[] = [];
drawerState = DrawerState.Bottom;
assignForm: FormGroup;
showBottomDraw: boolean = false;
designId=0;
userData:any;
  selectedDesigner: any;


  constructor( private apiService:ApiService,private navController: NavController,private formBuilder:FormBuilder,
    private storage: Storage,
    private storageService:StorageService,
    private socialsharing:SocialSharing,
    private utils: UtilitiesService,
    private alertController:AlertController,
    public modalController: ModalController,
    private router: Router,
    private mixpanelService:MixpanelService) {
      this.assignForm = this.formBuilder.group({
        assignedto: new FormControl('', [Validators.required]),
        comment: new FormControl('')
      });


     }

  ngOnInit() {this.userData = this.storageService.getUser();

    this.mixpanelService.track("SEARCH_PAGE_OPEN", {
    });
    this.SortedModel=[]
  }

  searchfor(event){

 if (this.searchElement !=''){
 this.apiService.searchAllDesgin(this.searchElement).subscribe((dataModel:any) =>{


if(this.Type=="survey"){
  this.sample=this.fillinDynamicData(dataModel.survey);
  this.SurveyModel=this.sample;
  this.SortedModel=this.SurveyModel;
  this.chatIcon(this.SortedModel);
}
if(this.Type=="design"){
  this.sample=this.fillinDynamicData(dataModel.design);
  this.DesignModel=this.sample;

  this.SortedModel=this.DesignModel;
  this.chatIcon(this.SortedModel);
}
if(this.Type=="pestamp"){
  this.sample=this.fillinDynamicData(dataModel.pestamp);
  this.PestampModel= this.sample;

  this.SortedModel = this.PestampModel;
  this.chatIcon(this.SortedModel);
}
if(this.Type=="all"){
  this.sample=this.fillinDynamicData(dataModel.survey);
this.SurveyModel=this.sample;

this.sample1=this.fillinDynamicData(dataModel.design);
this.DesignModel=this.sample1;

//this.MixModel=this.SurveyModel.concat(this.DesignModel);
   this.MixModel = dataModel.survey.concat(dataModel.design);

//this.SortedModel=this.MixModel.sort((a,b) => a.id.localecompare(b.id));
      this.SortedModel=this.MixModel.sort((a:any ,b:any) => b.id - a.id);
      this.chatIcon(this.SortedModel);
        }
  })

 }
  }

  ///chat icon
  chatIcon(list:DesginDataModel[]){
    list.forEach(element => {
      var groupMembersRequest = new CometChat.GroupMembersRequestBuilder(element.chatid)
     .build();
      groupMembersRequest.fetchNext().then(
        groupMembers => {

          element.addedtogroupchat=true;
        },
        error => {

        }
      );
    })
  }

  fillinDynamicData(records : DesginDataModel[]) : DesginDataModel[]{

    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);

    });

    return records;
  }

  goBack() {
    this.mixpanelService.track("SEARCH_PAGE_CLOSE", {
    });
    this.navController.pop();
  }



  getDesigns(event) {
     ;
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

  fetchPendingDesigns(event, showLoader: boolean) {

    this.listOfDesigns = [];
    this.listOfDesignsHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
      // this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
      //   this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {


      //     if (event !== null) {
      //       event.target.complete();
      //     }
      //   });
      // }, responseError => {
      //   this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
      //     if (event !== null) {
      //       event.target.complete();
      //     }
      //     const error: ErrorModel = responseError.error;
      //     this.utils.errorSnackBar(error.message[0].messages[0].message);
      //   });
      // });
    });
  }

  openDesigners(id: number,designData) {

    this.designerData = designData;
    this.SearchData=designData;

    if (this.listOfAssignees.length === 0) {

      this.utils.showLoading('Getting Designers').then(() => {
        this.apiService.getDesigners().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));

            this.showBottomDraw = true;
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
              assignedto: 0
            });
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some error occurred. Please try again later');
          });
        });
      });

    } else {
      this.designId = id;
      this.utils.setBottomBarHomepage(false);
      this.drawerState = DrawerState.Docked;
      this.assignForm.patchValue({
        assignedto: 0
      });
    }
  }



  openSurveyors(id: number,surveyData) {
    this.surveyData=surveyData;
    this.SearchData=surveyData;
    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Surveyors').then(() => {
        this.apiService.getSurveyors().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));

            this.showBottomDraw = true;
            this.surveyId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
              assignedto: ''
            });
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some error occurred. Please try again later');
          });
        });
      });

    } else {
      this.surveyId = id;
      this.utils.setBottomBarHomepage(false);
      this.drawerState = DrawerState.Docked;
      this.assignForm.patchValue({
        assignedto: ''
      });
    }


  }


  openAnalysts(id: number,designData) {

    this.designerData = designData;
    this.SearchData=designData;
    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Analysts').then(() => {
        this.apiService.getAnalysts().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));

            this.showBottomDraw = true;
            this.designId = id;
            this.utils.setBottomBarHomepage(false);
            this.drawerState = DrawerState.Docked;
            this.assignForm.patchValue({
              assignedto: 0
            });
          });
        }, (error) => {
          this.utils.hideLoading().then(() => {
            this.utils.errorSnackBar('Some error occurred. Please try again later');
          });
        });
      });

    } else {
      this.designId = id;
      this.utils.setBottomBarHomepage(false);
      this.drawerState = DrawerState.Docked;
      this.assignForm.patchValue({
        assignedto: 0
      });
    }
  }



  async openreviewPassed(id,designData){
    this.designId=id;
    let data=designData;
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
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'deliver',
          handler: (alertData) => {
            var postData= {};
            postData = {
              status: "delivered",
              comments: alertData.comment ,
               };

               if(data.type=="design"){
               this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                this.utils.hideLoading().then(()=>{
                  ;

                 this.utils.showSnackBar('Design request has been delivered successfully');

                  this.utils.setHomepageDesignRefresh(true);
                })
              }, (error) => {
                this.utils.hideLoading();
                ;
              });}
              if(data.type=="survey"){
              this.apiService.updateSurveyForm(postData, this.designId).subscribe((value) => {
                this.utils.hideLoading().then(()=>{
                  ;

                 this.utils.showSnackBar('Survey request has been delivered successfully');

                  this.utils.setHomepageDesignRefresh(true);
                })
              }, (error) => {
                this.utils.hideLoading();
                ;
              });}
          }
        }
      ]
    });

    await alert.present();



  }


  close() {
    if (this.showBottomDraw === true) {
      this.showBottomDraw = false;
      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
    } else {
      this.showBottomDraw = true;
    }
  }

  getassignedata(asssignedata){
    this.selectedDesigner = asssignedata;


  }

 accept(id,data:string){
  let event=null
    let status={
      status:data
    }
    this.apiService.updateDesignForm(status,id).subscribe((res:any)=>{

    })
    this.searchfor(event);

  }


  async decline(id){
    const modal = await this.modalController.create({
      component: DeclinepagePage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        id:id
      },
      backdropDismiss:false
    });
    modal.onDidDismiss().then((data) => {

      if(data.data.cancel=='cancel'){
      }else{
        this.getDesigns(null)
      }
  });
    // modal.dismiss(() => {
    //   ;
    //   this.getDesigns(null);
    // });
    return await modal.present();
  }


  dismissBottomSheet() {
    this.showBottomDraw= false;

    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
    this.listOfAssignees=[];
  }

//assigning to surveyor
assignToSurveyor(){
  if (this.assignForm.status === 'INVALID') {
    this.utils.errorSnackBar('Please select a surveyor');
  } else {
    var designstarttime = new Date();
    var milisecond = designstarttime.getTime();
    var additonalhours = 0;
    if(this.surveyData.requesttype == "prelim"){

      additonalhours = parseInt(this.selectedDesigner.jobcount) * 2;

      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }else{
      additonalhours = parseInt(this.selectedDesigner.jobcount) * 6;
      designstarttime.setHours( designstarttime.getHours() + additonalhours );
    }

    var postData = {};
    if (this.surveyData.createdby.id == this.userData.id) {
      if (this.selectedDesigner.company == this.userData.company) {
        if(this.selectedDesigner.role.type=="qcinspector"){
          postData = {
            reviewassignedto: this.selectedDesigner.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
          };
        }
       if(this.selectedDesigner.role.type=="surveyor") { postData = {
          designassignedto: this.selectedDesigner.id,
          isoutsourced: "false",
          status: "assigned",
          designstarttime: designstarttime
        };

      }

      }
      else {
        postData = {
          outsourcedto: this.selectedDesigner.id,
          isoutsourced: "true",
          status: "outsourced"
        };
      }
    } else {
      if(this.selectedDesigner.role.type=="surveyor"){ postData = {
        designassignedto: this.selectedDesigner.id,
        status: "assigned",
        designstarttime: designstarttime
      };}
      if(this.selectedDesigner.role.type=="qcinspector"){
        postData = {
          reviewassignedto: this.selectedDesigner.id,
          status: "reviewassigned",
          reviewstarttime: milisecond
        };
      }
    }
    this.utils.showLoading('Assigning').then(()=>{
      this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
        this.utils.hideLoading().then(()=>{
          ;

          this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + ' ' +this.selectedDesigner.lastname +' ' +'successfully');
          this.dismissBottomSheet();
          this.showBottomDraw = false;
          this.utils.setHomepageDesignRefresh(true);
        })
      }, (error) => {
        this.utils.hideLoading();
        this.dismissBottomSheet();
        this.showBottomDraw = false;
      });
    })
    }

}

//assigning to designer
  assignToDesigner() {


    if(this.assignForm.status === 'INVALID' && (  this.designerData.status === 'designcompleted' ||this.designerData.status === 'reviewassigned' || this.designerData.status === 'reviewfailed' || this.designerData.status === 'reviewpassed')){
      this.utils.errorSnackBar('Please select a analyst');
    }
    else if (this.assignForm.status === 'INVALID' && ( this.designerData.status === 'created'|| this.designerData.status === 'requestaccepted'|| this.designerData.status === 'designassigned')) {
      this.utils.errorSnackBar('Please select a designer');
    } else {


    var designstarttime = new Date();
    var milisecond = designstarttime.getTime();
    var additonalhours = 0;
    if(this.designerData.requesttype =="prelim"){
    additonalhours = this.selectedDesigner.jobcount * 2;
    designstarttime.setHours( designstarttime.getHours() + additonalhours );
  }else{
    additonalhours = this.selectedDesigner.jobcount * 6;
    designstarttime.setHours( designstarttime.getHours() + additonalhours );
  }
  var postData = {};
  if (this.designerData.createdby.id == this.userData.id) {
    if (this.selectedDesigner.company == this.userData.company) {
      if(this.selectedDesigner.role.type=="qcinspector"){
         postData = {
            reviewassignedto: this.selectedDesigner.id,
            status: "reviewassigned",
            reviewstarttime: milisecond
          };
      }
     if(this.selectedDesigner.role.type=="designer") { postData = {
        designassignedto: this.selectedDesigner.id,
        isoutsourced: "false",
        status: "designassigned",
        designstarttime: designstarttime
      };

    }

    }
    else {
      postData = {
        outsourcedto: this.selectedDesigner.id,
        isoutsourced: "true",
        status: "outsourced"
      };
    }
  } else {
    if(this.selectedDesigner.role.type=="designer"){ postData = {
      designassignedto: this.selectedDesigner.id,
      status: "designassigned",
      designstarttime: designstarttime
    };}
    if(this.selectedDesigner.role.type=="qcinspector"){
      postData = {
        reviewassignedto: this.selectedDesigner.id,
        status: "reviewassigned",
        reviewstarttime: milisecond
      };
    }
  }
  this.utils.showLoading('Assigning').then(()=>{
    this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
      this.utils.hideLoading().then(()=>{
        ;

        this.utils.showSnackBar('Design request has been assigned to' + ' ' + this.selectedDesigner.firstname + ' ' +this.selectedDesigner.lastname +' ' +'successfully');
        this.dismissBottomSheet();
        this.showBottomDraw = false;
        this.utils.setHomepageDesignRefresh(true);
      })
    }, (error) => {
      this.utils.hideLoading();
      this.dismissBottomSheet();
      this.showBottomDraw = false;
    });
  })
  }

}



//method for bottom drawer confirm
assign(){
  if(this.assignForm.status=='INVALID'){
    this.utils.errorSnackBar('Please select a analyst');
  }

  else{if(this.selectedDesigner.role.type=="designer"){
    this.assignToDesigner();
  }
else if(this.selectedDesigner.role.type=="surveyor"){
  this.assignToSurveyor();
}
 else if(this.selectedDesigner.role.type=="qcinspector"){

  if(this.SearchData.type=="design"){
  this.assignToDesigner();}
  if(this.SearchData.type=="survey"){
    this.assignToSurveyor();}
}}
}

shareWhatsapp(designData){
  this.socialsharing.share(designData.prelimdesign.url);
}

 async shareViaEmails(id,designData){
  const modal = await this.modalController.create({
    component: EmailModelPage,
    cssClass: 'email-modal-css',
    componentProps: {
      id:id,
      designData:designData
    },

  });
  modal.onDidDismiss().then((data) => {

    if(data.data.cancel=='cancel'){
    }else{
      this.getDesigns(null)
    }
});
    return await modal.present();
 }

 refreshData(event) {
  let showLoader = true;
  if (event !== null && event !== undefined) {
    showLoader = false;
  }
  this.fetchPendingDesigns(event, showLoader);
}

gotoChats(surveyData,event){
  event.stopPropagation();
  console.log(surveyData)
   let objToSend: NavigationExtras = {
    queryParams: {
     name:surveyData.name +'_'+surveyData.address,
     guid:surveyData.chatid
    },
    skipLocationChange: false,
    fragment: 'top'
};
this.router.navigate(['chat/'+ surveyData.chatid], {
  state: { productdetails: objToSend }
  });
  }

  gotoActivity(search,event){
    console.log(search)
    event.stopPropagation();
  this.router.navigate(['/activity' + '/' + search.id + '/design'])

}

gotoSurveyActivity(search,event){
  console.log(search)
  event.stopPropagation();
this.router.navigate(['/activity' + '/' + search.id + '/survey'])

}


}

export class DesginDataHelper {
  listOfDesigns: DesginDataModel[];
  date: any;
  lateby:any;

  constructor() {
    this.listOfDesigns = [];
  }

}
