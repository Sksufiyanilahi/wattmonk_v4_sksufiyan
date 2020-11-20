import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';

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

  constructor(private camera: Camera,
    private modalCtrl:ModalController,
    private apiservice:ApiService,
    private nav:NavParams,
    private utilities:UtilitiesService,
    private chooser: Chooser,
    private file:File
     ) { }

  ngOnInit() {

    this.id= this.nav.get('id');
    console.log(this.id);
    
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

           if(fileObj.size > 1024 * 1024 * 1){
            this.exceedfileSize = fileObj.size;
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
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes()+15);
      let data={
        deliverydate:tomorrow.toISOString(),
        designacceptancestarttime:  designacceptancestarttime,
        isinrevisionstate: "true",
        isoutsourced: "true",
        revisioncomments: this.reason,
         status: "outsourced"
          
        }
  
      console.log(data);
      
      this.apiservice.updateDesignForm(data,this.id).subscribe((res:any)=>{
          this.modalCtrl.dismiss({
            'dismissed': true
          });
      })
    }

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
          
              console.log(data);
              
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
