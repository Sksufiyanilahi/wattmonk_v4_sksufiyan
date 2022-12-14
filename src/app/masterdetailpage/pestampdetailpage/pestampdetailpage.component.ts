import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { Pestamp } from 'src/app/model/pestamp.model';
import { User } from 'src/app/model/user.model';
import { StorageService } from 'src/app/storage.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MixpanelService } from 'src/app/utilities/mixpanel.service';
import { ErrorModel } from 'src/app/model/error.model';

@Component({
  selector: 'app-pestampdetailpage',
  templateUrl: './pestampdetailpage.component.html',
  styleUrls: ['./pestampdetailpage.component.scss'],
})
export class PestampdetailpageComponent implements OnInit {

   
  pestampdesignId:any;
  pestampdesign:Pestamp;
  enableDisable:boolean=false;
  user:User;
  pestampForm:FormGroup;
  commentform:FormGroup;
  stampfile: any=[];
  designstartdatetime: number;
  designenddatetime: number;
  imageName:any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  indexOfstampFiles: any;
  nullValue = '-';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private utilities:UtilitiesService,
              private apiService:ApiService,
              private navController: NavController,
              private toastController: ToastController,
              private storage: StorageService,
              private formbuilder:FormBuilder,
              private cdr:ChangeDetectorRef,
              private navctrl:NavController,
              private iab: InAppBrowser,
              private launchNavigator: LaunchNavigator,
              private mixpanelService:MixpanelService) {
                this.pestampForm= this.formbuilder.group({
                  workinghours: new FormControl(null,[Validators.required]),
                 // comments:new FormControl(null),
                  status: new FormControl('completed'),
                  stampedfiles: new FormControl('',[Validators.required]),
                })
                this.commentform = this.formbuilder.group({
                  comments:new FormControl(null)
                })


    this. pestampdesignId = +this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.user=this.storage.getUser();

    this.mixpanelService.track('PESTAMP_DESIGN_DETAIL_PAGE_OPEN', {
    });
    this.getDesignDetails();



  }

  getDesignDetails() {
    //this.getAssignees();

    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getPestampDetails(this. pestampdesignId).subscribe((result) => {
        this.utilities.hideLoading();

        //this.setData(result);
        //this.timer();
        this. pestampdesign = result;
        this.validations();
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  goBack() {
    this.mixpanelService.track("PESTAMP_DESIGN_DETAIL_PAGE_CLOSE", {
    });
    this.navController.pop();
  }

  async deleteDesign() {
        this.enableDisable= true;
        const toast = await this.toastController.create({
          header: 'Delete Design',
          message: 'Are you sure you want to delete this PE Stamp?',
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
          this.apiService.deletePestamp(this.pestampdesignId).subscribe((result) => {

            this.utilities.hideLoading().then(() => {
              this.utilities.showSnackBar(this. pestampdesign.personname+" "+'has been deleted successfully');
              this.navController.pop();
              this.utilities.setPeStampRefresh(true);
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

      validations()
      {
        const working = this.pestampForm.get('workinghours');
        const stamped = this.pestampForm.get('stampedfiles');
        const NUMBERPATTERN = '^[0-9]+$';
        if(this. pestampdesign.propertytype == 'commercial')
        {
          stamped.setValidators([Validators.required]);
          working.setValidators([Validators.required,Validators.min(1),Validators.max(48),Validators.pattern(NUMBERPATTERN)]);
        }
        else
        {
          stamped.setValidators([Validators.required]);
          working.clearValidators();
          working.reset();
        }
        working.updateValueAndValidity();
        stamped.updateValueAndValidity();
      }

      submit(){
        //this.validations();
         ;
        if(this.pestampForm.status=='INVALID'){
          // if(this. pestampdesign.propertytype=='commercial'){

          //   if(this.pestampForm.get('stampedfiles').value=='')
          //   {

          //     this.utilities.errorSnackBar('Please attach stamped file');
          //   }else if(this.pestampForm.get('workinghours').value==null){

          // this.utilities.errorSnackBar('Please add working hours');
          //   }
          // }
          // else{
          //   this.utilities.errorSnackBar('Please attach stamped file');
          // }

          if(this.pestampForm.get('stampedfiles').value=='')
          {
            this.utilities.errorSnackBar('Please attach stamped file');
          }
          else if(this.pestampForm.get('workinghours').value==null)
          {
            this.utilities.errorSnackBar('Please add working hours');
          }else if(this.pestampForm.get('workinghours').hasError('max') || this.pestampForm.get('workinghours').hasError('min') || this.pestampForm.get('workinghours').hasError('pattern')){
            // this.utilities.errorSnackBar('Maximum working hours should be 48');
            this.utilities.errorSnackBar('Please enter a valid working hours');
          }
          return false;
        }else{
          let cdate = Date.now();
    this.designenddatetime = cdate;
    let workinghours = this.pestampForm.get('workinghours').value;
    var postData;
    // const postData = {
    //   status: "completed",
    //   pestampstarttime: this.designstartdatetime,
    //   pestampendtime: this.designenddatetime,
    //   comments: this.commentform.get('comments').value,
    //   workinghours : this.pestampForm.get('workinghours').value
    // };
    // if (this. pestampdesign.type == 'both' && this. pestampdesign.propertytype=='commercial') {
    //   if (this.user.peengineertype == 'electrical') {
    //     postData = {
    //       status: "completed",
    //       pestampstarttime: this.designstartdatetime,
    //       pestampendtime: this.designenddatetime,
    //       comments: this.commentform.get('comments').value,
    //       electricalworkinghours: workinghours,
    //       iselectricalstampeduploaded: true
    //     }
    //   }
    //   else {
    //     postData = {
    //       status: "completed",
    //       pestampstarttime: this.designstartdatetime,
    //       pestampendtime: this.designenddatetime,
    //       comments: this.commentform.get('comments').value,
    //       structuralworkinghours: workinghours,
    //       isstructuralstampeduploaded: true
    //     }
    //   }
    // }
    // else {
    //   if(this. pestampdesign.type=='both'){
    //     if (this.user.peengineertype == 'electrical') {
    //       postData = {
    //         status: "completed",
    //         pestampstarttime: this.designstartdatetime,
    //         pestampendtime: this.designenddatetime,
    //         comments: this.commentform.get('comments').value,
    //         iselectricalstampeduploaded: true
    //       }
    //     }
    //     else {
    //       postData = {
    //         status: "completed",
    //         pestampstarttime: this.designstartdatetime,
    //         pestampendtime: this.designenddatetime,
    //         comments: this.commentform.get('comments').value,
    //         isstructuralstampeduploaded: true
    //       }
    //     }
    //   }
    //   else{
    //     postData = {
    //       status: "completed",
    //       pestampstarttime: this.designstartdatetime,
    //       pestampendtime: this.designenddatetime,
    //       comments: this.commentform.get('comments').value,
    //     }
    //   }
    // }

    if (this.pestampdesign.propertytype == 'commercial') {
      if (this.pestampdesign.type == 'both') {
        if (this.user.peengineertype == 'electrical') {
          postData = {
            status: "completed",
            pestampstarttime: this.designstartdatetime,
            pestampendtime: this.designenddatetime,
            comments: this.commentform.get('comments').value,
            // electricalworkinghours: Number(workinghours) + Number(this.pestampdesign.electricalworkinghours),
            electricalworkinghours: Number(workinghours),
            iselectricalstampeduploaded: true
          }
        }
        else {
          postData = {
            status: "completed",
            pestampstarttime: this.designstartdatetime,
            pestampendtime: this.designenddatetime,
            comments: this.commentform.get('comments').value,
            // structuralworkinghours: Number(workinghours) + Number(this.pestampdesign.structuralworkinghours),
            structuralworkinghours: Number(workinghours),
            isstructuralstampeduploaded: true
          }
        }
      }
      else {
        postData = {
          status: "completed",
          pestampstarttime: this.designstartdatetime,
          pestampendtime: this.designenddatetime,
          comments: this.commentform.get('comments').value,
          // workinghours:Number(workinghours) + Number(this.pestampdesign.workinghours)
          workinghours:Number(workinghours)
        }
      }
    }
    else {
      if (this.pestampdesign.type == 'both') {
        if (this.user.peengineertype == 'electrical') {
          postData = {
            status: "completed",
            pestampstarttime: this.designstartdatetime,
            pestampendtime: this.designenddatetime,
            comments: this.commentform.get('comments').value,
            iselectricalstampeduploaded: true
          }
        }
        else {
          postData = {
            status: "completed",
            pestampstarttime: this.designstartdatetime,
            pestampendtime: this.designenddatetime,
            comments:this.commentform.get('comments').value,
            isstructuralstampeduploaded: true
          }
        }
      }
      else {
        postData = {
          status: "completed",
          pestampstarttime: this.designstartdatetime,
          pestampendtime: this.designenddatetime,
          comments: this.commentform.get('comments').value,
        }
      }
    }
          this.utilities.showLoading('Submitting').then(()=>{
         // this.apiService.updatePestamps(this. pestampdesignId,this.pestampForm.value).subscribe(res=>{
          this.apiService.updatePestamps(this. pestampdesignId,postData).subscribe(res=>{
            this.utilities.hideLoading().then(() => {
              this.uploadStampedFiles(res.id,this.stampfile[0])

              // this.navController.pop();
              // this.utilities.setPeStampRefresh(true);
            })
          },err=>{


          })
        })
        }
      }

      removeArc(i) {
        this.stampfile.splice(i, 1);
      }

      remove(stamp,i){


        this.indexOfstampFiles.push( stamp.id);



        this.stampfile.splice(i, 1);

        }

        files(event){

           for(var i=0; i< event.target.files.length;i++){
             this.stampfile.push(event.target.files[i])
           }
         // this.stampfile = event.target.files;

         }

          /* FOR UPLOAD Stamped FILES */
       uploadStampedFiles(recordid: number,file: string){

        var path;
        if (this.pestampdesign.type == 'both') {
          if (this.user.peengineertype == 'electrical') {
            path = "electricalstampedfiles"
          }
          else {
            path = "structuralstampedfiles"
          }
        }
        else {
          path = "stampedfiles"
        }

         const data = new FormData();
         for(var i=0; i< this.stampfile.length;i++){
           data.append("files",this.stampfile[i]);
           if(i ==0){
            //data.append('files', file);
            data.append('path', "pestamp/" + recordid);
            data.append('refId', ""+recordid);
            data.append('ref', "pestamp");
            data.append('field', path);


           }
         }
         this.utilities.showLoading("Stamped File Uploading").then(()=>{
         this.apiService.uploadFile(data).subscribe(res=>{
           this.utilities.hideLoading();

           this.navController.pop();
              this.utilities.setPeStampRefresh(true);

         }, responseError => {
          this.utilities.hideLoading();
          const error: ErrorModel = responseError.error;
          this.utilities.errorSnackBar(error.message[0].messages[0].message);
        })
      })

       }


      showreasonImage(attachmentFile:any){
        const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }

      showAtticImage(attachmentFile:any){
        const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }

      showRoofImage(attachmentFile:any){
        const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }

      showPermitPlan(attachmentFile:any){
        const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }

      showStampedFile(attachmentFile:any){

        const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }

      showRevisionImage(revisionattachment:any){

        const browser = this.iab.create(revisionattachment.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }
      // files(event){


      //   this.isAtticFileUpload = true;
      //    for(var i=0; i< event.target.files.length;i++){
      //      this.atticPhotosList.push(event.target.files[i])
      //    }
      //    //this.architecturalFileUpload= true;

      //  }


}
