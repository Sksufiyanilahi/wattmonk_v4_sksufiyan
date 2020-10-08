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

@Component({
  selector: 'app-search-bar1',
  templateUrl: './search-bar1.page.html',
  styleUrls: ['./search-bar1.page.scss'],
})
export class SearchBar1Page implements OnInit {
searchElement='';
DesignModel:any;
SurveyModel:[];
MixModel:[];
SortedModel:[];
sample:any;
sample1:any;
segments:any='requesttype=prelim&status=created&status=outsourced&status=requestaccepted';
Type='both';
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
    private utils: UtilitiesService,
    private alertController:AlertController,
    public modalController: ModalController,) {
      this.assignForm = this.formBuilder.group({
        assignedto: new FormControl('', [Validators.required]),
        comment: new FormControl('')
      });
       
     
     }

  ngOnInit() {this.userData = this.storageService.getUser();
    console.log(this.userData);
  }

  searchfor(event){
    
 if (this.searchElement !==''){
 this.apiService.searchAllDesgin(this.searchElement).subscribe((dataModel:any) =>{
console.log("inside this",dataModel);

if(this.Type=="survey"){
  this.sample=this.fillinDynamicData(dataModel.survey);
  this.SurveyModel=this.sample;
  this.SortedModel=this.SurveyModel;
}
if(this.Type=="design"){
  this.sample=this.fillinDynamicData(dataModel.design);
  this.DesignModel=this.sample;
 
  this.SortedModel=this.DesignModel;
}
if(this.Type=="both"){
  this.sample=this.fillinDynamicData(dataModel.survey);
this.SurveyModel=this.sample;

this.sample1=this.fillinDynamicData(dataModel.design);
this.DesignModel=this.sample1;

//this.MixModel=this.SurveyModel.concat(this.DesignModel);
   this.MixModel = dataModel.survey.concat(dataModel.design);
   console.log("welcome",this.MixModel);
//this.SortedModel=this.MixModel.sort((a,b) => a.id.localecompare(b.id));
      this.SortedModel=this.MixModel.sort((a:any ,b:any) => b.id - a.id);
        }
  })

 }
  }

  fillinDynamicData(records : DesginDataModel[]) : DesginDataModel[]{
    console.log( "that",records);
    records.forEach(element => {
      element.formattedjobtype = this.utils.getJobTypeName(element.jobtype);
      
    });

    return records;
  }
  
  goBack() {
    this.navController.pop();
  }



  getDesigns(event: CustomEvent) {
    debugger;
    let showLoader = true;
    if (event != null && event !== undefined) {
      showLoader = false;
    }
    this.fetchPendingDesigns(event, showLoader);
  }

  fetchPendingDesigns(event, showLoader: boolean) {
    console.log("inside fetch Designs");
    this.listOfDesigns = [];
    this.listOfDesignsHelper = [];
    this.utils.showLoadingWithPullRefreshSupport(showLoader, 'Getting Designs').then((success) => {
      this.apiService.getDesignSurveys(this.segments).subscribe((response:any) => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          console.log(response);
         
          if (event !== null) {
            event.target.complete();
          }
        });
      }, responseError => {
        this.utils.hideLoadingWithPullRefreshSupport(showLoader).then(() => {
          if (event !== null) {
            event.target.complete();
          }
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        });
      });
    });
  }

  openDesigners(id: number,designData) {
    console.log(designData);
    this.designerData = designData;
    if (this.listOfAssignees.length === 0) {
      if(this.designerData.type=="survey"){
      this.utils.showLoading('Getting Surveyors').then(() => {
        this.apiService.getSurveyors().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
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
    }
    if(this.designerData.type=="design"){
      this.utils.showLoading('Getting Designers').then(() => {
        this.apiService.getDesigners().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
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
    }
    } else {
      this.designId = id;
      this.utils.setBottomBarHomepage(false);
      this.drawerState = DrawerState.Docked;
      this.assignForm.patchValue({
        assignedto: 0
      });
    }
  }



  openAnalysts(id: number,designData) {
    console.log("this is",designData);
    this.designerData = designData;
    
    if (this.listOfAssignees.length === 0) {
      this.utils.showLoading('Getting Analysts').then(() => {
        this.apiService.getAnalysts().subscribe(assignees => {
          this.utils.hideLoading().then(() => {
            this.listOfAssignees = [];
            // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
            assignees.forEach(item => this.listOfAssignees.push(item));
            console.log(this.listOfAssignees);
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
    this.designId=id
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'deliver',
          handler: (alertData) => {
            var postData= {};
            postData = {
              status: "delivered",
              comments: alertData.comment ,
               };
               console.log(postData);
               this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
                this.utils.hideLoading().then(()=>{
                  ; 
                  console.log('reach ', value);
                 this.utils.showSnackBar('Design request has been delivered successfully');
                 
                  this.utils.setHomepageDesignRefresh(true);
                })
              }, (error) => {
                this.utils.hideLoading();
                ;
              });
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

    let status={
      status:data
    }
    this.apiService.updateDesignForm(status,id).subscribe((res:any)=>{
      this.getDesigns(null);
    })
  }


  async decline(id){
    const modal = await this.modalController.create({
      component: DeclinepagePage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        id:id
      },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      if(data.data.cancel=='cancel'){
      }else{
        this.getDesigns(null)
      }
  });
    
    return await modal.present();
  }

  dismissBottomSheet() {
    console.log('this', this.drawerState);
    this.drawerState = DrawerState.Bottom;
    this.utils.setBottomBarHomepage(true);
    this.listOfAssignees=[];
  }

  assignToDesigner() {
    console.log(this.designerData.createdby.id);
    
  if (this.assignForm.status === 'INVALID') {
    this.utils.errorSnackBar('Please select a designer');
  } else {
    
   
    var designstarttime = new Date();
  var additonalhours = 0;
  if(this.designerData.requesttype == "prelim"){
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
          designassignedto: this.selectedDesigner.id,
          isoutsourced: "false",
          status: "reviewassigned",
          designstarttime: designstarttime
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
        designassignedto: this.selectedDesigner.id,
        status: "reviewassigned",
        designstarttime: designstarttime
      };
    }
  }
  this.utils.showLoading('Assigning').then(()=>{
    this.apiService.updateDesignForm(postData, this.designId).subscribe((value) => {
      this.utils.hideLoading().then(()=>{
        ; 
        console.log('reach ', value);
        this.utils.showSnackBar('Design request has been assigned to' + ' ' + value.name + ' ' + 'successfully');
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


}

export class DesginDataHelper {
  listOfDesigns: DesginDataModel[];
  date: any;
  lateby:any;

  constructor() {
    this.listOfDesigns = [];
  }
  
}
