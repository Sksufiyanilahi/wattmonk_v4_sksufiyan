import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { DesginDataModel } from '../model/design.model';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-declinepage',
  templateUrl: './declinepage.page.html',
  styleUrls: ['./declinepage.page.scss'],
})
export class DeclinepagePage implements OnInit {
  exceedfileSize:number=0;
  id: any;
  reason: any;
  blob: Blob;
  filename: string;
  enableDisable:boolean=true;
  successmessage: string;
  userId: any;
  userData: any;

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

    this.id= this.nav.get('id');
    console.log(this.id);

    this.userData = this.storageService.getUser();
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
      console.log(file, 'canceled')
        this.filename= file.name;
        this.file.resolveLocalFilesystemUrl(file.uri).then((fileentry:FileEntry)=>{
          fileentry.file(fileObj=>{
            console.log(fileObj);
            this.blob=fileObj;
           console.log(fileObj.size);

           this.exceedfileSize = fileObj.size;
           if(fileObj.size > 1024 * 1024 * 25){
            this.enableDisable =true;
           }else{
            //  this.enableDisable = false;

              this.getBase64(fileObj).then(res=>{
                let base64file= file.dataURI + res;
                this.blob= this.utilities.b64toBlob(base64file);
                console.log(this.blob);
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
    //   console.log(this.blob);

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
      this.uploadFile();


    }else if(this.filename !=='' && this.exceedfileSize > 1048576){

      console.log('could not submit');

    }else{

      let data={
        status : 'requestdeclined',
        requestdeclinereason:this.reason,
        outsourcedto : null,
        isoutsourced : "false",
        acknowledgedby : this.id

      }

      console.log(data);

      this.apiservice.updateDesignForm(data,this.id).subscribe((res:any)=>{
        this.createNewDesignChatGroup(res);
          this.modalCtrl.dismiss({
            'dismissed': true
          });
      })
    }

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

              console.log(data);

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
    debugger;
    var GUID = 'prelim' + "_" + new Date().getTime();
    var address = design.address.substring(0, 60);
    var groupName = design.name + "_" + address;
  
    var groupType = CometChat.GROUP_TYPE.PRIVATE;
    var password = "";
  
    var group = new CometChat.Group(GUID, groupName, groupType, password);
  
    CometChat.createGroup(group).then(
      group => {
        debugger;
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
                console.log(res);
                
              })
              // this.updateItemInList(LISTTYPE.NEW, design);
            }else{
              // this.updateItemInPermitList(LISTTYPE.NEW, design);
            }
          },
          error => {
            console.log(error);
            
          }
        );
      },
      error => {

        console.log(error);
        
  
      }
    );
  }



}
