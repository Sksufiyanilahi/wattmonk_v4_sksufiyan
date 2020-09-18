import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-design-details',
  templateUrl: './design-details.page.html',
  styleUrls: ['./design-details.page.scss'],
})
export class DesignDetailsPage implements OnInit, OnDestroy {

  designId: number;
  design: DesginDataModel;
  assigned = false;
  listOfAssignees: AssigneeModel[] = [];
  dataSubscription: Subscription;
  assigneeForm: FormGroup;
  refreshDataOnPreviousPage = 0;
  imageName:string[]=[];
  imagebox :boolean=false;

  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  prelimFiles: File[]=[];
  targetLength: any;
  image: string;
  timerConfig: any;
  user: User;
  // user: import("j:/wattmonk/mobileapp/src/app/model/user.model").User;


  constructor(
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
    private router:Router
  ) {
    this.designId = +this.route.snapshot.paramMap.get('id');
    this.assigneeForm = this.formBuilder.group({
      designassignedto: new FormControl('', [Validators.required]),
      status: new FormControl('designassigned'),
      comment:new FormControl('')
    });
  }

  ngOnInit() {
    console.log(this.imageName);
    // debugger;
    this.user=this.storage.getUser();
    console.log(this.user);
    
    this.dataSubscription = this.utilities.getDesignDetailsRefresh().subscribe((result) => {
      this.refreshDataOnPreviousPage++;
      this.getDesignDetails();
    });
     ​
  }
  showDesignImage(){
    const browser = this.iab.create(this.design.prelimdesign.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
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
          
          cdate.setHours(cdate.getHours() + 2);
          this.countdownservice.startTimer(cdate);
        }else if (this.design.status == "reviewassigned"){
          let cdate = new Date(this.design.reviewstarttime);
          cdate.setMinutes(cdate.getMinutes() + 15);
          this.countdownservice.startTimer(cdate);
        }

  }


  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    if (this.refreshDataOnPreviousPage > 1) {
      this.utilities.setHomepageDesignRefresh(true);
    }
  }

  getDesignDetails() {
    this.getAssignees();

    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.designId).subscribe((result) => {
        this.utilities.hideLoading();
        console.log('re', result);
        this.setData(result);
        this.timer();
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  goBack() {
    this.navController.pop();
  }

  editDesign() {

  }

  setData(result: DesginDataModel) {
    debugger;
    this.design = result;
    console.log(this.design,">>>>>>>>>>>>>>>>");
    this.imageName= result.prelimdesign==null ? '' : result.prelimdesign.name + result.prelimdesign.ext;
    console.log(this.imageName)
    
    if (this.design.newconstruction == true) {
      this.design.newconstruction = 'Yes';
    } else {
      this.design.newconstruction = 'No';
    }
    this.assigned = this.design.designassignedto !== null && this.design.designassignedto !== undefined;
  }

  async deleteDesign() {
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
          text: 'No'
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
          this.utilities.showSnackBar('Desgin deleted successfully');
          this.navController.pop();
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
            this.utilities.setHomepageDesignRefresh(true);
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
    // console.log(this.design.prelimdesign.id);
    this.apiService.deletePrelimImage(this.design.prelimdesign.id).subscribe(_res=>{})
    console.log(this.imageName);
    this.imageName=[];
    
  }

  prelimfiles(event){
    console.log(this.imageName);
    console.log(event.target.files);
    // for(var i=0; i< event.target.files.length;i++){
      // this.prelimFiles.push(event.target.files) 
      this.prelimFiles= event.target.files;
      this.imageName= event.target.files[0].name;
      this.imagebox= true;
    // }
    console.log(this.prelimFiles);
    
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


  uploadpreliumdesign(designId?: number, key?: string){
    // const blob = this.utilities.getBlobFromImageData(this.prelimFiles);
    // console.log(blob);
    //  let blob= this.utilities.b64toBlob(this.image);
    //   console.log(blob);
      
    // console.log(typeof(this.prelimFiles[0]));
    const imageData = new FormData();
    for(var i=0; i< this.prelimFiles.length;i++){
      imageData.append("files",this.prelimFiles[i]);
      // if(i ==0){
        imageData.append('path', 'design/' + designId);
        imageData.append('refId', designId + '');
        imageData.append('ref', 'design');
        imageData.append('field', key);
      // }
    } 
      this.utilities.showLoading('Uploading').then(()=>{
        this.apiService.uploaddesign(imageData).subscribe(res=>{
          this.utilities.hideLoading().then(()=>{
            console.log(res); 
            this.imagebox= false;
            // this.getDesignDetails();
            this.apiService.updateDesignForm({"status":'designcompleted'},this.designId).subscribe((res)=>{
              this.utilities.getDesignDetailsRefresh();
              console.log(res,">>");
              
            })
            this.navController.pop();
            this.router.navigate(['designoverview/completeddesigns'])
           
          })
        },err=>{
          this.utilities.hideLoading().then(()=>{
            console.log(err);
            
          })
        })
      })
  }

}
