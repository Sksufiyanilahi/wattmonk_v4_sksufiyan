import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Pestamp } from '../model/pestamp.model';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pestamp-design-details',
  templateUrl: './pestamp-design-details.page.html',
  styleUrls: ['./pestamp-design-details.page.scss'],
})
export class PestampDesignDetailsPage implements OnInit {
  
  designId:any;
  design:Pestamp;
  enableDisable:boolean=false;
  user:User;
  pestampForm:FormGroup;
  commentform:FormGroup;
  stampfile: string[]=[];
  designstartdatetime: number;
  designenddatetime: number;
  imageName:any;
  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  indexOfstampFiles: any;

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
              private launchNavigator: LaunchNavigator) { 
                this.pestampForm= this.formbuilder.group({
                  workinghours: new FormControl(null,[Validators.required]),
                 // comments:new FormControl(null),
                  status: new FormControl('completed'),
                  stampedfiles: new FormControl(''),
                })
                this.commentform = this.formbuilder.group({
                  comments:new FormControl(null)
                })
             
     
    this.designId = +this.route.snapshot.paramMap.get('id');
    console.log(this.designId);
  }

  ngOnInit() {
    this.user=this.storage.getUser();
    console.log(this.user);
    this.getDesignDetails();

    

  }

  getDesignDetails() {
    //this.getAssignees();

    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getPestampDetails(this.designId).subscribe((result) => {
        this.utilities.hideLoading();
        console.log('re', result);
        //this.setData(result);
        //this.timer();
        this.design = result;
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  goBack() {
    this.navController.pop();
  }

  async deleteDesign() {
    this.utilities.showHideIntercom(true);
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
          this.apiService.deletePestamp(this.designId).subscribe((result) => {
            console.log('result', result);
            this.utilities.hideLoading().then(() => {
              this.utilities.showSnackBar(this.design.personname+" "+'has been deleted successfully');
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

      submit(){
        if(this.pestampForm.status=='INVALID'){
          this.utilities.errorSnackBar('Please add working hours');
          return false;
        }else{
          let cdate = Date.now();
    this.designenddatetime = cdate;
    const postData = {
      status: "completed",
      pestampstarttime: this.designstartdatetime,
      pestampendtime: this.designenddatetime,
      comments: this.commentform.get('comments').value,
      workinghours : String(this.pestampForm.get('workinghours').value)
    };
          this.utilities.showLoading('Submitting').then(()=>{
         // this.apiService.updatePestamps(this.designId,this.pestampForm.value).subscribe(res=>{
          this.apiService.updatePestamps(this.designId,postData).subscribe(res=>{
            this.utilities.hideLoading().then(() => {
              this.uploadStampedFiles(res.id,this.stampfile[0])
              console.log(res);
              this.navController.pop();
              this.utilities.setPeStampRefresh(true);
            })
          },err=>{
            console.log(err);
            
          })
        })
        }
      }

      removeArc(i) {
        this.stampfile.splice(i, 1);
      }

      remove(stamp,i){
    
        console.log(stamp);
        this.indexOfstampFiles.push( stamp.id);
        
        console.log(i);
        
        this.stampfile.splice(i, 1);
        
        }

        files(event){
          console.log(event.target.files);
           for(var i=0; i< event.target.files.length;i++){
             this.stampfile.push(event.target.files[i]) 
           }
           console.log(this.stampfile);
         }

          /* FOR UPLOAD Stamped FILES */
       uploadStampedFiles(recordid: number,file: string){
        // console.log(this.archFiles);
        console.log(file);
         const data = new FormData();
         for(var i=0; i< this.stampfile.length;i++){
           data.append("files",this.stampfile[i]);
           if(i ==0){
            //data.append('files', file);
            data.append('path', "pestamp/" + recordid);
            data.append('refId', ""+recordid);
            data.append('ref', "pestamp");
            data.append('field', "stampedfiles");
            
            console.log("file upload data---"+data);
           }
         }
         this.apiService.uploadFile(data).subscribe(res=>{
           console.log(res);
    
         })
    
    
       }

         
      showreasonImage(attachmentFile:any){
        const browser = this.iab.create(attachmentFile.url,'_system', 'location=yes,hardwareback=yes,hidden=yes');
      }

      // files(event){
      //   console.log(event);
      //   console.log(event.target.files);
      //   this.isAtticFileUpload = true;
      //    for(var i=0; i< event.target.files.length;i++){
      //      this.atticPhotosList.push(event.target.files[i])
      //    }
      //    //this.architecturalFileUpload= true;
      //    console.log(this.atticPhotosList);
      //  }
    
      
      
}

