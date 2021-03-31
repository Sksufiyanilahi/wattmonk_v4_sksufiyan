import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-resendpagedialog',
  templateUrl: './resendpagedialog.page.html',
  styleUrls: ['./resendpagedialog.page.scss'],
})
export class ResendpagedialogPage implements OnInit {
  exceedfileSize:number=0;
  id: any;
  reason: any;
  blob: Blob;
  filename: string;
  enableDisable:boolean=true;
  successmessage: string;
  requestType:any;
  userData:any;

  pestampResendList:any=[];
  pestampResendFileUpload:boolean = false;

  constructor(private camera: Camera,
    private modalCtrl:ModalController,
    private apiservice:ApiService,
    private nav:NavParams,
    private utilities:UtilitiesService,
    private chooser: Chooser,
    private file:File,
    private storageService:StorageService
     ) { }

  ngOnInit() {
    this.userData = this.storageService.getUser();
    this.id= this.nav.get('id');

    this.requestType = this.nav.get('requesttype');


  }




  selectAttachment(){
    this.exceedfileSize=0;
    // const options: CameraOptions = {
    //   quality: 30,
    //   targetWidth:600,
    //   targetHeight:300,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.PNG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    this.chooser.getFile()
  .then((file) =>
    {

        this.filename= file.name;
        this.file.resolveLocalFilesystemUrl(file.uri).then((fileentry:FileEntry)=>{
          fileentry.file(fileObj=>{

            this.blob=fileObj;


           if(fileObj.size > 1024 * 1024 * 1){
            this.exceedfileSize = fileObj.size;
            this.enableDisable =true;
           }else{
            //  this.enableDisable = false;
              this.getBase64(fileObj).then(res=>{
                let base64file= file.dataURI + res;
                this.blob= this.utilities.b64toBlob(base64file);

            });

           }

          })
      })


    }

    )
  .catch((error: any) => console.error(error));


    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   this.blob = this.utilities.b64tBlob(base64Image);


    //   this.filename = Date.now().toString() + '.png';
    //   if(this.blob){
    //     this.uploadFile();
    //   }
    //  }, (err) => {
    //   // Handle error
    //  })
  }

  cancel(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      cancel:'cancel'
    });
  }

  detectchange(){
    // 26214400
    if(this.reason==undefined || this.reason==''){
      this.enableDisable= true;
    }else{

        this.enableDisable= false;
    }
  }

  submit(){

    if(this.exceedfileSize < 1048576 && this.exceedfileSize!=0){
      if(this.pestampResendFileUpload)
      {
        this.pestampResendFile();
      }
      else{
      this.uploadFile();
      }

    }else if(this.filename !=='' && this.exceedfileSize > 1048576){



    }else{
      if(this.requestType=='pestamp')
      {
        let cdate = Date.now();
        var pestampacceptancestarttime = new Date();
    pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
    const postData = {
      // status: "accepted",
      // isoutsourced: "true",
      // isinrevisionstate : "true",
      // revisioncomments: this.reason,
      // pestampacceptancestarttime: pestampacceptancestarttime,
      // actualdelivereddate: null
      status: "assigned",
      isoutsourced: "true",
      isinrevisionstate: "true",
      revisioncomments: this.reason,
      pestampacceptancestarttime: pestampacceptancestarttime,
      actualdelivereddate: null,
      acceptedbypeengineer: false,
      declinedbypeengineer: false
    };
      this.apiservice.assignPestamps(this.id,postData).subscribe((res:any)=>
      {
        this.utilities.showSnackBar("Pestamp request has been send for revision successfully.");
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      })
      }
      else{
      var data={}
      if(this.requestType=='prelim'){
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes()+15);
       data={
        deliverydate:tomorrow.toISOString(),
        designacceptancestarttime:  designacceptancestarttime,
        isinrevisionstate: "true",
        isoutsourced: "true",
        revisioncomments: this.reason,
         status: "outsourced"

        }
      }else{
        var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes()+30);
       data={
        deliverydate:tomorrow.toISOString(),
        designacceptancestarttime:  designacceptancestarttime,
        isinrevisionstate: "true",
        isoutsourced: "true",
        revisioncomments: this.reason,
         status: "outsourced"

        }
      }



      this.apiservice.updateDesignForm(data,this.id).subscribe((res:any)=>{
          this.modalCtrl.dismiss({
            'dismissed': true
          });
      })
    }
  }

  }

  uploadPestamResendFile(event){


    this.exceedfileSize = event.target.files[0].size;

    //this.isPermitPlanFileUpload = true;
     for(var i=0; i< event.target.files.length;i++){
       this.pestampResendList.push(event.target.files[i])
     }
     this.pestampResendFileUpload= true;

   }

   removeArc(i) {
   this.pestampResendList.splice(i, 1);

 }

 pestampResendFile(){

  const data = new FormData();
 for(var i=0; i< this.pestampResendList.length;i++){
   data.append("files",this.pestampResendList[i]);
   if(i ==0){
    //data.append('files', file);
    data.append('path', "pestamp/" + this.id);
    data.append('refId', ""+this.id);
    data.append('ref', "pestamp");
    data.append('field', "revisionattachments");


   }
 }
  this.utilities.showLoading('Uploading').then(()=>{
    this.apiservice.uploadFile(data).subscribe((res:any)=>{
      this.utilities.hideLoading().then(()=>{
    //     var declinedbypeengineer;
    //  if(this.declinedbypeengineer == true)
    //   {
    //   declinedbypeengineer = true;
    //   }
    //   else{
    //   declinedbypeengineer = false;
    //   }
    var pestampacceptancestarttime = new Date();
    pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
      var postData = {
        // status: 'accepted',
        // revisioncomments: this.reason,
        // isoutsourced : "true",
        // isinrevisionstate: "true",
        // pestampacceptancestarttime: pestampacceptancestarttime,
        // actualdelivereddate: null,
        status: "assigned",
        isoutsourced: "true",
        isinrevisionstate: "true",
        revisioncomments: this.reason,
        pestampacceptancestarttime: pestampacceptancestarttime,
        actualdelivereddate: null,
        acceptedbypeengineer: false,
        declinedbypeengineer: false
        }
        this.apiservice.assignPestamps(this.id,postData).subscribe((res:any)=>{
        //this.createNewDesignChatGroup(res);

        this.utilities.showSnackBar("Pestamp request has been send for revision successfully.");
        this.modalCtrl.dismiss({
          'dismissed' : true
        })
      })
      })
    },err=>{
      this.utilities.errorSnackBar(err.error);
      this.utilities.hideLoading();
    })
  })

}

  uploadFile(){
    var designacceptancestarttime = new Date();
    designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes()+15);
    this.utilities.showLoading('Uploading').then(()=>{
      this.apiservice.uploadDeclineImage(this.id,'revisionattachments',this.blob,this.filename).subscribe((res:any)=>{
        this.utilities.hideLoading().then(()=>{

          let data={
            deliverydate: null,
            designacceptancestarttime:  designacceptancestarttime,
            isinrevisionstate: "true",
            isoutsourced: "true",
            revisioncomments: this.reason,
             status: "outsourced"

            }



              this.apiservice.updateDesignForm(data,this.id).subscribe((res:any)=>{
                this.utilities.showSnackBar("Design request has been send for revision successfully.");
                this.modalCtrl.dismiss({
                    'dismissed': true
                  });
              })
        })
      },err=>{
        this.utilities.errorSnackBar(err.error);
        this.utilities.hideLoading();
      })
    })
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });

}}
