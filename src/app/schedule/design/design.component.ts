import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { ScheduleFormEvent, UserRoles, INVALID_EMAIL_MESSAGE, FIELD_REQUIRED } from '../../model/constants';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';
import { ActivatedRoute, Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { DesginDataModel, DesignModel } from '../../model/design.model';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AutoCompleteComponent } from 'src/app/utilities/auto-complete/auto-complete.component';

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

  private subscription: Subscription;
  private addressSubscription: Subscription;

  emailError = INVALID_EMAIL_MESSAGE;
  fieldRequired = FIELD_REQUIRED;

  designId = 0;
  design: DesginDataModel = null;
  address: string;
  showValue: any;
  uploadbox: any;
  archFiles: string[]=[];
  prelimFiles: string[]=[];
 imageName:any;

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

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utils: UtilitiesService,
    private navController: NavController,
    private storage: StorageService,
    private route: ActivatedRoute,
    private camera: Camera,
    private file: File,
    private router:Router
  ) {
  
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      monthlybill: new FormControl('',[Validators.required,Validators.min(0)]),
      address: new FormControl('',[Validators.required]),
      createdby: new FormControl(''),
      assignedto: new FormControl(''),
      rooftype: new FormControl(''),
      prelimdesign: new FormControl(null),
      architecturaldesign: new FormControl([],[Validators.required]),
      tiltofgroundmountingsystem: new FormControl(''),
      mountingtype: new FormControl('', [Validators.required]),
      // jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      newconstruction: new FormControl(''),
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
      attachments:new FormControl([])
      // uploadbox:new FormControl('')
    });

    this.designId = +this.route.snapshot.paramMap.get('id');
    this.getAssignees();
  }

  numberfield(event){
    console.log(event);
    
  }

  getmodulename(event){
   
      this.modulename= event;
      console.log(this.modulename);
      
  }


  // logScrolling(e){

  // }

  // record(){
  //   this.filterrecord= this.listOfSolarMake.filter(x=>
  // }

  ngOnInit() {
   
    
    this.utils.manualInput.subscribe(data=>{
        if(this.modulename=='solarmake'){
          this.solarmake=data;
        }else if(this.modulename=='solarmade'){
        this.solarmade=data;
        }else if(this.modulename=='invertermake'){
          this.invertermake = data;
        }else if(this.modulename=='invertermade'){
          this.invertermade= data; 
        }
        
      
    })
    this.address= this.storage.getData();
    this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SAVE_DESIGN_FORM) {
        this.addForm();
      }
    });

    if (this.designId !== 0) {
      setTimeout(()=>{
        this.getDesignDetails();
      },1000)

    } else {
      if(this.onFormSubmit){
        this.desginForm.get('solarmake').valueChanges.subscribe(val => {
          this.getSolarMade();
        });
        this.desginForm.get('invertermake').valueChanges.subscribe(val => {
          this.getInverterMade();
        });
      }
      this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
        console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        
        // this.desginForm.get('address').setValue('fffff');
        // this.desginForm.get('latitude').setValue('444444444444');
        // this.desginForm.get('longitude').setValue('555555555');
        // this.desginForm.get('country').setValue('india');
        // this.desginForm.get('city').setValue('Lucknow');
        // this.desginForm.get('state').setValue('UP');
        // this.desginForm.get('postalcode').setValue(3232343);
        this.desginForm.get('address').setValue(address.address);
        this.desginForm.get('latitude').setValue(address.lat);
        this.desginForm.get('longitude').setValue(address.long);
        this.desginForm.get('country').setValue(address.country);
        this.desginForm.get('city').setValue(address.city);
        this.desginForm.get('state').setValue(address.state);
        this.desginForm.get('postalcode').setValue(address.postalcode);
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
  const tiltControl = this.desginForm.get('tiltofgroundmountingsystem');
  const roofcontrol = this.desginForm.get('rooftype');
  this.desginForm.get('mountingtype').valueChanges.subscribe(
      (mode: string) => {
          console.log(mode);
          if (mode === 'ground') {
              tiltControl.setValidators([Validators.required]);
              roofcontrol.clearValidators();
              roofcontrol.reset();
          }else if(mode ==='both'){
            tiltControl.setValidators([Validators.required,,Validators.min(0)]);
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
    this.subscription.unsubscribe();
    if (this.designId === 0) {
      this.addressSubscription.unsubscribe();
    }
  }

getDesignDetails() {
    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getDesginDetail(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(()=>{
          this.design = result;
          console.log(this.design.attachments);
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
            attachments:this.design.attachments.length==1 ? this.design.attachments[0].name + this.design.attachments[0].ext : this.design.attachments.length,
            solarmake:this.design.solarmake,
            solarmodel:this.design.solarmodel,
            invertermake:this.design.invertermake,
            invertermodel:this.design.invertermodel
          });
          this.utils.setStaticAddress(this.design.address);
  
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
            if(this.onFormSubmit){
              this.desginForm.get('solarmake').valueChanges.subscribe(val => {
                this.getSolarMade();
              });
            }
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
          if(this.onFormSubmit){
            this.desginForm.get('invertermake').valueChanges.subscribe(val => {
              this.getInverterMade();
            });
          }
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
      this.saveInverterMade();
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

  addForm() {
  this.onFormSubmit=false;
  this.saveModuleMake();
   
    console.log('Reach', this.desginForm.value);

    // debugger;
    // this.saveModuleMake();
    // this.submitform();

  }

  submitform(){
    if (this.desginForm.status === 'VALID') {
      this.utils.showLoading('Saving').then(() => {


        if (this.designId === 0) {


          this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
            this.uploaarchitecturedesign(response.id,'architecturaldesign');
            this.uploadpreliumdesign(response.id,'attachments')
            this.utils.hideLoading().then(() => {
              console.log('Res', response);
              this.router.navigate(['/homepage'])
              // this.utils.showSnackBar('Design have been saved');
              this.utils.setHomepageDesignRefresh(true);
              // this.navController.pop();
              // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
              //   modal.present();
              //   modal.onWillDismiss().then((dismissed) => {
                  // this.utils.setHomepageDesignRefresh(true);
              //     this.navController.pop();
              //   });
              // });
            });
          }, responseError => {
            this.utils.hideLoading();
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message);
            });
         

        } else {
          this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
            this.uploaarchitecturedesign(response.id,'architecturaldesign');
            this.uploadpreliumdesign(response.id,'attachments')
            this.utils.hideLoading().then(() => {
              console.log('Res', response);
              this.utils.showSnackBar('Design have been updated');
              this.utils.setDesignDetailsRefresh(true);
              this.navController.pop();
              
      
            });
          }, responseError => {
            this.utils.hideLoading().then(() => {
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message[0].messages[0].message);
            });

          });
        }

      });

    } else {
      if(this.desginForm.value.name==''){

        this.utils.errorSnackBar('Please fill the name.');
      }
      else if(this.desginForm.value.email==''){
        this.utils.errorSnackBar('Please fill the email.');
      }
      else if(this.desginForm.value.monthlybill==''){
        this.utils.errorSnackBar('Please fill the annual units.');
      }
      else if(this.desginForm.value.solarmake==''){
        this.utils.errorSnackBar('Please fill the module make.');
      }
      else if(this.desginForm.value.solarmodel==''){
        this.utils.errorSnackBar('Please fill the module model.');
      }
      else if(this.desginForm.value.invertermake==''){
        this.utils.errorSnackBar('Please fill the inverter make.');
      }
      else if(this.desginForm.value.invertermodel==''){
        this.utils.errorSnackBar('Please fill the inverter model.');
      }
      else if(this.desginForm.value.mountingtype==''){
        this.utils.errorSnackBar('Please fill the mounting type.');
      }
      else if(this.desginForm.value.projecttype==''){
        this.utils.errorSnackBar('Please fill the project type.');
      }
      else if(this.desginForm.value.tiltofgroundmountingsystem==''){
        this.utils.errorSnackBar('Please fill the tilt for ground mount.');
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
    if(this.prelimFiles.length==1){
      this.fileName= event.target.files[0].name;
      console.log(this.fileName);
      
    }else if(this.prelimFiles.length >1){
      this.fileName= this.prelimFiles.length;
    }else{
      this.fileName='';
    }
  
   
  }
  

  uploaarchitecturedesign(designId?: number, key?: string){
    console.log(this.archFiles);
    const imageData = new FormData();
    for(var i=0; i< this.archFiles.length;i++){
      imageData.append("files",this.archFiles[i]);
      if(i ==0){
        imageData.append('path', 'design/' + designId);
        imageData.append('refId', designId + '');
        imageData.append('ref', 'design');
        imageData.append('field', key);
      }
    } 
    this.apiService.uploaddesign(imageData).subscribe(res=>{
      console.log(res); 
      
    })


  }

  uploadpreliumdesign(designId?: number, key?: string,filearray?:File[]){
    console.log(this.prelimFiles);
    const imageData = new FormData();
    for(var i=0; i< this.prelimFiles.length;i++){
      imageData.append("files",this.prelimFiles[i]);
      if(i ==0){
        imageData.append('path', 'design/' + designId);
        imageData.append('refId', designId + '');
        imageData.append('ref', 'design');
        imageData.append('field', key);
      }
    } 
    this.apiService.uploaddesign(imageData).subscribe(res=>{
      console.log(res); 
      
    }, responseError => {
      this.utils.hideLoading();
      const error: ErrorModel = responseError.error;
      this.utils.errorSnackBar(error.message[0].messages[0].message);
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

}
