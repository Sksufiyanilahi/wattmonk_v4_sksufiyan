import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssigneeModel } from 'src/app/model/assignee.model';
import { SolarMake } from 'src/app/model/solar-make.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { SolarMadeModel } from 'src/app/model/solar-made.model';
import { InverterMakeModel } from 'src/app/model/inverter-make.model';
import { NavController } from '@ionic/angular';
import { InverterMadeModel } from 'src/app/model/inverter-made.model';
import { ScheduleFormEvent, UserRoles, INVALID_EMAIL_MESSAGE, FIELD_REQUIRED,INVALID_NAME_MESSAGE, INVALID_ANNUAL_UNIT, INVALID_TILT_FOR_GROUND_MOUNT, INVALID_COMPANY_NAME } from '../../model/constants';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';
import { ActivatedRoute, Router, RoutesRecognized, NavigationEnd, NavigationExtras } from '@angular/router';
import {  DesginDataModel, DesignModel } from '../../model/design.model';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Intercom } from 'ng-intercom';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { Clients } from 'src/app/model/clients.model';
import { map, startWith } from "rxjs/operators";
//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
//import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {


  desginForm: FormGroup;

  listOfAssignees: AssigneeModel[] = [];

  listOfSolarMake: SolarMake[] = [];
  listOfSolarMade: SolarMadeModel[] = [];

  listOfInverterMade: InverterMadeModel[] = [];
  listOfInverterMake: InverterMakeModel[] = [];
  attachmentData:any;
  private subscription: Subscription;
  private addressSubscription: Subscription;

  getCompanies: Clients[] = [];
  filteredCompanies: Observable<Clients[]>;
  designCreatedBy;
  designCreatedByUserParent;

  emailError = INVALID_EMAIL_MESSAGE;
  nameError = INVALID_NAME_MESSAGE;
  annualunitError = INVALID_ANNUAL_UNIT;
  tiltforgroundError = INVALID_TILT_FOR_GROUND_MOUNT;
  companyError = INVALID_COMPANY_NAME;

  fieldRequired = FIELD_REQUIRED;

  designId = 0;
  design: DesginDataModel = null;
  address: string;
  showValue: any;
  uploadbox: any;
  archFiles: string[]=[];
  prelimFiles: string[]=[];
 imageName:any;
 
 indexOfArcFiles=[]
 isArcFileDelete:boolean=false;
  //attachmentName = this.desginForm.get('attachments').value;

 options: CameraOptions = {
  quality: 30,
  targetWidth:600,
  targetHeight:300,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.PNG,
  mediaType: this.camera.MediaType.PICTURE
}
  fileName: any;
  moduledata: any;
  // solarmake:string='solarmake';
  // solarmade:string='solarmade';
  // invertermake:string='invertermake';
  // invertermade:string='invertermade';
  filterrecord: SolarMake[];
  modulename: any;
  solarmake: string;
  solarmade: string;
  invertermake: string;
  invertermade: string;
  onFormSubmit:boolean=true;
  solarMakeDisposable: Subscription;
  send:any;
  value:number;
  architecturalData:any;
  fieldDisabled = false;
  userdata:any;

  attachmentFileUpload: boolean= false;

  // newprelims: Observable<any>;
  // newprelimsRef: AngularFireObject<any>;
  // //newprelimsRef:any;
  // newprelimscount = 0;


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utils: UtilitiesService,
    private navController: NavController,
    private storage: StorageService,
    private route: ActivatedRoute,
    private camera: Camera,
    private file: File,
    public router:Router,
    public intercom: Intercom,
    private cdr:ChangeDetectorRef,
    //private db: AngularFireDatabase
  ) {
    this.utils.showHideIntercom(true);
    var tomorrow=new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    var d_date=tomorrow.toISOString();
    const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
    const NUMBERPATTERN = '^[0-9]*$';
    const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
    this.desginForm = this.formBuilder.group({
      companyname: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.pattern(NAMEPATTERN)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      monthlybill: new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(NUMBERPATTERN)]),
      address: new FormControl('',[Validators.required]),
      createdby: new FormControl(''),
      assignedto: new FormControl(''),
      rooftype: new FormControl(''),
      //prelimdesign: new FormControl(null),
      architecturaldesign: new FormControl(''),
      tiltofgroundmountingsystem: new FormControl(''),
      mountingtype: new FormControl('', [Validators.required]),
      // jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      newconstruction: new FormControl(false),
      source: new FormControl('android', [Validators.required]),
      comments: new FormControl(''),
      requesttype: new FormControl('prelim'),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(''),
      status: new FormControl('created'),
      attachments: new FormControl([]),
      deliverydate:new FormControl(d_date,[]),
      outsourcedto:new FormControl(null),
      isoutsourced:new FormControl('false'),
      designacceptancestarttime:new FormControl(null),
      creatorparentid:new FormControl(this.storage.getParentId()),
      //isonpriority:new FormControl('false'),
      paymentstatus:new FormControl(null),
      paymenttype:new FormControl(null)
      // uploadbox:new FormControl('')
    });
      
    // this.newprelimsRef = db.object('newprelimdesigns');
    // this.newprelims = this.newprelimsRef.valueChanges();
    // this.newprelims.subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.newprelimscount = res.count;
    //     cdr.detectChanges();
    //   },
    //   (err) => console.log(err),
    //   () => console.log('done!')
    // )
     //this.newprelims = this.newprelimsRef.valueChanges();
    // this.db.doc('newprelimdesigns').valueChanges().subscribe((res:any)=>{
    //   this.newprelimscount = res;
    //   console.log(this.newprelimscount)
    // })
    // this.newprelims.subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.newprelimscount = res.count;
    //   },
    //   (err) => console.log(err),
    //   () => console.log('done!')
    // )
    
    this.designId = +this.route.snapshot.paramMap.get('id');
    this.getAssignees();

  }

  numberfield(event){
    console.log(event);
    
  }

  ionViewDidEnter(){
    this.utils.showHideIntercom(true);
  }

  // getmodulename(event){
   
  //     this.modulename= event;
  //     console.log(this.modulename);
      
  // }


  // logScrolling(e){

  // }

  // record(){
  //   this.filterrecord= this.listOfSolarMake.filter(x=>
  // }

  ngOnInit() {
      this.fieldDisabled=false;
      this.userdata = this.storage.getUser();
      this.intercom.update({
        "hide_default_launcher": true
      });
    // this.utils.manualInput.subscribe(data=>{
    //     if(this.modulename=='solarmake'){
    //       this.solarmake=data;
          // this.solarMakeDisposable.unsubscribe();
          // this.desginForm.patchValue({
          //   solarmake:data
          // });
          // this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
          //   this.getSolarMade();
          // });
          
        // }else if(this.modulename=='solarmade'){
        // this.solarmade=data;
        // }else if(this.modulename=='invertermake'){
        //   this.invertermake = data;
        // }else if(this.modulename=='invertermade'){
        //   this.invertermade= data; 
        // }
        
      
    // })
    this.address= this.storage.getData();
    this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SAVE_DESIGN_FORM || event === ScheduleFormEvent.SEND_DESIGN_FORM) {
        this.send=event;
        this.addForm();
      
      }
      if(event===ScheduleFormEvent.PAY_EVENT){
        this.sendtowattmonk();
      }
    });
    this.gettingClients();

    if (this.designId !== 0) {
      setTimeout(()=>{
        this.getDesignDetails();
      },1000)

    } else {
      // if(this.onFormSubmit){
        this.solarMakeDisposable = this.desginForm.get('solarmake').valueChanges.subscribe(val => {
          this.getSolarMade();
        });
        this.desginForm.get('invertermake').valueChanges.subscribe(val => {
          this.getInverterMade();
        });
      // }
      this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
        // console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        
         this.desginForm.get('address').setValue('124/345');
         this.desginForm.get('latitude').setValue('24.553333');
         this.desginForm.get('longitude').setValue('80.5555555555');
         this.desginForm.get('country').setValue('india');
         this.desginForm.get('city').setValue('Lucknow');
         this.desginForm.get('state').setValue('UP');
         this.desginForm.get('postalcode').setValue(3232343);
        //  this.desginForm.get('address').setValue(address.address);
        //    this.desginForm.get('latitude').setValue(address.lat);
        //    this.desginForm.get('longitude').setValue(address.long);
        //    this.desginForm.get('country').setValue(address.country);
        //  this.desginForm.get('city').setValue(address.city);
        //    this.desginForm.get('state').setValue(address.state);
        //    this.desginForm.get('postalcode').setValue(address.postalcode);
      }, (error) => {
        this.desginForm.get('address').setValue('');
        this.desginForm.get('latitude').setValue('');
        this.desginForm.get('longitude').setValue('');
        this.desginForm.get('country').setValue('');
        this.desginForm.get('city').setValue('');
        this.desginForm.get('state').setValue('');
        this.desginForm.get('postalcode').setValue('');
      });
      this.desginForm.patchValue({
        createdby: this.storage.getUserID()
      });
      this.getSolarMake();
     
      
    }
this.formControlValueChanged();
this.uploadcontrolvalidation();

  }
  
formControlValueChanged() {
  const NUMBERPATTERN = '^[0-9]*$';
  const tiltControl = this.desginForm.get('tiltofgroundmountingsystem');
  const roofcontrol = this.desginForm.get('rooftype');
  this.desginForm.get('mountingtype').valueChanges.subscribe(
      (mode: string) => {
          console.log(mode);
          if (mode === 'ground') {
              tiltControl.setValidators([Validators.required,Validators.pattern(NUMBERPATTERN)]);
              roofcontrol.clearValidators();
              roofcontrol.reset();
          }else if(mode ==='both'){
            tiltControl.setValidators([Validators.required,,Validators.min(0), Validators.pattern(NUMBERPATTERN)]);
            roofcontrol.setValidators([Validators.required]);
          }
          else if (mode === 'roof') {
            roofcontrol.setValidators([Validators.required]);
              tiltControl.clearValidators();
              tiltControl.reset();
          }else{
            tiltControl.clearValidators();
            roofcontrol.clearValidators();
          }
          tiltControl.updateValueAndValidity();
          roofcontrol.updateValueAndValidity();
      });

}

uploadcontrolvalidation(){
  const uploadboxcontrol= this.desginForm.get('architecturaldesign');
    this.desginForm.get('newconstruction').valueChanges.subscribe(
    (uploadmode:any)=>{
      console.log(uploadmode);
        if(uploadmode=='true'){
          uploadboxcontrol.setValidators([Validators.required]);
        }else if(uploadmode=='false'){
          uploadboxcontrol.clearValidators();
          uploadboxcontrol.reset();
        }
        uploadboxcontrol.updateValueAndValidity();
  })
}


  ngOnDestroy(): void {
    this.utils.showHideIntercom(false);
    this.subscription.unsubscribe();
    if (this.designId === 0) {
      this.addressSubscription.unsubscribe();
    }
  }

getDesignDetails() {
  
    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getDesginDetail(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(()=>{
          this.utils.showHideIntercom(true);
          this.design = result;
          console.log(this.design);
          this.fieldDisabled=true;
       this.attachmentData=this.design.attachments;
       this.architecturalData = this.design.architecturaldesign;
          console.log("hello",this.design.attachments);
          this.desginForm.patchValue({
            name: this.design.name,
            email: this.design.email,
            monthlybill: this.design.monthlybill,
            address: this.design.address,
            createdby: this.design.createdby,
            rooftype: this.design.rooftype,
            mountingtype:this.design.mountingtype,
            architecturaldesign:this.design.architecturaldesign,
            // jobtype: this.design.jobtype,
            tiltofgroundmountingsystem: this.design.tiltofgroundmountingsystem,
            comments: this.design.comments==''? '': this.design.comments[0].message,
            projecttype: this.design.projecttype,
            latitude: this.design.latitude,
            longitude: this.design.longitude,
            country: this.design.country,
            state: this.design.state,
            city: this.design.city,
            postalcode:this.design.postalcode,
            newconstruction: this.design.newconstruction + '',
            prelimdesign:null,
            //attachments:this.design.attachments,
            
            attachments:this.design.attachments,
            solarmake:this.design.solarmake,
            solarmodel:this.design.solarmodel,
            invertermake:this.design.invertermake,
            invertermodel:this.design.invertermodel,
            status:this.design.status
          });
          //console.log("attachments",this.desginForm.get('attachments').value)
          this.utils.setStaticAddress(this.design.address);
        //  this.attachmentData=this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length;
          if (this.design.assignedto !== null && this.design.assignedto !== undefined) {
            this.desginForm.patchValue({
              assignedto: this.design.assignedto.id
            });
          }
        setTimeout(()=>{
          this.getSolarMakeForForm();
          this.getInverterMakeForForm();
        },500)
        });
      
      }, (error) => {
        this.utils.hideLoading();
      });
    });
  }

  getSolarMakeForForm() {
 
    this.apiService.getSolarMake().subscribe(response => {
      this.listOfSolarMake = response;

      this.apiService.getSolarMade(this.design.solarmake.id).subscribe(solarresponse => {
        // this.utils.hideLoading().then(()=>{
          this.listOfSolarMade = solarresponse;
          console.log(solarresponse);
          console.log('patching solar');
          setTimeout(() => {
            this.desginForm.patchValue({
              solarmake: this.design.solarmake.id,
              solarmodel: this.design.solarmodel.id
            });
            // if(this.onFormSubmit){
              this.desginForm.get('solarmake').valueChanges.subscribe(val => {
                this.getSolarMade();
              });
            // }
          }, 500);
        // });
      }, solarResponseError => {
      
        const error: ErrorModel = solarResponseError.error;
        if (error.message instanceof String) {
          this.utils.errorSnackBar(error.message);
        } else if (error.message instanceof Array) {
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        }
      });

    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.errorSnackBar(error.message);
      } else if (error.message instanceof Array) {
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      }
    });
  }

  getInverterMakeForForm() {
    this.apiService.getInverterMake().subscribe(response => {
      console.log(response);
      this.listOfInverterMake = response;
      this.apiService.getInverterMade(this.design.invertermake.id).subscribe(makeResponse => {
        // this.utils.hideLoading();
        console.log('patching inverter');
        this.listOfInverterMade = makeResponse;

        setTimeout(() => {
          this.desginForm.patchValue({
            invertermake: this.design.invertermake.id,
            invertermodel: this.design.invertermodel.id
          });
          // if(this.onFormSubmit){
            this.desginForm.get('invertermake').valueChanges.subscribe(val => {
              this.getInverterMade();
            });
          // }
        }, 500);


      }, makeResponseError => {
   
        const error: ErrorModel = makeResponseError.error;
        if (error.message instanceof String) {
          this.utils.errorSnackBar(error.message);
        } else if (error.message instanceof Array) {
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        }
      });
    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.errorSnackBar(error.message);
      } else if (error.message instanceof Array) {
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      }
    });
  }

  saveModuleMake(){
  const found= this.listOfSolarMake.some((el:any)=>
    el.name=== this.solarmake
);

  console.log(found);
  
    if(!found){
      let solarmakedata={
        name:this.solarmake
      }
      this.apiService.postSolarMake(solarmakedata).subscribe((response:any)=>{
        this.desginForm.patchValue({
          solarmake:response.id
        })
        this.saveModuleModel();
      },err=>{
        console.log(err,'err in savemodulemake');
        
      })

    }else{
      this.saveModuleModel();
    }
  }

  saveModuleModel(){
    const ismakefound  =this.listOfSolarMake.some(el=>el.name===this.solarmake);
    const found= this.listOfSolarMade.some((el:any)=>
      el.name=== this.solarmade
    );

    if(!ismakefound || !found){
      let solarmadedata={
        solarmade:this.solarmade,
        solarmake:this.desginForm.get('solarmake').value
      }
      console.log(solarmadedata);
      
      this.apiService.postSolarMade(solarmadedata).subscribe((response:any)=>{
        this.desginForm.patchValue({
          solarmade:response.id

        })
        this.saveInvertermake();
      })
    }else{
      this.saveInvertermake();
    }
  }

  saveInvertermake(){
    const found = this.listOfInverterMake.some(el=>el.name===this.invertermake);
    if(!found){
      let invertermakedata={
        invertermake:this.invertermake
      }
      this.apiService.postInverterMake(invertermakedata).subscribe((response:any)=>{
        this.desginForm.patchValue({
          invertermake:response.id
        })
        this.saveInverterMade();
      })
    }else{
      this.saveInverterMade();
    }

  }

  saveInverterMade(){
    const ismakefound= this.listOfInverterMake.some(el=>el.name===this.invertermake);
    const found = this.listOfInverterMade.some(el=>el.name===this.invertermade)

    if(!ismakefound || !found){
      let invertermadedata={
        invertermade:this.invertermade,
        invertermake:this.desginForm.get('invertermake').value
      }
      console.log(invertermadedata);
      
      this.apiService.postInverterMade(invertermadedata).subscribe((response:any)=>{
          this.desginForm.patchValue({
            invertermade:response.id
          })
          this.submitform();
      })
    }else{
      this.submitform();
    }

  }

remove(arc,i){
//   this.utils.showLoading('Deleting Architecture Design').then((success)=>{
//     this.apiService.deletePrelimImage(index).subscribe(res=>{console.log("hello",res)
//   this.utils.hideLoading().then(()=>{
//     this.utils.showSnackBar('File deleted successfully');
//     this.navController.navigateRoot(["/schedule/design/",{id:this.designId}]);
//     //this.utils.setHomepageDesignRefresh(true);
//   });
//   },
// (error)=>{
//   this.utils.hideLoading().then(()=> {
//     this.utils.errorSnackBar('some Error Occured');
//   });

// });
// });
console.log(arc);
this.indexOfArcFiles.push( arc.id);

this.isArcFileDelete=true;
console.log(this.isArcFileDelete);
console.log(this.indexOfArcFiles);
console.log(this.architecturalData);

this.architecturalData.splice(i, 1);

}

removeattachment(attachment,i){
    
  this.indexOfArcFiles.push( attachment.id);

  this.isArcFileDelete=true;
  console.log(this.isArcFileDelete);
  console.log(this.indexOfArcFiles);
  console.log(this.attachmentData);
  console.log(i);
  
  this.attachmentData.splice(i, 1);
}

deleteArcFile(index){
     
      
  // this.utils.showLoading('Deleting Architecture Design').then((success)=>{
     for(var i=0; i< index.length;i++){
       var id = index[i];
       this.apiService.deletePrelimImage(id).subscribe(res=>{console.log("hello",res)
      
   });
 
 // this.utils.hideLoading().then(()=>{
 //   //   this.utils.showSnackBar('File deleted successfully');
 //     // this.navController.navigateRoot(["/permitschedule",{id:this.designId}]);
     
 //    // this.utils.setPermitDesignDetailsRefresh(true);
 //  // });
 //   },
 (error)=>{
   this.utils.hideLoading().then(()=> {
     this.utils.errorSnackBar('some Error Occured');
   });
 }}

// });
 //this.utils.setHomepageDesignRefresh(true);
 

  
 
}

  addForm() {
  this.onFormSubmit=false;
  // this.saveModuleMake();
   debugger;
    console.log('Reach', this.desginForm);
    // debugger;
    // this.saveModuleMake();
    this.submitform();

  }

  submitform(){
    if (this.desginForm.status === 'VALID') {
      var newConstruction = this.desginForm.get("newconstruction").value;
        if (this.designId === 0) {

          if(this.send===ScheduleFormEvent.SAVE_DESIGN_FORM){
            debugger;
            this.utils.showLoading('Saving').then(() => {
            this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {
              // this.uploaarchitecturedesign(response.id,'architecturaldesign');
              // this.uploadpreliumdesign(response.id,'attachments')
              this.utils.hideLoading().then(()=>{
              if(newConstruction=='true'){
                // if(this.architecturalFileUpload){
                   this.uploaarchitecturedesign(response,'architecturaldesign');
                // }
               }
               else{
                 if(this.attachmentFileUpload){
                   this.uploadpreliumdesign(response,'attachments')
                 }
                 else{
                  this.router.navigate(['/homepage/design'])
                  // this.utils.showSnackBar('Design have been saved');
                  this.utils.setHomepageDesignRefresh(true);
                 }
               }
              // this.utils.hideLoading().then(() => {
              //   console.log('Res', response);
              //   this.createChatGroup(response);
              //   this.router.navigate(['/homepage/design'])
              //   // this.utils.showSnackBar('Design have been saved');
              //   this.utils.setHomepageDesignRefresh(true);
              //   // this.navController.pop();
              //   // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
              //   //   modal.present();
              //   //   modal.onWillDismiss().then((dismissed) => {
              //       // this.utils.setHomepageDesignRefresh(true);
              //   //     this.navController.pop();
              //   //   });
              //   // });
              
               });
            }, responseError => {
              this.utils.hideLoading();
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message);
              });
            });
            }
            else if(this.send===ScheduleFormEvent.SEND_DESIGN_FORM){
              this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {
                console.log(response.id);
                this.utils.hideLoading().then(()=>{
                if(newConstruction == 'true')
                {
               this.uploaarchitecturedesign(response,'architecturaldesign');
                }
                else{
                  if(this.attachmentFileUpload){
                    this.uploadpreliumdesign(response,'attachments')
                  }
                  else{
                    let objToSend: NavigationExtras = {
                              queryParams: {
                                id:response.id,
                                designData:"prelim",
                                fulldesigndata:response
                              },
                              skipLocationChange: false,
                              fragment: 'top' 
                          };
                      
                      
                      this.router.navigate(['/payment-modal'], { 
                        state: { productdetails: objToSend }
                      });
                  }
                }
              })
              }
            , responseError => {
                this.utils.hideLoading();
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message);
                });
              }
          

        } else {
          if(this.send===ScheduleFormEvent.SAVE_DESIGN_FORM){
            this.utils.showLoading('Saving').then(() => {
          this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
            this.utils.hideLoading().then(()=>{
            if(newConstruction=='true')
            {
            this.uploaarchitecturedesign(response,'architecturaldesign');
            }
            else{
              if(this.attachmentFileUpload){
            this.uploadpreliumdesign(response,'attachments')
              }
              else{
                this.utils.showSnackBar('Design have been updated');
                this.utils.setDesignDetailsRefresh(true);
                this.navController.pop();
              }
            }
            if(this.isArcFileDelete){
              this.deleteArcFile(this.indexOfArcFiles);
            }
               
              });
          },
           responseError => {
            this.utils.hideLoading().then(() => {
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message[0].messages[0].message);
            });

          });
        });
        }
        else if(this.send===ScheduleFormEvent.SEND_DESIGN_FORM){
          this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
            this.utils.hideLoading().then(()=>{
            if(newConstruction=='true')
            {
            this.uploaarchitecturedesign(response,'architecturaldesign');
            }
            else{
              if(this.attachmentFileUpload){
            this.uploadpreliumdesign(response,'attachments');
              }
              else{
                let objToSend: NavigationExtras = {
                  queryParams: {
                    id:response.id,
                    designData:"prelim",
                    fulldesigndata:response
                  },
                  skipLocationChange: false,
                  fragment: 'top' 
              };
          
          
          this.router.navigate(['/payment-modal'], { 
            state: { productdetails: objToSend }
          });
              }
            }
            if(this.isArcFileDelete){
              console.log("hello");
              this.deleteArcFile(this.indexOfArcFiles);
            }
            // this.utils.hideLoading().then(() => {
            //   console.log('Res', response);
            //   this.value=response.id;
              
            //   this.utils.showSnackBar('Design have been updated');
            //   //this.router.navigate(["payment-modal",{id:response.id,designData:"prelim"}]);
              
              
      
             });
          }, responseError => {
            this.utils.hideLoading().then(() => {
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message[0].messages[0].message);
            });

          });
        }
      }

    

    } else {
      if(this.desginForm.value.name=='' || this.desginForm.get('name').hasError('pattern')){

        this.utils.errorSnackBar('Please check the field name.');
      }
      else if(this.desginForm.value.email=='' || this.desginForm.get('email').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field email.');
      }
      else if(this.desginForm.value.monthlybill=='' || this.desginForm.get('monthlybill').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field annual units.');
      }
      else if(this.desginForm.value.solarmake=='' || this.desginForm.get('solarmake').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field module make.');
      }
      else if(this.desginForm.value.solarmodel=='' || this.desginForm.get('solarmodel').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field module model.');
      }
      else if(this.desginForm.value.invertermake=='' || this.desginForm.get('invertermake').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field inverter make.');
      }
      else if(this.desginForm.value.invertermodel=='' || this.desginForm.get('invertermodel').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field inverter model.');
      }
      else if(this.desginForm.value.mountingtype==''){
        this.utils.errorSnackBar('Please fill the mounting type.');
      }
      else if(this.desginForm.value.projecttype==''){
        this.utils.errorSnackBar('Please fill the project type.');
      }
      else if(this.desginForm.value.tiltofgroundmountingsystem=='' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field tilt for ground mount.');
      }
      else if(this.desginForm.value.rooftype==''){
        this.utils.errorSnackBar('Please fill the rooftype.');
      }


      else if(this.desginForm.value.architecturaldesign==''){
        this.utils.errorSnackBar('Please attach architectural design.');
      }
      else{
        this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
      }
    }
  }

  showInvalidFormAlert() {
    let error = '';
    Object.keys(this.desginForm.controls).forEach((key: string) => {
      const control: AbstractControl = this.desginForm.get(key);
      if (control.invalid) {
        if (error !== '') {
          error = error + '<br/>';
        }
        if (control.errors.required === true) {
          error = error + this.utils.capitalizeWord(key) + ' is required';
        }
        if (control.errors.email === true) {
          error = error + 'Invalid email';
        }
        if (control.errors.error !== null && control.errors.error !== undefined) {
          error = error + control.errors.error;
        }
      }
    });
    console.log(this.desginForm.value);
    this.utils.showAlert(error);
  }


  getAssignees() {
    this.apiService.getDesigners().subscribe(assignees => {
      this.listOfAssignees = [];
      // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

  getSolarMade() {
    this.utils.showLoading('Getting module models').then((success) => {
      this.apiService.getSolarMade(this.desginForm.get('solarmake').value).subscribe(response => {
        this.utils.hideLoading().then(()=>{
          console.log(response);
          this.listOfSolarMade = response;
          this.desginForm.patchValue({
            solarmodel: ''
          });
        });
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      });
    // }, (error) => {

    });


  }
ioniViewDidEnter(){
 

}
  getSolarMake() {
    this.getInverterMake();

    this.apiService.getSolarMake().subscribe(response => {
      this.listOfSolarMake = response;
      
    }, responseError => {
      const error: ErrorModel = responseError.error;
      console.log(error);
      this.utils.errorSnackBar(error.message[0].messages[0].message);
    });
  }

  getInverterMade() {
    console.log(this.desginForm.get('invertermake').value);
    this.utils.showLoading('Getting inverter models').then((success) => {
      this.apiService.getInverterMade(this.desginForm.get('invertermake').value).subscribe(response => {
        this.utils.hideLoading().then(()=>{
          console.log(response);
          this.listOfInverterMade = response;
          this.desginForm.patchValue({
            invertermodel: ''
          });
        });
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      });
    // }, (reject) => {

    });

  }

  getInverterMake() {
    this.apiService.getInverterMake().subscribe(response => {
      console.log(response);
      this.listOfInverterMake = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utils.errorSnackBar(error.message[0].messages[0].message);
    });
  }

  // onProjectChange(event){
  // console.log("eve",this.desginForm);
  // }

  getclass=()=>{
  return   this.address == "" ? "0px" : "50px";
  }

  eventcheck(e){
    this.showValue = e.target.value;
    console.log(this.showValue);
    
  }
  showUpload(e){
    this.uploadbox = e.target.value;

    
  }


  files(event){
   console.log(event.target.files);
    for(var i=0; i< event.target.files.length;i++){
      this.archFiles.push(event.target.files[i]) 
    }
    console.log(this.archFiles);
  }

  prelimfiles(event){
    console.log(event.target.files);
    for(var i=0; i< event.target.files.length;i++){
      this.prelimFiles.push(event.target.files[i]) 
    }
    this.attachmentFileUpload= true;
    if(this.prelimFiles.length==1){
      this.fileName= event.target.files[0].name;
      console.log(this.fileName);
      
    }else if(this.prelimFiles.length >1){
      this.fileName= this.prelimFiles.length;
    }else{
      this.fileName='';
    }
  
   
  }
  

  uploaarchitecturedesign(response?: any, key?: string){
    console.log(this.archFiles);
    const imageData = new FormData();
    for(var i=0; i< this.archFiles.length;i++){
      imageData.append("files",this.archFiles[i]);
      if(i ==0){
        imageData.append('path', 'designs/' + response.id);
        imageData.append('refId', response.id + '');
        imageData.append('ref', 'design');
        imageData.append('field', key);
      }
    } 
    this.utils.showLoading("Architectural File Uploading").then(()=>{
    this.apiService.uploaddesign(imageData).subscribe(res=>{
      console.log(res); 
      this.utils.hideLoading();
      if(this.attachmentFileUpload){
      this.uploadpreliumdesign(response,'attachments');
      }
      else{
        if(this.send === ScheduleFormEvent.SAVE_DESIGN_FORM ){
        this.router.navigate(['/homepage/design'])
        if(this.designId==0){
                 this.utils.showSnackBar('Design have been saved');
        }
        else{
          this.utils.showSnackBar('Design have been updated')
        }
                this.utils.setHomepageDesignRefresh(true);
        }
        else{
          let objToSend: NavigationExtras = {
                    queryParams: {
                      id:response.id,
                      designData:"prelim",
                      fulldesigndata:response
                    },
                    skipLocationChange: false,
                    fragment: 'top' 
                };
            
            
            this.router.navigate(['/payment-modal'], { 
              state: { productdetails: objToSend }
            });
        }
      }
    }, responseError => {
      this.utils.hideLoading();
      const error: ErrorModel = responseError.error;
      this.utils.errorSnackBar(error.message[0].messages[0].message);
    })
  })


  }

  uploadpreliumdesign(response?: any, key?: string,filearray?:File[]){
    console.log(this.prelimFiles);
    const imageData = new FormData();
    for(var i=0; i< this.prelimFiles.length;i++){
      imageData.append("files",this.prelimFiles[i]);
      if(i ==0){
        imageData.append('path', 'designs/' + response.id);
        imageData.append('refId', response.id + '');
        imageData.append('ref', 'design');
        imageData.append('field', key);
      }
    } 
    this.utils.showLoading("Attachment File Uploading").then(()=>{
    this.apiService.uploaddesign(imageData).subscribe(res=>{
      console.log(res); 
      this.utils.hideLoading();
      if(this.send === ScheduleFormEvent.SAVE_DESIGN_FORM)
      {
      this.router.navigate(['/homepage/design'])
      if(this.designId==0)
      {
                 this.utils.showSnackBar('Design have been saved');
      }
      else{
        this.utils.showSnackBar('Design have been updated');
      }
                this.utils.setHomepageDesignRefresh(true);
      }
      else{
        let objToSend: NavigationExtras = {
          queryParams: {
            id:response.id,
            designData:"prelim",
            fulldesigndata:response
          },
          skipLocationChange: false,
          fragment: 'top' 
      };
  
  
  this.router.navigate(['/payment-modal'], { 
    state: { productdetails: objToSend }
  });
      }
      
    }, responseError => {
      this.utils.hideLoading();
      //this.utils.hideUploadingLoading();
      const error: ErrorModel = responseError.error;
      this.utils.errorSnackBar(error.message[0].messages[0].message);
    })
  })
  }

  // pickarchitecturaldesign(){
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     let blob = this.utils.b64tBlob(base64Image);
  //     let filename = Date.now().toString() + '.png';
  //     this.utils.showLoading('Uploading').then(()=>{
  //       this.apiService.uploaddesign(designId, key, blob, filename).subscribe(()=>{

  //       })
  //     })
  //   })

  // }

  removeArc(i) {
    this.archFiles.splice(i, 1);
  }
  removePrelim(i) {
    this.prelimFiles.splice(i, 1);
  }
  sendtowattmonk(){
    var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
    const postData = {
      outsourcedto: 232,
        isoutsourced: "true",
        status: "outsourced",
        designacceptancestarttime: designacceptancestarttime,
        paymenttype: this.utils.getPaymentMode().value,
        couponid:this.utils.getCouponId().value
      };
  
      this.utils.showLoading('Assigning').then(()=>{
        //this.newprelimsRef.update({ count: this.newprelimscount + 1});
        this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/this.value).subscribe((value) => {
          this.utils.hideLoading().then(()=>{
            ; 
            console.log('reach ', value);
           
            this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');//.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
            this.router.navigate(['/homepage/design'])
            this.utils.setHomepageDesignRefresh(true);
          })
        }, (error) => {
          this.utils.hideLoading();
        });
      })
  }

  Pay()
  {
    if (this.desginForm.status === 'VALID') {
    //this.router.navigate(["payment-modal",{designData:"prelim"}]);
    let objToSend: NavigationExtras = {
      queryParams: {
        //id:response.id,
        designData:"prelim"
      },
      skipLocationChange: false,
      fragment: 'top' 
  };


this.router.navigate(['/payment-modal'], { 
state: { productdetails: objToSend }
});
    }else {
      if(this.desginForm.value.name=='' || this.desginForm.get('name').hasError('pattern')){

        this.utils.errorSnackBar('Please check the field name.');
      }
      else if(this.desginForm.value.email=='' || this.desginForm.get('email').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field email.');
      }
      else if(this.desginForm.value.monthlybill=='' || this.desginForm.get('monthlybill').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field annual units.');
      }
      else if(this.desginForm.value.modulemake=='' || this.desginForm.get('modulemake').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field module make.');
      }
      else if(this.desginForm.value.modulemodel=='' || this.desginForm.get('modulemodel').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field module model.');
      }
      else if(this.desginForm.value.invertermake=='' || this.desginForm.get('invertermake').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field inverter make.');
      }
      else if(this.desginForm.value.invertermodel=='' || this.desginForm.get('invertermodel').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field inverter model.');
      }
      else if(this.desginForm.value.mountingtype==''){
        this.utils.errorSnackBar('Please fill the mounting type.');
      }
      else if(this.desginForm.value.projecttype==''){
        this.utils.errorSnackBar('Please fill the project type.');
      }
      else if(this.desginForm.value.tiltofgroundmountingsystem=='' || this.desginForm.get('tiltofgroundmountingsystem').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field tilt for ground mount.');
      }
      else if(this.desginForm.value.rooftype==''){
        this.utils.errorSnackBar('Please fill the rooftype.');
      }


      else if(this.desginForm.value.architecturaldesign==[]){
        this.utils.errorSnackBar('Please attach architectural design.');
      }
      else{
        this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
      }
    }
  }

  createChatGroup(design:DesginDataModel){
    var GUID = 'prelim' + "_" + new Date().getTime();

    var address = design.address.substring(0, 60);
    var groupName = design.name + "_" + address;

    var groupType = CometChat.GROUP_TYPE.PRIVATE;
    var password = "";

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group).then(group=>{
      let membersList = [
        new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
      ];
      CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{
        this.cdr.detectChanges();
      })
    })
  }

  gettingClients(){
    this.apiService.getClients().subscribe(res=>{
      this.getCompanies = res;
      console.log(this.getCompanies);
      this.filteredCompanies = this.desginForm.get('companyname').valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value.companyid)),
        map(companyname => (companyname ? this._filterCompanies(companyname) : this.getCompanies.slice()))
      );
    },
    error => {
      this.utils.errorSnackBar("Error");
    }
  );
  }

  proxyValue: any; onCompanyChanged(event$) { 
    console.log(event$);
    this.proxyValue = event$.detail.value.companyname; 
    this.designCreatedBy = event$.detail.value.companyid; 
    this.designCreatedByUserParent = event$.detail.value.parentid;
    if(this.designCreatedBy !== null && this.designCreatedByUserParent !== null){
      var designacceptancestarttime = new Date();
      designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
          console.log(designacceptancestarttime)
      this.desginForm.patchValue({createdby:this.designCreatedBy,
                                  creatorparentid:this.designCreatedByUserParent,
                                  status:"outsourced",
                                  outsourcedto:"232",
                                  isoutsourced:"true",
                                  designacceptancestarttime:designacceptancestarttime})
    }
}

  private _filterCompanies(companyname: string): Clients[] {
    return this.getCompanies.filter(
      company => company.companyname.toLowerCase().indexOf(companyname) != -1
    );
  }
}

