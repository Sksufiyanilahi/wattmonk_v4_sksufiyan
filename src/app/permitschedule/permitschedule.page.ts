import { ChangeDetectionStrategy, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { AssigneeModel } from '../model/assignee.model';
import { FIELD_REQUIRED, INVALID_ANNUAL_UNIT, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_TILT_FOR_GROUND_MOUNT, INVALID_PHONE_NUMBER } from '../model/constants';
import { DesignModel } from '../model/design.model';
import { InverterMadeModel, Invertermake } from '../model/inverter-made.model';
import { InverterMakeModel } from '../model/inverter-make.model';
import { Modulemake, SolarMadeModel } from '../model/solar-made.model';
import { SolarMake } from '../model/solar-make.model';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { map, startWith } from "rxjs/operators";
import { ErrorModel } from '../model/error.model';


@Component({
  selector: 'app-permitschedule',
  templateUrl: './permitschedule.page.html',
  styleUrls: ['./permitschedule.page.scss'],
})

export class PermitschedulePage implements OnInit {
  desginForm:FormGroup

  //listOfAssignees: AssigneeModel[] = [];

 // listOfSolarMake: SolarMake[] = [];
 // listOfSolarMade: SolarMadeModel[] = [];

  //listOfInverterMade: InverterMadeModel[] = [];
 // listOfInverterMake: InverterMakeModel[] = [];

 modulemakes: SolarMake[] = [];
  filteredModuleMakes: Observable<SolarMake[]>;
  selectedModuleMakeID: number;

  modulemodels: Modulemake[] = [];
  filteredModuleModels: Observable<Modulemake[]>;
  selectedModuleModelID: number;

  invertermakes: InverterMakeModel[] = [];
  filteredInverterMakes: Observable<InverterMakeModel[]>;
  selectedInverterMakeID: number;

  invertermodels: Invertermake[] = [];
  filteredInverterModels: Observable<Invertermake[]>;
  selectedInverterModelID: number;

  private subscription: Subscription;
  private addressSubscription: Subscription;

  emailError = INVALID_EMAIL_MESSAGE;
  nameError = INVALID_NAME_MESSAGE;
  annualunitError = INVALID_ANNUAL_UNIT;
  tiltforgroundError = INVALID_TILT_FOR_GROUND_MOUNT;
  phoneError = INVALID_PHONE_NUMBER;

  fieldRequired = FIELD_REQUIRED;
  
  
  

  fileName: any;
  archFiles: string[]=[];
  permitFiles: string[]=[];
  designId=0;
  onFormSubmit:boolean=true;
  address = '';
  showValue: any;
  uploadbox: any;
  value:number;
  formValue:string;
  
  //user: User
  
  
  userdata:any;

  solarMakeDisposable: Subscription;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utils: UtilitiesService,
    private navController: NavController,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router:Router,
    ) { 
       const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD \s,-]+$/;
       const EMAILPATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    const NAMEPATTERN = /^[a-zA-Z]{3,}$/;
    const NUMBERPATTERN = '^[0-9]*$';
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(NAMEPATTERN)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      phone : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern("^[0-9]{8,15}$")]),
    modulemake : new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z-_ ]{3,}$")
    ]),
    modulemodel : new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9A-Z-_([)/. {\\]}]{5,}$")
    ]),
    invertermake : new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z-_ ]{3,}$")
    ]),
    invertermodel : new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9A-Z-_([)/. {\\]}]{5,}$")
    ]),
    monthlybill: new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(NUMBERPATTERN)]),
    address: new FormControl('',[Validators.required]),
    createdby: new FormControl(''),
    assignedto: new FormControl(''),
    rooftype: new FormControl(''),
    architecturaldesign: this.formBuilder.array([new FormControl(null)],[Validators.required]),
    tiltofgroundmountingsystem: new FormControl(''),
    mountingtype: new FormControl('', [Validators.required]),
   jobtype: new FormControl('', [Validators.required]),
    projecttype: new FormControl('', [Validators.required]),
    newconstruction: new FormControl('false'),
    source: new FormControl('android', [Validators.required]),
    comments: new FormControl(''),
    requesttype: new FormControl('permit'),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    postalcode: new FormControl(''),
    status: new FormControl('created'),
    attachments: new FormControl([])
   
  })
  this.designId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.userdata = this.storage.getUser();
    this.addressValue();
    setTimeout(() => {
      this.fetchModuleMakesData();
      this.fetchInverterMakesData();
      
    });
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

  displayFnModuleMake(modulemake: SolarMake): string {
    return modulemake && modulemake.name ? modulemake.name : "";
  }

  private _filterModuleMake(name: string): SolarMake[] {
    const filterValue = name.toLowerCase();

    return this.modulemakes.filter(
      modulemake => modulemake.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  displayFnModuleModel(modulemodel: Modulemake): string {
    return modulemodel && modulemodel.name ? modulemodel.name : "";
  }

  private _filterModuleModel(name: string): Modulemake[] {
    const filterValue = name.toLowerCase();

    return this.modulemodels.filter(
      modulemodel => modulemodel.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  displayFnInverterMake(invertermake: InverterMakeModel): string {
    return invertermake && invertermake.name ? invertermake.name : "";
  }

  private _filterInverterMake(name: string): InverterMakeModel[] {
    const filterValue = name.toLowerCase();

    return this.invertermakes.filter(
      invertermake => invertermake.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  displayFnInverterModel(invertermodel: Invertermake): string {
    return invertermodel && invertermodel.name ? invertermodel.name : "";
  }

  private _filterInverterModel(name: string): Invertermake[] {
    const filterValue = name.toLowerCase();

    return this.invertermodels.filter(
      invertermodel => invertermodel.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  
  fetchModuleMakesData() {
    this.apiService.getSolarMake().subscribe(
      response => {

        this.modulemakes = response;
        this.filteredModuleMakes = this.desginForm.get('modulemake').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterModuleMake(name) : this.modulemakes.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  fetchModuleModelsData(_event: any, make) {
    this.desginForm.patchValue({ modulemodel: " " })
    if (_event.isUserInput) {
      this.desginForm.get('modulemodel').setValue("");
     // if (this.data.isEditMode) {
     //   this.selectedModuleModelID = null;
     // }
      this.modulemodels = [];
      this.selectedModuleMakeID = make.id;
      this.apiService.getSolarMade(make.id).subscribe(
        response => {

          this.modulemodels = response;
          this.filteredModuleModels = this.desginForm.get('modulemodel').valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.name)),
            map(name => (name ? this._filterModuleModel(name) : this.modulemodels.slice()))
          );
        },
        error => {
          this.utils.errorSnackBar("Error");
        }
      );
    }
  }

  loadModuleModelsData() {
    this.modulemodels = [];
    this.apiService.getSolarMade(this.selectedModuleMakeID).subscribe(
      response => {

        this.modulemodels = response;
        this.filteredModuleModels = this.desginForm.get('modulemodel').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterModuleModel(name) : this.modulemodels.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  setSelectedModuleModel(model) {
    this.selectedModuleModelID = model.id;
  }

  fetchInverterMakesData() {
    this.apiService.getInverterMake().subscribe(
      response => {

        this.invertermakes = response;
        this.filteredInverterMakes = this.desginForm.get('invertermake').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterInverterMake(name) : this.invertermakes.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  fetchInverterModelsData(_event: any, make) {
    this.desginForm.patchValue({ invertermodel: " " })
    if (_event.isUserInput) {
      this.desginForm.get('invertermodel').setValue("");
     // if (this.data.isEditMode) {
     //   this.selectedInverterModelID = null;
     // }
      this.invertermodels = [];
      this.selectedInverterMakeID = make.id;
      this.apiService.getInverterMade(make.id).subscribe(
        response => {

          this.invertermodels = response;
          this.filteredInverterModels = this.desginForm.get('invertermodel').valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.name)),
            map(name => (name ? this._filterInverterModel(name) : this.invertermodels.slice()))
          );
        },
        error => {
          this.utils.errorSnackBar("Error");
        }
      );
    }
  }

  loadInverterModelsData() {
    this.invertermodels = [];
    this.apiService.getInverterMade(this.selectedInverterMakeID).subscribe(
      response => {

        this.invertermodels = response;
        this.filteredInverterModels = this.desginForm.get('invertermodel').valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value.name)),
          map(name => (name ? this._filterInverterModel(name) : this.invertermodels.slice()))
        );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  setSelectedInverterModel(model) {
    this.selectedInverterModelID = model.id;
  }

  goBack() {
    this.navController.pop();
  }

  eventcheck(e){
    this.showValue = e.target.value;
    console.log(this.showValue);
    
  }


  addressValue(){
  // }
  this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
    console.log(address,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    
      this.desginForm.get('address').setValue('124/345');
      this.desginForm.get('latitude').setValue('24.553333');
      this.desginForm.get('longitude').setValue('80.5555555555');
      this.desginForm.get('country').setValue('india');
      this.desginForm.get('city').setValue('Lucknow');
      this.desginForm.get('state').setValue('UP');
      this.desginForm.get('postalcode').setValue(3232343);
    /* this.desginForm.get('address').setValue(address.address);
       this.desginForm.get('latitude').setValue(address.lat);
       this.desginForm.get('longitude').setValue(address.long);
       this.desginForm.get('country').setValue(address.country);
     this.desginForm.get('city').setValue(address.city);
       this.desginForm.get('state').setValue(address.state);
       this.desginForm.get('postalcode').setValue(address.postalcode);*/
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
  //this.getSolarMake();

  }
  /*getDesignDetails() {
  
    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getDesginDetail(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(()=>{
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
            invertermodel:this.design.invertermodel
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

*/

showUpload(e){
  this.uploadbox = e.target.value;

  
}

saveModuleMake() {
  console.log("g",this.desginForm.get("modulemake").value);
  const found = this.modulemakes.some(el => el.name === this.desginForm.get("modulemake").value);
  if (!found) {
    let solarmadedata={

      
      name:this.desginForm.get('modulemake').value
    }
    this.apiService
      .postSolarMake(
        solarmadedata
      )
      .subscribe(
        (response:any) => {
          this.selectedModuleMakeID = response.id;
          this.saveModuleModel();
        },
        error => {
          this.utils.errorSnackBar(
        
            "Error"
          );
        }
      );
  } else {
    this.saveModuleModel();
  }
}

saveModuleModel() {
  const ismakefound = this.modulemakes.some(el => el.name === this.desginForm.get("modulemake").value);
  const found = this.modulemodels.some(el => el.name === this.desginForm.get("modulemodel").value);
  if (!ismakefound || !found) {
    let solarmadedata={
      modulemake:this.selectedModuleMakeID,
      name:this.desginForm.get('modulemodel').value
      
    }
    this.apiService
      .postSolarMade(
        solarmadedata
      )
      .subscribe(
        (response:any) => {
          this.selectedModuleModelID = response.id;
          this.saveInverterMake();
        },
        error => {
          this.utils.errorSnackBar(
            "Error"
          );
        }
      );
  } else {
    this.saveInverterMake();
  }
}

saveInverterMake() {
  const found = this.invertermakes.some(el => el.name === this.desginForm.get("invertermake").value);
  if (!found) {
    let invertermakedata={
      name:this.desginForm.get("invertermake").value
    }
    this.apiService
      .postInverterMake(
        invertermakedata
      )
      .subscribe(
        (response:any) => {
          this.selectedInverterMakeID = response.id;
          this.saveInverterModel();
        },
        error => {
          this.utils.errorSnackBar(
          
            "Error"
          );
        }
      );
  } else {
    this.saveInverterModel();
  }
}

saveInverterModel() {
  const ismakefound = this.invertermakes.some(el => el.name === this.desginForm.get("invertermake").value);
  const found = this.invertermodels.some(el => el.name === this.desginForm.get("invertermodel").value);
  if (!ismakefound || !found) {
    let invertermadedata={
      invertermake:this.selectedInverterMakeID,
      name:this.desginForm.get('invertermodel').value
    }
    this.apiService
      .postInverterMade(
        invertermadedata
      )
      .subscribe(
        (response:any) => {
          this.selectedInverterModelID = response.id;
         // if (this.data.isEditMode) {
         //   this.editDesignOnServer();
         // } else {
           {
            this.submitform();
          }
        },
        error => {
          this.utils.errorSnackBar(
            
            "Error"
          );
        }
      );
  } else {
    
      this.submitform();
    }
  }

  addForm(e) {
    this.onFormSubmit=false;
    // this.saveModuleMake();
     this.formValue = e;
    
      console.log('Reach', this.desginForm.value);
  
      // debugger;
      // this.saveModuleMake();
      if(this.desginForm.status=='VALID'){
      this.saveModuleMake();
      }
      else{
        this.error();
      }
  
    }
  
    submitform(){
      var pnumber = this.desginForm.get("phone").value;
      if (this.desginForm.status === 'VALID') {
        this.utils.showLoading('Saving').then(() => {
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 2);
          console.log(this.formValue);
          if (this.designId === 0) {
            if(this.formValue === 'save'){
              var data = {name:this.desginForm.get('name').value,  
                          email:this.desginForm.get('email').value,
                          phonenumber:pnumber.toString(),
                          address:this.desginForm.get('address').value,
                          monthlybill:this.desginForm.get('monthlybill').value,
                          solarmake: this.selectedModuleMakeID,
                          solarmodel:this.selectedModuleModelID,
                          invertermake:this.selectedInverterMakeID,
                          invertermodel:this.selectedInverterModelID,
                          createdby: this.storage.getUserID(),
                           //assignedto: this.desginForm.get('assignedto').value,
                           rooftype: this.desginForm.get('rooftype').value,
                         //architecturaldesign: this.desginForm.get('architecturaldesign').value,
                         tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                         mountingtype: this.desginForm.get('mountingtype').value,
                          jobtype: this.desginForm.get('jobtype').value,
                          projecttype: this.desginForm.get('projecttype').value,
                          newconstruction: this.desginForm.get('newconstruction').value,
                          source: this.desginForm.get('source').value,
                          comments: this.desginForm.get('comments').value,
                          requesttype: this.desginForm.get('requesttype').value,
                          latitude: this.desginForm.get('latitude').value,
                         longitude: this.desginForm.get('longitude').value,
                         country: this.desginForm.get('country').value,
                         state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                         postalcode: this.desginForm.get('postalcode').value,
                        status: this.desginForm.get('status').value,
    //attachments: this.desginForm.get('attachments').value,
                        deliverydate:tomorrow.toISOString(),
                        creatorparentid:this.storage.getParentId()
    
  }



            
             // this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
              this.apiService.addDesginForm(data).subscribe(response => {  
             this.uploaarchitecturedesign(response.id,'architecturaldesign');
                this.uploadAttachmentDesign(response.id,'attachments')
                this.utils.hideLoading().then(() => {
                  console.log('Res', response);
                  this.router.navigate(['/permithomepage'])
                  this.utils.showSnackBar('Design have been Created');
                  // this.utils.showSnackBar('Design have been saved');
                  this.utils.setHomepagePermitRefresh(true);
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
             
              
             
            
              }
           else if(this.formValue === 'send'){
            
              var postData = {name:this.desginForm.get('name').value,  
                          email:this.desginForm.get('email').value,
                          phonenumber:pnumber.toString(),
                          address:this.desginForm.get('address').value,
                          monthlybill:this.desginForm.get('monthlybill').value,
                          solarmake: this.selectedModuleMakeID,
                          solarmodel:this.selectedModuleModelID,
                          invertermake:this.selectedInverterMakeID,
                          invertermodel:this.selectedInverterModelID,
                          createdby: this.storage.getUserID(),
                           //assignedto: this.desginForm.get('assignedto').value,
                           rooftype: this.desginForm.get('rooftype').value,
                         //architecturaldesign: this.desginForm.get('architecturaldesign').value,
                         tiltofgroundmountingsystem: this.desginForm.get('tiltofgroundmountingsystem').value,
                         mountingtype: this.desginForm.get('mountingtype').value,
                          jobtype: this.desginForm.get('jobtype').value,
                          projecttype: this.desginForm.get('projecttype').value,
                          newconstruction: this.desginForm.get('newconstruction').value,
                          source: this.desginForm.get('source').value,
                          comments: this.desginForm.get('comments').value,
                          requesttype: this.desginForm.get('requesttype').value,
                          latitude: this.desginForm.get('latitude').value,
                         longitude: this.desginForm.get('longitude').value,
                         country: this.desginForm.get('country').value,
                         state: this.desginForm.get('state').value,
                        city: this.desginForm.get('city').value,
                         postalcode: this.desginForm.get('postalcode').value,
                        status: this.desginForm.get('status').value,
    //attachments: this.desginForm.get('attachments').value,
                        deliverydate:tomorrow.toISOString(),
                        creatorparentid:this.storage.getParentId(),
                        
    
  }



            
             // this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
              this.apiService.addDesginForm(postData).subscribe(response => {  
             this.uploaarchitecturedesign(response.id,'architecturaldesign');
                this.uploadAttachmentDesign(response.id,'attachments')
                this.utils.hideLoading().then(() => {
                  console.log('Res', response);
                  this.value = response.id;
                  this.sendtowattmonk();
                  
                 // this.router.navigate(['/homepage'])
                 // this.utils.showSnackBar('Design have been Created');
                  // this.utils.showSnackBar('Design have been saved');
                 // this.utils.setHomepageDesignRefresh(true);
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
             
              
             
            
              }
          
            }
          else {
            if(this.formValue==='save'){
            this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
              this.uploaarchitecturedesign(response.id,'architecturaldesign');
              this.uploadAttachmentDesign(response.id,'attachments')
              this.utils.hideLoading().then(() => {
                console.log('Res', response);
                this.utils.showSnackBar('Design have been updated');
                this.utils.setDesignDetailsRefresh(true);
                this.navController.pop();
                
        
              });
            },
             responseError => {
              this.utils.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
  
            });
          
          }
          else if(this.formValue==='send'){
            this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
              this.uploaarchitecturedesign(response.id,'architecturaldesign');
              this.uploadAttachmentDesign(response.id,'attachments')
              this.utils.hideLoading().then(() => {
                console.log('Res', response);
                this.value=response.id;
                this.utils.showSnackBar('Design have been updated');
                this.sendtowattmonk();
                
        
              });
            },
             responseError => {
              this.utils.hideLoading().then(() => {
                const error: ErrorModel = responseError.error;
                this.utils.errorSnackBar(error.message[0].messages[0].message);
              });
  //
            });
          
          }
        }
  
        });
  
      } else {
        this.error();
      }
    }

    error(){
      
        if(this.desginForm.value.name==''){
  
          this.utils.errorSnackBar('Please fill the name.');
        }
        else if(this.desginForm.value.email==''){
          this.utils.errorSnackBar('Please fill the email.');
        }
        else if(this.desginForm.value.phone==''){
          this.utils.errorSnackBar('Please fill the phone number');
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
       
        
        else if(this.desginForm.value.architecturaldesign==[]){
          this.utils.errorSnackBar('Please attach architectural design.');
        }
        else{
          this.utils.errorSnackBar('Address not found. Make sure location is on on device.');
        }
    }
  

    files(event){
      console.log(event.target.files);
       for(var i=0; i< event.target.files.length;i++){
         this.archFiles.push(event.target.files[i]) 
       }
       console.log(this.archFiles);
     }
   
     permitfiles(event){
       console.log(event.target.files);
       for(var i=0; i< event.target.files.length;i++){
         this.permitFiles.push(event.target.files[i]) 
       }
       if(this.permitFiles.length==1){
         this.fileName= event.target.files[0].name;
         console.log(this.fileName);
         
       }else if(this.permitFiles.length >1){
         this.fileName= this.permitFiles.length;
       }else{
         this.fileName='';
       }
     
      
     }

    uploaarchitecturedesign(designId?: number, key?: string){
     // console.log(this.archFiles);
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
  
    uploadAttachmentDesign(designId?: number, key?: string,filearray?:File[]){
      console.log(this.permitFiles);
      const imageData = new FormData();
      for(var i=0; i< this.permitFiles.length;i++){
        imageData.append("files",this.permitFiles[i]);
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

    numberfield(event){
      console.log(event);
      
    }

    removeArc(i) {
      this.archFiles.splice(this.archFiles.indexOf(i), 1);
    }
    removePermit(i) {
      this.permitFiles.splice(this.permitFiles.indexOf(i), 1);
    }

    remove(index:number){
      this.utils.showLoading('Deleting Architecture Design').then((success)=>{
        this.apiService.deletePrelimImage(index).subscribe(res=>{console.log("hello",res)
      this.utils.hideLoading().then(()=>{
        this.utils.showSnackBar('File deleted successfully');
        this.navController.navigateRoot(["/schedule/design/",{id:this.designId}]);
        this.utils.setHomepagePermitRefresh(true);
      });
      },
    (error)=>{
      this.utils.hideLoading().then(()=> {
        this.utils.errorSnackBar('some Error Occured');
      });
    
    });
    });
    
    }

    sendtowattmonk(){
      var designacceptancestarttime = new Date();
        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
      const postData = {
        outsourcedto: 232,
          isoutsourced: "true",
          status: "outsourced",
          designacceptancestarttime: designacceptancestarttime
        };
    
        this.utils.showLoading('Assigning').then(()=>{
        
          this.apiService.updateDesignForm(postData, /*this.desginForm.get('id').value*/this.value).subscribe((value) => {
            this.utils.hideLoading().then(()=>{
              ; 
              console.log('reach ', value);
             
              this.utils.showSnackBar('Design request has been assigned to wattmonk successfully');//.firstname +" "+this.selectedDesigner.lastname + ' ' + 'successfully');
              this.router.navigate(['/permithomepage'])
              this.utils.setHomepagePermitRefresh(true);
            })
          }, (error) => {
            this.utils.hideLoading();
          });
        })
    }
    
  
}
