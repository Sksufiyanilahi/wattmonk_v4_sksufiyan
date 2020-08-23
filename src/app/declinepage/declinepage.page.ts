import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-declinepage',
  templateUrl: './declinepage.page.html',
  styleUrls: ['./declinepage.page.scss'],
})
export class DeclinepagePage implements OnInit {
  id: any;
  reason: any;
  blob: Blob;
  filename: string;
  enableDisable:boolean=true;

  constructor(private camera: Camera,
    private modalCtrl:ModalController,
    private apiservice:ApiService,
    private nav:NavParams,
    private utilities:UtilitiesService
     ) { }

  ngOnInit() {

    this.id= this.nav.get('id');
    console.log(this.id);
    
  }


  

  selectAttachment(){
    const options: CameraOptions = {
      quality: 30,
      targetWidth:600,
      targetHeight:300,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.blob = this.utilities.b64tBlob(base64Image);
      console.log(this.blob);
      
      this.filename = Date.now().toString() + '.png';
      if(this.blob){
        this.uploadFile();
      }
     }, (err) => {
      // Handle error
     })
  }

  cancel(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      cancel:'cancel'
    });
  }

  detectchange(){
    if(this.reason==undefined || this.reason==''){
      this.enableDisable= true;
    }else{
      this.enableDisable= false;
    }
  }

  submit(){

    let data={
      status : 'requestdeclined',
      requestdeclinereason:this.reason
      
    }

    console.log(data);
    
    this.apiservice.updateDesignForm(data,this.id).subscribe((res:any)=>{
        this.modalCtrl.dismiss({
          'dismissed': true
        });
    })
  }

  uploadFile(){
    this.utilities.showLoading('Uploading').then(()=>{
      this.apiservice.uploadDeclineImage(this.id,'prelimdesign',this.blob,this.filename).subscribe((res:any)=>{
        this.utilities.hideLoading().then(()=>{

        })
      })
    })
  }

  

}
