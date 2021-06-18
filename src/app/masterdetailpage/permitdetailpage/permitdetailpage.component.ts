import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DesginDataModel } from 'src/app/model/design.model';
import { UserRoles } from 'src/app/model/constants';
import { AssigneeModel } from 'src/app/model/assignee.model';
import { StorageService } from 'src/app/storage.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CountdownTimerService, countDownTimerConfigModel, countDownTimerTexts } from 'ngx-timer';
import { User } from 'src/app/model/user.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NetworkdetectService } from 'src/app/networkdetect.service';
import { MixpanelService } from 'src/app/utilities/mixpanel.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-permitdetailpage',
  templateUrl: './permitdetailpage.component.html',
  styleUrls: ['./permitdetailpage.component.scss'],
})
export class PermitdetailpageComponent implements OnInit {


  permitdesignId: number;
  permitdesign: DesginDataModel;
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
  nullValue = '-';

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
    private network:NetworkdetectService,
    private mixpanelService:MixpanelService

  ) {
    this.permitdesignId = +this.route.snapshot.paramMap.get('id');
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

    })

  }




  ngOnInit() {
    this.enableDisable= false;
    this.user=this.storage.getUser();

     this.mixpanelService.track('PERMIT_DESIGN_DETAIL_PAGE_OPEN', {
    });
    //
    // this.utilities.getHomepagePermitRefresh().subscribe(()=>{})

    this.dataSubscription = this.utilities.getPermitDesignDetailsRefresh().subscribe((result) => {
      this.refreshDataOnPreviousPage++;
      this.getDesignDetails();
    });
     ​
  }
  showDesignImage(){
    const browser = this.iab.create(this.permitdesign.permitdesign.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }
  showRevisionImage(attachmentFile:any){
    const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }
  showreasonImage(attachmentFile:any){
    const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
  }
  showurl(i,value){
    if(value=='attachments'){
      this.browser = this.iab.create(this.permitdesign.attachments[i].url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
    }else{
      this.browser = this.iab.create(this.permitdesign.architecturaldesign[i].url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
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

        this.apiService.updateDesignForm(data,this.permitdesignId).subscribe((success)=>{
          this.utilities.hideLoading().then(()=>{
            this.setData(success);
          this.uploadpreliumdesign(this.permitdesignId,'permitdesign');
          // this.utilities.hideLoading().then(() => {


            // this.utilities.showSnackBar('Design request has been assigned to' + " " + success.name + " " +'successfully');
            // this.utilities.setHomepageDesignRefresh(true);

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
         if (this.permitdesign.status == "designassigned"){
          let cdate = new Date(this.permitdesign.designstarttime);


          cdate.setHours(cdate.getHours() + 6);
          this.countdownservice.startTimer(cdate);
        }else if (this.permitdesign.status == "reviewassigned"){
          let cdate = new Date(this.permitdesign.reviewstarttime);
          cdate.setHours(cdate.getHours() + 2);
          this.countdownservice.startTimer(cdate);
        }else if(this.permitdesign.status=='designcompleted'){
          this.countdownservice.stopTimer();
        }

  }


  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    if (this.refreshDataOnPreviousPage > 1) {
      this.utilities.setHomepagePermitRefresh(true);
      this.deactivateNetworkSwitch.unsubscribe();
     }
  }

  getDesignDetails() {
    this.getAssignees();

    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.permitdesignId).subscribe((result) => {
        this.utilities.hideLoading();
        //

       // this.commentboxdata = result.comments[0].message;
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
      //
      //
      //              this.openUrl(this._link);
      //           }, false);
      //      })
      //      this.commentboxdata=this.sanitizer.bypassSecurityTrustHtml(this.commentbox);
      //
      //   },2000)

        this.setData(result);
        this.timer();
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  openUrl(url){

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
    this.permitdesign = result;

    if(this.permitdesign.isinrevisionstate && this.permitdesign.status=='designassigned'){
      this.imageName=[];
    }else{
    this.imageName= result.permitdesign==null ? '' : result.permitdesign.name + result.permitdesign.ext;

  }

    if (this.permitdesign.newconstruction == true) {
      this.permitdesign.newconstruction = 'Yes';
    } else {
      this.permitdesign.newconstruction = 'No';
    }
    this.assigned = this.permitdesign.designassignedto !== null && this.permitdesign.designassignedto !== undefined;
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
      this.apiService.deleteDesign(this.permitdesignId).subscribe((result) => {

        this.utilities.hideLoading().then(() => {
          this.utilities.showSnackBar(this.permitdesign.name+" "+'has been deleted successfully');
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

    });
  }

  updateAssignee() {
    if (this.assigneeForm.status === 'INVALID') {
      this.utilities.errorSnackBar('Please select an assignee');
    } else {
      this.utilities.showLoading('Updating').then(() => {
        this.apiService.updateDesignForm(this.assigneeForm.value, this.permitdesignId).subscribe((success) => {
          this.utilities.hideLoading().then(() => {

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
    //
    this.apiService.deletePrelimImage(this.permitdesign.permitdesign.id).subscribe(_res=>{})

    this.imageName=[];

  }

  permitfiles(event){
    // for(var i=0; i< event.target.files.length;i++){
      // this.permitFiles.push(event.target.files)
      this.permitFiles= event.target.files;
      this.imageName= event.target.files[0].name;
      this.exceedfileSize = event.target.files[0].size;
      this.imagebox= true;
    // }

      this.targetLength= event.target.files.length;



      var reader = new FileReader();
      reader.onload = (event: any) => {
      var orientation = -1;
      let localUrl = event.target.result;
        // this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
       //
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
    this.commentsForm.get('permitdesign').setValue('');


}

permitupdate(event){
  //
  //
  // for(var i=0; i< event.target.files.length;i++){
    // this.permitFiles.push(event.target.files)
    this.permitFiles= event.target.files;
    this.permitFileSize = event.target.files[0].size;
    //this.imageName= event.target.files[0].name;
    //this.imagebox= true;
  // }
  //

    this.targetLength= event.target.files.length;



    var reader = new FileReader();
reader.onload = (event: any) => {
var orientation = -1;
let localUrl = event.target.result;
// this.imageCompress.compressFile(localUrl,orientation, 1000, 1000).then(res=>{
//
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
      //
      //  let blob= this.utilities.b64toBlob(this.image);
      //

      //

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
      this.utilities.showLoading("Permit File Uploading").then(()=>{
          this.apiService.uploaddesign(imageData).subscribe(res=>{
            //this.utilities.hideUploadingLoading();
            this.utilities.hideLoading().then(()=>{
              this.imagebox= false;
              // this.getDesignDetails();
              // this.updatecomments();
              // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res)=>{
              //   this.utilities.getDesignDetailsRefresh();
              //

              // })
              //this.utilities.getPermitDesignDetailsRefresh();
            if(this.ispermitUpdate){
               this.router.navigate(['permitdesignoverview/permitInreview']);
              this.utilities.setHomepagePermitRefresh(true);

            }
            else if(this.isSelfUpdate){
              this.reportDesignReviewSuccess();
            }
            else
            {
              this.router.navigate(['permitdesignoverview/permitcompleted'])
               this.utilities.setHomepagePermitRefresh(true);

          }
              //else{
               // this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res) =>{
             // this.utilities.getDesignDetailsRefresh();





           // });
        //  }
      },err=>{
        //this.utilities.hideUploadingLoading();
            this.utilities.hideLoading().then(()=>{


            })
          })
        })
        // })
    // }
  })

}


  reportDesignReviewFailure(){
    //
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

     //
      this.apiService.editDesign(
          this.permitdesign.id,
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
      //  this.utilities.showLoading("Uploading").then(()=>
      // {
        this.uploadpreliumdesign(this.permitdesignId,'permitdesign' );
      // })

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
        this.permitdesign.id,
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
