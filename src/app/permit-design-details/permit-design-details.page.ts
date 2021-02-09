import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UtilitiesService } from '../utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesginDataModel } from '../model/design.model';
import { UserRoles } from '../model/constants';
import { AssigneeModel } from '../model/assignee.model';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CountdownTimerService, countDownTimerConfigModel, countDownTimerTexts } from 'ngx-timer';
import { User } from '../model/user.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Intercom } from 'ng-intercom';
import { intercomId } from '../contants';
import { NetworkdetectService } from '../networkdetect.service';
import { MixpanelService } from '../utilities/mixpanel.service';
import { DomSanitizer } from '@angular/platform-browser';
// const linkifyUrls = require('linkify-urls');
// const getUrls = require('get-urls');
// import * as getUrls from "get-urls";

@Component({
  selector: 'app-permit-design-details',
  templateUrl: './permit-design-details.page.html',
  styleUrls: ['./permit-design-details.page.scss'],
})
export class PermitDesignDetailsPage implements OnInit {


  designId: number;
  design: DesginDataModel;
  assigned = false;
  listOfAssignees: AssigneeModel[] = [];
  dataSubscription: Subscription;
  assigneeForm: FormGroup;
  refreshDataOnPreviousPage = 0;
  imageName:string[]=[];
  imageName2:string[]=[];
  imagebox :boolean=false;
  reviewenddatetime:number;
  reviewstartdatetime : number;
  reviewIssues='';
  isSelfUpdate: boolean;
  ispermitUpdate:boolean;
  enableDisable:boolean=false;
  exceedfileSize:any;
  permitFileSize:any;

  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  permitFiles: File[]=[];
  targetLength: any;
  image: string;
  timerConfig: any;
  user: User;
  commentsForm: FormGroup;
  reviewIssuesForm: FormGroup;
  //reviewIssues= new FormControl('', Validators.required);
  browser: any;
  deactivateNetworkSwitch: Subscription;
  netSwitch: boolean;
  commentbox: any;
  commentboxdata: any;
  private _link: any;
  // user: import("j:/wattmonk/mobileapp/src/app/model/user.model").User;


  constructor(
    private _element : ElementRef,
    private sanitizer: DomSanitizer,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private launchNavigator: LaunchNavigator,
    private toastController: ToastController,
    private imageCompress: NgxImageCompressService,
    private countdownservice: CountdownTimerService,
    private iab: InAppBrowser,
    private router:Router,
    private intercom:Intercom,
    private network:NetworkdetectService,
    private mixpanelService:MixpanelService

  ) {
    this.utilities.showHideIntercom(true); 
    this.designId = +this.route.snapshot.paramMap.get('id');
    this.assigneeForm = this.formBuilder.group({
      designassignedto: new FormControl('', [Validators.required]),
      status: new FormControl('designassigned'),
    });

    this.commentsForm = this.formBuilder.group({
      comments:new FormControl(''),
      status: new FormControl('designcompleted'),
      permitdesign:new FormControl(null,[Validators.required])
    })

    this.reviewIssuesForm = this.formBuilder.group({
     reviewIssues: new FormControl('',[Validators.required])
    })


  }

 

  

  ionViewDidEnter(){
    
    this.deactivateNetworkSwitch=  this.network.networkSwitch.subscribe(data=>{
      this.netSwitch = data;
      this.utilities.showHideIntercom(true);
      console.log(this.netSwitch);

    })

  }




  ngOnInit() {
    this.utilities.showHideIntercom(true);
    this.enableDisable= false;
    console.log(this.imageName);
    this.user=this.storage.getUser();
    console.log(this.user);
    this.mixpanelService.track('PERMIT_DESIGN_DETAIL_PAGE_OPEN', {
    });
    // console.log("pop after ngoninit");
    // this.utilities.getHomepagePermitRefresh().subscribe(()=>{})

    this.dataSubscription = this.utilities.getPermitDesignDetailsRefresh().subscribe((result) => {
      this.refreshDataOnPreviousPage++;
      this.getDesignDetails();
    });
     ​
  }
  showDesignImage(){
    const browser = this.iab.create(this.design.permitdesign.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }
  showRevisionImage(attachmentFile:any){
    console.log(attachmentFile)
    const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }
  showreasonImage(attachmentFile:any){
    const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }
  showurl(i,value){
    if(value=='attachments'){
      this.browser = this.iab.create(this.design.attachments[i].url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
    }else{
      this.browser = this.iab.create(this.design.architecturaldesign[i].url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
    }

  }

  updatecomments(){
    if (this.commentsForm.status === 'INVALID') {
      this.utilities.errorSnackBar('Please select permit design');
      return false;
    }else{
      if(this.exceedfileSize<=25000000 || this.permitFileSize <= 25000000)
      {
      var data={}
      var date= Date.now();
     if(this.ispermitUpdate){
      data={
        status:"reviewassigned",
        designendtime:date,
        reviewstarttime:date,
        comments:this.commentsForm.get('comments').value
      }
     } else{
       data={
             status:"designcompleted",
             designendtime:date,
             reviewstarttime:date,
             comments:this.commentsForm.get('comments').value

     }}

      this.utilities.showLoading('Submitting').then(()=>{

        this.apiService.updateDesignForm(data,this.designId).subscribe((success)=>{
          this.uploadpreliumdesign(this.designId,'permitdesign');
          this.utilities.hideLoading().then(() => {
            console.log("suc",success);
            this.setData(success);
            // this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " +'successfully');
            // this.utilities.setHomepageDesignRefresh(true);
            this.utilities.getPermitDesignDetailsRefresh();
            if(this.ispermitUpdate){
              this.utilities.setHomepagePermitRefresh(true);
              this.router.navigate(['permitdesignoverview/permitInreview']);


            }

            else
            {
              this.router.navigate(['permitdesignoverview/permitcompleted'])
              // this.utilities.setHomepagePermitRefresh(true);

          }
            // this.navController.navigateRoot(['homepage']);
          });
        },(error) => {
          this.utilities.hideLoading().then(() => {
            this.utilities.errorSnackBar('Some Error Occurred');
          });
        });
      })
    }
    else
    {
      this.utilities.errorSnackBar("File is greater than 25MB")
    }
  }
  }


  timer(){
     //countUpTimerConfigModel
     this.timerConfig = new countDownTimerConfigModel();
     ​
         //custom class
         this.timerConfig.timerClass = 'remainingtimerclass';
     ​
         //timer text values
         this.timerConfig.timerTexts = new countDownTimerTexts();
         this.timerConfig.timerTexts.hourText = " :"; //default - hh
         this.timerConfig.timerTexts.minuteText = " :"; //default - mm
         this.timerConfig.timerTexts.secondsText = " "; //default - ss
         if (this.design.status == "designassigned"){
          let cdate = new Date(this.design.designstarttime);
          console.log(cdate);

          cdate.setHours(cdate.getHours() + 6);
          this.countdownservice.startTimer(cdate);
        }else if (this.design.status == "reviewassigned"){
          let cdate = new Date(this.design.reviewstarttime);
          cdate.setHours(cdate.getHours() + 2);
          this.countdownservice.startTimer(cdate);
        }else if(this.design.status=='designcompleted'){
          this.countdownservice.stopTimer();
        }

  }


  ngOnDestroy(): void {
    // this.utilities.showHideIntercom(false);
    this.dataSubscription.unsubscribe();
    if (this.refreshDataOnPreviousPage > 1) {
      this.utilities.setHomepagePermitRefresh(true);
      this.deactivateNetworkSwitch.unsubscribe();
     }
  }

  getDesignDetails() {
    this.getAssignees();

    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.designId).subscribe((result) => {
        this.utilities.hideLoading();
        console.log('re', result.comments[0].message);
       
        this.commentboxdata = result.comments[0].message;
      //  const urlArray=  Array.from(getUrls(this.commentbox));

      //  urlArray.map(url=>{

      //    this.commentbox.replace(url,`<a href="${url}">${url}</a>`)
      //   })
      //   setTimeout(()=>{
      //     const urlData=this._element.nativeElement.querySelectorAll('a');
      //      urlData.forEach(url=>{
      //        url.addEventListener('click', (event) => 
      //           {
      //              event.preventDefault();
      //              this._link = event.target.href;
      //              console.log('Name is: ' + event.target.innerText);
      //              console.log('Link is: ' + this._link);
      //              this.openUrl(this._link);
      //           }, false);
      //      })         
      //      this.commentboxdata=this.sanitizer.bypassSecurityTrustHtml(this.commentbox);
      //        console.log(this.commentboxdata);
      //   },2000)
        
        this.setData(result);
        this.timer();
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  openUrl(url){
    console.log(url);
    const browser = this.iab.create(url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }

  goBack() {
    this.mixpanelService.track("PERMIT_DESIGN_DETAIL_PAGE_CLOSE", {
    });
    this.navController.pop();
  }

  editDesign() {

  }

  setData(result: DesginDataModel) {
    this.design = result;
    console.log(this.design,">>>>>>>>>>>>>>>>");
    if(this.design.isinrevisionstate && this.design.status=='designassigned'){
      this.imageName=[];
    }else{
    this.imageName= result.permitdesign==null ? '' : result.permitdesign.name + result.permitdesign.ext;
    console.log(this.imageName);}

    if (this.design.newconstruction == true) {
      this.design.newconstruction = 'Yes';
    } else {
      this.design.newconstruction = 'No';
    }
    this.assigned = this.design.designassignedto !== null && this.design.designassignedto !== undefined;
  }

  async deleteDesign() {
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
      this.apiService.deleteDesign(this.designId).subscribe((result) => {
        console.log('result', result);
        this.utilities.hideLoading().then(() => {
          this.utilities.showSnackBar(this.design.name+" "+'has been deleted successfully');
          this.navController.pop();
          this.utilities.setHomepagePermitRefresh(true);
        });
      }, (error) => {
        this.utilities.hideLoading().then(() => {
          this.utilities.errorSnackBar('Some Error Occurred');
        });

      });
    });
  }

  getAssignees() {

    this.apiService.getDesigners().subscribe(assignees => {
      this.listOfAssignees = [];
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

  updateAssignee() {
    if (this.assigneeForm.status === 'INVALID') {
      this.utilities.errorSnackBar('Please select an assignee');
    } else {
      this.utilities.showLoading('Updating').then(() => {
        this.apiService.updateDesignForm(this.assigneeForm.value, this.designId).subscribe((success) => {
          this.utilities.hideLoading().then(() => {
            console.log("suc",success);
            this.setData(success);
            this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " +'successfully');
            this.utilities.setHomepagePermitRefresh(true);
            this.navController.navigateRoot(['homepage']);
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

  showuploadbox(){
    // console.log(this.design.permitdesign.id);
    this.apiService.deletePrelimImage(this.design.permitdesign.id).subscribe(_res=>{})
    console.log(this.imageName);
    this.imageName=[];

  }

  permitfiles(event){


    console.log(this.imageName);
    console.log(event.target.files);
    // for(var i=0; i< event.target.files.length;i++){
      // this.permitFiles.push(event.target.files)
      this.permitFiles= event.target.files;
      this.imageName= event.target.files[0].name;
      this.exceedfileSize = event.target.files[0].size;
      console.log(this.exceedfileSize);
      this.imagebox= true;
    // }
    console.log(this.permitFiles);

      this.targetLength= event.target.files.length;



      var reader = new FileReader();
      reader.onload = (event: any) => {
      var orientation = -1;
      let localUrl = event.target.result;
        // this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
       // console.log(res,">><><><");
        // this.image= res;
    this.imageCompress.compressFile(localUrl, orientation, 500, 500).then(
    result => {
      this.image = result;
      console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
    }
    );

    // })
      }
    reader.readAsDataURL(event.target.files[0]);
      }
   b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

remove(){

    this.permitFiles=[];
    this.imageName= [];
    this.imagebox= false;
    console.log(this.permitFiles);
    console.log(this.imageName);
    this.commentsForm.get('permitdesign').setValue('');


}

permitupdate(event){
  //console.log(this.imageName);
  //console.log(event.target.files);
  // for(var i=0; i< event.target.files.length;i++){
    // this.permitFiles.push(event.target.files)
    this.permitFiles= event.target.files;
    this.permitFileSize = event.target.files[0].size;
    console.log(this.permitFileSize);
    //this.imageName= event.target.files[0].name;
    //this.imagebox= true;
  // }
  //console.log(this.permitFiles);

    this.targetLength= event.target.files.length;



    var reader = new FileReader();
reader.onload = (event: any) => {
var orientation = -1;
let localUrl = event.target.result;
// this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
// console.log(res,">><><><");
// this.image= res;
this.imageCompress.compressFile(localUrl, orientation, 500, 500).then(
  result => {
    this.image = result;
    console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
  }
);

// })
}
reader.readAsDataURL(event.target.files[0]);
}
b64toBlobb = (b64Data, contentType='', sliceSize=512) => {
const byteCharacters = atob(b64Data);
const byteArrays = [];

for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
}

const blob = new Blob(byteArrays, {type: contentType});
return blob;
}

  uploadpreliumdesign(designId?: number, key?: string){

    // else{

      // const blob = this.utilities.getBlobFromImageData(this.permitFiles);
      // console.log(blob);
      //  let blob= this.utilities.b64toBlob(this.image);
      //   console.log(blob);

      // console.log(typeof(this.permitFiles[0]));
      
      console.log(key);
      const imageData = new FormData();
      for(var i=0; i< this.permitFiles.length;i++){
        imageData.append("files",this.permitFiles[i]);
        // if(i ==0){
          imageData.append('path', 'design/' + designId);
          imageData.append('refId', designId + '');
          imageData.append('ref', 'design');
          imageData.append('field', key);
        // }
      }

          this.apiService.uploaddesign(imageData).subscribe(res=>{
            this.utilities.hideLoading().then(()=>{
              console.log(res);
              this.imagebox= false;
              // this.getDesignDetails();
              // this.updatecomments();
              // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res)=>{
              //   this.utilities.getDesignDetailsRefresh();
              //   console.log(res,">>");

              // })
              if(this.isSelfUpdate){
                this.reportDesignReviewSuccess();
              }//else{
               // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res) =>{
             // this.utilities.getDesignDetailsRefresh();





           // });
        //  }
      },err=>{
            this.utilities.hideLoading().then(()=>{
              console.log(err);

            })
          })
        // })
    // }
  })

}


  reportDesignReviewFailure(){
    //console.log("Value is" + this.reviewIssuesForm.value);
    if(this.reviewIssuesForm.valid){
    this.countdownservice.stopTimer();
        let cdate = Date.now();
        this.reviewenddatetime = cdate;
       const postData = {
        status: "reviewfailed",
       reviewissues : this.reviewIssuesForm.get('reviewIssues').value,
        reviewstarttime : this.reviewstartdatetime,
        reviewendtime : this.reviewenddatetime,

      };


      console.log("this is" + this.design.reviewstarttime);

     // console.log("this is"+ this.reviewstartdatetime);
      this.apiService.editDesign(
          this.design.id,
          postData
        )
        .subscribe(
          response => {
            this.utilities.showSnackBar("Permit design status has been updated successfully.");
            this.utilities.setHomepagePermitRefresh(true);
            if(this.user.role.type=='qcinspector'){
              this.router.navigate(['analystoverview/permitdesign']);
              }
              else{
                this.navController.navigateRoot(['permithomepage/permitdesign']);
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
    }else{
      this.utilities.errorSnackBar("Please enter issues");
      this.reviewIssuesForm.markAsTouched();
      this.reviewIssuesForm.markAsDirty();
    }
  }


  designReviewSuccess(){

    if(this.isSelfUpdate && this.permitFiles.length > 0)
    {
      if(this.permitFileSize <= 25000000){
       this.utilities.showLoading("Uploading").then(()=>
      {
        this.uploadpreliumdesign(this.designId,'permitdesign' );
      })

    }
    else{
      this.utilities.errorSnackBar("File is greater than 25MB");
    }
  }else if(this.isSelfUpdate && this.permitFiles.length == 0)
    {
      this.utilities.errorSnackBar("Please attach file");
    }else{
      this.reportDesignReviewSuccess();
    }
  }

  reportDesignReviewSuccess(){
      this.countdownservice.stopTimer();
        let cdate = Date.now();
        this.reviewenddatetime = cdate;
      const postData = {
        status: "reviewpassed",
        reviewissues : this.reviewIssuesForm.get('reviewIssues').value,
        reviewstarttime : this.reviewstartdatetime,
        reviewendtime : this.reviewenddatetime
      };
      this.apiService
      .editDesign(
        this.design.id,
        postData
      )
      .subscribe(
        response => {
          this.utilities.showSnackBar("permit design status has been updated successfully.");
          this.utilities.setHomepagePermitRefresh(true);
          if(this.user.role.type=='qcinspector'){
            this.navController.navigateRoot(['analystoverview/permitdesign']);}
            else{
              this.navController.navigateRoot(['permithomepage/permitdesign']);
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

}
