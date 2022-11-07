import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Chooser, ChooserResult } from '@awesome-cordova-plugins/chooser/ngx';
import { File,FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { DesginDataModel } from 'src/app/models/design.model';

@Component({
  selector: 'app-decline',
  templateUrl: './decline.page.html',
  styleUrls: ['./decline.page.scss'],
})

export class DeclinePage implements OnInit {
  exceedfileSize:number=0;
  id: any;
  reason: any;
  blob: Blob;
  filename: string;
  enableDisable:boolean=true;
  successmessage: string;
  userId: any;
  userData: any;
  value:any;
  declinedbypeengineer:boolean;
  pestampDeclineList:any=[];
  pestampDeclineFileUpload:boolean = false;

  constructor(
    private modalCtrl:ModalController,
    private apiservice:ApiService,
    private nav:NavParams,
    private utilities:UtilitiesService,
    private chooser: Chooser,
    private file:File,
    private storageService:StorageService
     ) { }

  ngOnInit() {

    this.id= this.nav.get('id');
    this.value = this.nav.get('value');
    this.declinedbypeengineer = this.nav.get('declinedbypeengineer');
    this.pestampDeclineFileUpload = false;

    this.userData = this.storageService.getUser();
  }




  selectAttachment(){

  //else{
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

      // if(this.value == 'pestamp'){
      //   for(var i=0; i< e.target.files.length;i++){
      //     this.pestampDeclineList.push(e.target.files[i])
      //   }
      // }
      // else{

        this.filename= file.name;
        this.file.resolveLocalFilesystemUrl(file.uri).then((fileentry:FileEntry)=>{
          fileentry.file(fileObj=>{

            this.blob=fileObj;


           this.exceedfileSize = fileObj.size;
           if(fileObj.size > 1024 * 1024 * 25){
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
  //}
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
      if(this.pestampDeclineFileUpload)
      {
        this.pestampDeclineFile();
      }
      else{
      this.uploadFile();
      }

    }else if(this.filename !=='' && this.exceedfileSize > 1048576){



    }else{
      var designstarttime = new Date();
      var milisecond = designstarttime.getTime();
      if(this.value =='pestamp')
      {
        var declinedbypeengineer;
        if(this.declinedbypeengineer == true)
        {
          declinedbypeengineer = true;
        }
        else{
          declinedbypeengineer = false;
        }
          var cdate = Date.now();
          var postData = {
            status: 'declined',
            requestdeclinereason: this.reason,
            isoutsourced : "false",
            pestampacceptancestarttime: cdate,
            acknowledgedby : this.userData.id,
            declinedbypeengineer : declinedbypeengineer
            }
            this.apiservice.assignPestamps(this.id,postData).subscribe((res:any)=>{
            //this.createNewDesignChatGroup(res);

            this.modalCtrl.dismiss({
              'dismissed' : true
            })
          })
      }
      else{
          var data={
              status : 'requestdeclined',
              requestdeclinereason:this.reason,
              isoutsourced : "false",
              designacceptanceendtime:milisecond,
                   }



            this.apiservice.updateDesignForm(data,this.id).subscribe((res:any)=>{
              // this.createNewDesignChatGroup(res);
                this.modalCtrl.dismiss({
                  'dismissed': true
                });
            })
    }
    }

  }

  uploadPestampDeclineFile(event){


    this.exceedfileSize = event.target.files[0].size;

    //this.isPermitPlanFileUpload = true;
     for(var i=0; i< event.target.files.length;i++){
       this.pestampDeclineList.push(event.target.files[i])
     }
     this.pestampDeclineFileUpload= true;

   }

   removeArc(i) {
   this.pestampDeclineList.splice(i, 1);

 }

   pestampDeclineFile(){

      const data = new FormData();
     for(var i=0; i< this.pestampDeclineList.length;i++){
       data.append("files",this.pestampDeclineList[i]);
       if(i ==0){
        //data.append('files', file);
        data.append('path', "pestamp/" + this.id);
        data.append('refId', ""+this.id);
        data.append('ref', "pestamp");
        data.append('field', "requestdeclineattachment");


       }
     }
      this.utilities.showLoading('Uploading').then(()=>{
        this.apiservice.uploadFile(data).subscribe((res:any)=>{
          this.utilities.hideLoading().then(()=>{
            var declinedbypeengineer;
         if(this.declinedbypeengineer == true)
          {
          declinedbypeengineer = true;
          }
          else{
          declinedbypeengineer = false;
          }
            var cdate = Date.now();
          var postData = {
            status: 'declined',
            requestdeclinereason: this.reason,
            isoutsourced : "false",
            pestampacceptancestarttime: cdate,
            acknowledgedby : this.userData.id,
            declinedbypeengineer : declinedbypeengineer
            }
            this.apiservice.assignPestamps(this.id,postData).subscribe((res:any)=>{
            //this.createNewDesignChatGroup(res);

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
    this.utilities.showLoading('Uploading').then(()=>{
      this.apiservice.uploadDeclineImage(this.id,'requestdeclineattachment',this.blob,this.filename).subscribe((res:any)=>{
        this.utilities.hideLoading().then(()=>{

              let data={
                status : 'requestdeclined',
                requestdeclinereason:this.reason,
                outsourcedto : null,
                isoutsourced : "false"

              }



              this.apiservice.updateDesignForm(data,this.id).subscribe((res:any)=>{
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
  }

  createNewDesignChatGroup(design:DesginDataModel) {
     ;
    var GUID = 'prelim' + "_" + new Date().getTime();
    var address = design.address.substring(0, 60);
    var groupName = design.name + "_" + address;

    var groupType = CometChat.GROUP_TYPE.PASSWORD;
    var password = design.groupchatpassword;

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(
      group => {
         ;
        let membersList = [
          new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
          new CometChat.GroupMember("" + this.userData.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
        ];
        CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
          response => {
            if(design.requesttype == "prelim"){
              let postdata={
                chatid:GUID
              }

              this.apiservice.updateDesignForm(postdata,this.id).subscribe(res=>{


              })
              // this.updateItemInList(LISTTYPE.NEW, design);
            }else{
              // this.updateItemInPermitList(LISTTYPE.NEW, design);
            }
          },
          error => {


          }
        );
      },
      error => {




      }
    );
  }



}
