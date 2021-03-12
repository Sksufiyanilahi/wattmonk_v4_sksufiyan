import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, resolveForwardRef, ViewChild } from '@angular/core';
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
import { ScheduleFormEvent, UserRoles, INVALID_EMAIL_MESSAGE, FIELD_REQUIRED,INVALID_NAME_MESSAGE, INVALID_ANNUAL_UNIT, INVALID_TILT_FOR_GROUND_MOUNT, INVALID_COMPANY_NAME, INVALID_MODULE_AND_INVERTER } from '../../model/constants';
import { Observable, Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';
import { ActivatedRoute, Router, RoutesRecognized, NavigationEnd, NavigationExtras } from '@angular/router';
import {  DesginDataModel, DesignModel } from '../../model/design.model';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { Clients } from 'src/app/model/clients.model';
import { map, startWith } from "rxjs/operators";
import { UtilityRates } from 'src/app/model/utilityrate.model';
import { Incentive } from 'src/app/model/incentive.model';
import { Utility } from 'src/app/model/utility.model';
//import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
//import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-salesproposal',
  templateUrl: './salesproposal.component.html',
  styleUrls: ['./salesproposal.component.scss'],
})
export class SalesproposalComponent implements OnInit {

  //@ViewChild('fileInput',{static:false}) el: ElementRef;

  myControl = new FormControl();
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
  moduleAndInverterError = INVALID_MODULE_AND_INVERTER;

  fieldRequired = FIELD_REQUIRED;

  designId = 0;
  design: DesginDataModel = null;
  address: string;
  showValue: any;
  uploadbox: any;
  archFiles: any=[];
  prelimFiles: any=[];
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
  logoFileName:any;
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
  incentives: Incentive[]=[];
  utilitiesName: any;
  modulemakes: Utility[]=[];
  modulemodels: UtilityRates[]=[];
  filteredModuleMakes: Observable<any>;
  filteredModuleModels: Observable<any>;
  filterUtilityRate: Observable<any>;
  filterIncentive: Observable<any>;

  // newprelims: Observable<any>;
  // newprelimsRef: AngularFireObject<any>;
  // //newprelimsRef:any;
  // newprelimscount = 0;

  number: number;
color: string;

isEditMode:boolean=false;
selectedUtilityId:number;
selectedUtilityRateId:number;
logoSelected: boolean=false;
logo: any ;
blob:Blob;
  userId: string;
  uploadLogo: any;
  firstFormGroup: FormGroup;


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
    private cdr:ChangeDetectorRef,
    //private db: AngularFireDatabase
  ) {
    // this.utils.showHideIntercom(true);
    var tomorrow=new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    var d_date=tomorrow.toISOString();
    const EMAILPATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    const NAMEPATTERN = /^[a-zA-Z. ]{3,}$/;
    const NUMBERPATTERN = '^[0-9]*$';
    const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';

    this.firstFormGroup=this.formBuilder.group({

    })

    this.desginForm = this.formBuilder.group({
      company: new FormControl('',[Validators.pattern(COMPANYFORMAT)]),
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
      tiltgroundmount: new FormControl(''),
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
      paymenttype:new FormControl(null),
      utility: new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z-_ ]{3,}$")]),
      //utility: new FormControl("",[Validators.pattern("^[a-zA-Z-_ ]{3,}$")]),
      //utilityrate : new FormControl("",[Validators.pattern("^[a-zA-Z-_ ]{3,}$")]),
      utilityrate : new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z-_ ]{3,}$")]),
      annualutilityescalation : new FormControl('',[Validators.required]),
      incentive : new FormControl('',[Validators.required]),
      costofsystem : new FormControl(null,[Validators.required]),
      personname : new FormControl(null,[Validators.required,Validators.pattern(NAMEPATTERN)]),
      // companylogo : new FormControl(null),
      requirementtype : new FormControl('proposal')
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
    // this.utils.showHideIntercom(true);
    // this.getincentives();
    // this.getutilitiesName();
    this.fetchIncentive();
  }

  getincentives(){
    this.apiService.salesIncentives().subscribe(res=>{
      console.log(res,"salesinc");
      // this.incentives  = res;
    })
  }

  getutilitiesName(){
    this.apiService.utilitiesNames().subscribe(res=>{
      console.log(res,"utilityname");
      this.utilitiesName = res;

    })
  }

  fetchModuleMakesData() {
    this.apiService.utilitiesNames().subscribe(
      (response:any) => {
        console.log("Hiii");
        this.modulemakes = response;
        this.filteredModuleMakes = this.desginForm.get('utility').valueChanges.pipe(
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

  fetchIncentive() {
    this.apiService.salesIncentives().subscribe(
      (response:any) => {
        console.log("Hiii");
        this.incentives = response;
        // this.filterIncentive = this.desginForm.get('utility').valueChanges.pipe(
        //   startWith(""),
        //   map(value => (typeof value === "string" ? value : value.title)),
        //   map(title => (title ? this._filterincentive(title) : this.incentives.slice()))
        // );
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  private _filterModuleMake(name: string) {
    const filterValue = name.toLowerCase();
    return this.modulemakes.filter(
      modulemake => modulemake.name.toLowerCase().indexOf(filterValue) != -1
    );
  }

  fetchUtilityData(_event: any, make) {
    //this.desginForm.patchValue({ uti: " " })
    this.desginForm.patchValue({ utilityrate: " " })
    if (_event.isUserInput) {
      console.log(_event,"hello");
      this.desginForm.get('utilityrate').setValue("");
     if (this.isEditMode) {
       this.selectedUtilityRateId = null;
     }
      this.modulemodels = [];
      this.selectedUtilityId = make.id;
      this.apiService.utilitiesRate(make.id).subscribe(
        (response:any) =>{
          console.log("Hiii",response);
          this.modulemodels = response;
          console.log(this.modulemodels)
          this.filteredModuleModels = this.desginForm.get('utilityrate').valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.rate)),
            map(rate => (rate ? this._filterModuleModel(rate) : this.modulemodels.slice()))
          );
        },
        error => {
          this.utils.errorSnackBar("Error");
        }
      );
    }
  }

  setSelectedUtilityRate(module)
  {
    console.log(module);
    this.selectedUtilityRateId = module.id;
  }

  displayFnModuleModel(modulemodel:any): string {
    return modulemodel && modulemodel.name ? modulemodel.name : "";
  }

  private _filterModuleModel(rate: string) {
    const filterValue = rate.toLowerCase();

    return this.modulemodels.filter(
      modulemodel => modulemodel.rate.toLowerCase().indexOf(filterValue) != -1
    );
  }

  saveUtilityName() {
    console.log(this.modulemakes)
    console.log("g",this.desginForm.get("utility").value);
    const found = this.modulemakes.some(el => el.name === this.desginForm.get("utility").value);
    if (!found) {
      console.log("hello");
      let data={


        name:this.desginForm.get('utility').value
      }
      this.apiService
        .postUtilitiesNames(
          data
        )
        .subscribe(
          (response:any) => {
            console.log(response);
            this.selectedUtilityId = response.id;
            this.saveUtilityRate();
          },
          error => {
            this.utils.errorSnackBar(

              "Error"
            );
          }
        );
    } else {
      this.saveUtilityRate();
    }
  }

  saveUtilityRate() {
    console.log(this.modulemodels);
    console.log(this.desginForm.get("utilityrate").value)
    const ismakefound = this.modulemakes.some(el => el.name === this.desginForm.get("utility").value);
    console.log(ismakefound);
    const found = this.modulemodels.some(el => el.rate === this.desginForm.get("utilityrate").value);
   console.log(found);
    if (!ismakefound || !found) {
      let data={
        utility:this.selectedUtilityId,
        rate:this.desginForm.get('utilityrate').value

      }
      this.apiService
        .postUtilitiesRate(
          data
        )
        .subscribe(
          (response:any) => {
            this.selectedUtilityRateId = response.id;
            this.submitform();
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

  uploadFile(event) {
    this.logoSelected=true;
    this.uploadLogo= event.target.files[0].name;
    console.log(this.uploadLogo);

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.logo = reader.result;
        this.blob= this.utils.b64toBlob(this.logo);
        console.log(this.blob);

        this.firstFormGroup.patchValue({
          logo: this.uploadLogo
        });
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cdr.markForCheck();
    }
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
    this.userId= this.storage.getUserID();
      this.fieldDisabled=false;
      this.userdata = this.storage.getUser();
      this.byDefaultData();
      //this.fetchModuleMakesData();
      // this.intercom.update({
      //   "hide_default_launcher": true
      // });
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
      if (event === ScheduleFormEvent.SAVE_SALES_FORM || event === ScheduleFormEvent.SEND_SALES_FORM) {
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

    setTimeout(()=>{
      this.fetchModuleMakesData();
      if (this.designId !== 0) {
        this.loadModuleModelsData();
        this.byDefaultData();
      }
    });
this.formControlValueChanged();
this.uploadcontrolvalidation();

  }

  byDefaultData()
  {
    console.log(this.userdata)
    this.desginForm.patchValue({
      company:this.userdata.company
    })
    if(this.userdata.logo != null){
    this.logo = this.userdata.logo.url
    }
  }

formControlValueChanged() {
  const NUMBERPATTERN = '^[0-9]*$';
  const tiltControl = this.desginForm.get('tiltgroundmount');
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

loadModuleModelsData() {
  this.modulemodels = [];
  this.apiService.utilitiesRate(this.selectedUtilityId).subscribe(
    (response:any) => {
      console.log("Hiii");
      this.modulemodels = response;
      this.filteredModuleModels = this.desginForm.get('utilityrate').valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value.rate)),
        map(rate => (rate ? this._filterModuleModel(rate) : this.modulemodels.slice()))
      );
    },
    error => {
      this.utils.errorSnackBar("Error");
    }
  );
}

  ngOnDestroy(): void {
   // this.utils.showHideIntercom(false);
    this.subscription.unsubscribe();
    if (this.designId === 0) {
      this.addressSubscription.unsubscribe();
    }
  }

getDesignDetails() {

    this.utils.showLoading('Getting Design Details').then(() => {
      this.apiService.getDesginDetail(this.designId).subscribe(async (result) => {
        await this.utils.hideLoading().then(()=>{
          // this.utils.showHideIntercom(true);
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
            tiltgroundmount: this.design.tiltgroundmount,
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
            status:this.design.status,
            utility: this.design.utility.name,
            utilityrate : this.design.utilityrate.rate,
            annualutilityescalation : this.design.annualutilityescalation,
            incentive : this.design.incentive.id,
            costofsystem : this.design.costofsystem,
            personname : this.design.personname,
            requirementtype : this.design.requirementtype
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
    console.log('Reach', this.desginForm.value);
    // debugger;
    // this.saveModuleMake();
    this.saveUtilityName();


  }

  submitform(){
    console.log(this.desginForm);
    // const invalid = [];
    // const controls = this.desginForm.controls;
    // for (const name in controls) {
    //     if (controls[name].invalid) {
    //         invalid.push(name);
    //     }
    // }
    // console.log('hey',invalid)
    // return invalid;


    if (this.desginForm.status == 'VALID') {
      var newConstruction = this.desginForm.get("newconstruction").value;
      console.log(this.selectedUtilityId)
     // this.desginForm.get('utilityrate').setValue(this.selectedUtilityRateId);
     // this.desginForm.get('utility').setValue(this.selectedUtilityId);
     let postData;
        if (this.designId === 0) {

          if(this.send===ScheduleFormEvent.SAVE_SALES_FORM){
            debugger;
            postData = {
              company: this.desginForm.get('company').value,
              name: this.desginForm.get('name').value,
              email: this.desginForm.get('email').value,
              solarmake: this.desginForm.get('solarmake').value,
              solarmodel: this.desginForm.get('solarmodel').value,
              invertermake: this.desginForm.get('invertermake').value,
              invertermodel: this.desginForm.get('invertermodel').value,
              monthlybill: this.desginForm.get('monthlybill').value,
              address: this.desginForm.get('address').value,
              createdby: this.desginForm.get('createdby').value,
              assignedto: this.desginForm.get('assignedto').value,
              rooftype: this.desginForm.get('rooftype').value,
              //prelimdesign: new FormControl(null),
              architecturaldesign: this.desginForm.get('architecturaldesign').value,
              tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
              mountingtype: this.desginForm.get('mountingtype').value,
              // jobtype: new FormControl('', [Validators.required]),
              projecttype: this.desginForm.get('projecttype').value,
              newconstruction: this.desginForm.get('newconstruction').value,
              source: this.desginForm.get('source').value,
              comments: this.desginForm.get('comments').value,
              requesttype: this.desginForm.get('requesttype').value,
              latitude: this.desginForm.get('latitude').value,
              longitude: this.desginForm.get('longitude').value,
              country:this.desginForm.get('country').value,
              state: this.desginForm.get('state').value,
              city: this.desginForm.get('city').value,
              postalcode:this.desginForm.get('postalcode').value,
              status: this.desginForm.get('status').value,
              attachments: this.desginForm.get('attachments').value,
              deliverydate:this.desginForm.get('deliverydate').value,
              outsourcedto:this.desginForm.get('outsourcedto').value,
              isoutsourced:this.desginForm.get('isoutsourced').value,
              designacceptancestarttime:this.desginForm.get('designacceptancestarttime').value,
              creatorparentid:this.desginForm.get('creatorparentid').value,
              //isonpriority:new FormControl('false'),
              paymentstatus:this.desginForm.get('paymentstatus').value,
              paymenttype:this.desginForm.get('paymenttype').value,
              utility:this.selectedUtilityId,
              utilityrate : this.selectedUtilityRateId,
              annualutilityescalation :this.desginForm.get('annualutilityescalation').value,
              incentive : this.desginForm.get('incentive').value,
              costofsystem : this.desginForm.get('costofsystem').value,
              personname : this.desginForm.get('personname').value,
              requirementtype :this.desginForm.get('requirementtype').value,
            }
            this.utils.showLoading('Saving').then(() => {
            // this.apiService.addDesginForm(this.desginForm.value).subscribe((response) => {
              this.apiService.addDesginForm(postData).subscribe((response) => {
              // this.uploaarchitecturedesign(response.id,'architecturaldesign');
              // this.uploadpreliumdesign(response.id,'attachments')
              this.utils.hideLoading().then(()=>{
                if(this.logoSelected){
              this.updateLogo();
                }
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
                   console.log('Redirect.....')
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
            else if(this.send===ScheduleFormEvent.SEND_SALES_FORM){
              postData = {
                company: this.desginForm.get('company').value,
                name: this.desginForm.get('name').value,
                email: this.desginForm.get('email').value,
                solarmake: this.desginForm.get('solarmake').value,
                solarmodel: this.desginForm.get('solarmodel').value,
                invertermake: this.desginForm.get('invertermake').value,
                invertermodel: this.desginForm.get('invertermodel').value,
                monthlybill: this.desginForm.get('monthlybill').value,
                address: this.desginForm.get('address').value,
                createdby: this.desginForm.get('createdby').value,
                assignedto: this.desginForm.get('assignedto').value,
                rooftype: this.desginForm.get('rooftype').value,
                //prelimdesign: new FormControl(null),
                architecturaldesign: this.desginForm.get('architecturaldesign').value,
                tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
                mountingtype: this.desginForm.get('mountingtype').value,
                // jobtype: new FormControl('', [Validators.required]),
                projecttype: this.desginForm.get('projecttype').value,
                newconstruction: this.desginForm.get('newconstruction').value,
                source: this.desginForm.get('source').value,
                comments: this.desginForm.get('comments').value,
                requesttype: this.desginForm.get('requesttype').value,
                latitude: this.desginForm.get('latitude').value,
                longitude: this.desginForm.get('longitude').value,
                country:this.desginForm.get('country').value,
                state: this.desginForm.get('state').value,
                city: this.desginForm.get('city').value,
                postalcode:this.desginForm.get('postalcode').value,
                status: this.desginForm.get('status').value,
                attachments: this.desginForm.get('attachments').value,
                deliverydate:this.desginForm.get('deliverydate').value,
                outsourcedto:this.desginForm.get('outsourcedto').value,
                isoutsourced:this.desginForm.get('isoutsourced').value,
                designacceptancestarttime:this.desginForm.get('designacceptancestarttime').value,
                creatorparentid:this.desginForm.get('creatorparentid').value,
                //isonpriority:new FormControl('false'),
                paymentstatus:this.desginForm.get('paymentstatus').value,
                paymenttype:this.desginForm.get('paymenttype').value,
                utility:this.selectedUtilityId,
                utilityrate : this.selectedUtilityRateId,
                annualutilityescalation :this.desginForm.get('annualutilityescalation').value,
                incentive : this.desginForm.get('incentive').value,
                costofsystem : this.desginForm.get('costofsystem').value,
                personname : this.desginForm.get('personname').value,
                requirementtype :this.desginForm.get('requirementtype').value,
              }
              this.apiService.addDesginForm(postData).subscribe((response) => {
                console.log(response.id);
                this.utils.hideLoading().then(()=>{
                  if(this.logoSelected){
                  this.updateLogo();
                  }
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
                                fulldesigndata:response,

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
          if(this.send===ScheduleFormEvent.SAVE_SALES_FORM){
            postData = {
              company: this.desginForm.get('company').value,
              name: this.desginForm.get('name').value,
              email: this.desginForm.get('email').value,
              solarmake: this.desginForm.get('solarmake').value,
              solarmodel: this.desginForm.get('solarmodel').value,
              invertermake: this.desginForm.get('invertermake').value,
              invertermodel: this.desginForm.get('invertermodel').value,
              monthlybill: this.desginForm.get('monthlybill').value,
              address: this.desginForm.get('address').value,
              createdby: this.desginForm.get('createdby').value,
              assignedto: this.desginForm.get('assignedto').value,
              rooftype: this.desginForm.get('rooftype').value,
              //prelimdesign: new FormControl(null),
              architecturaldesign: this.desginForm.get('architecturaldesign').value,
              tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
              mountingtype: this.desginForm.get('mountingtype').value,
              // jobtype: new FormControl('', [Validators.required]),
              projecttype: this.desginForm.get('projecttype').value,
              newconstruction: this.desginForm.get('newconstruction').value,
              source: this.desginForm.get('source').value,
              comments: this.desginForm.get('comments').value,
              requesttype: this.desginForm.get('requesttype').value,
              latitude: this.desginForm.get('latitude').value,
              longitude: this.desginForm.get('longitude').value,
              country:this.desginForm.get('country').value,
              state: this.desginForm.get('state').value,
              city: this.desginForm.get('city').value,
              postalcode:this.desginForm.get('postalcode').value,
              status: this.desginForm.get('status').value,
              attachments: this.desginForm.get('attachments').value,
              deliverydate:this.desginForm.get('deliverydate').value,
              outsourcedto:this.desginForm.get('outsourcedto').value,
              isoutsourced:this.desginForm.get('isoutsourced').value,
              designacceptancestarttime:this.desginForm.get('designacceptancestarttime').value,
              creatorparentid:this.desginForm.get('creatorparentid').value,
              //isonpriority:new FormControl('false'),
              paymentstatus:this.desginForm.get('paymentstatus').value,
              paymenttype:this.desginForm.get('paymenttype').value,
              utility:this.selectedUtilityId,
              utilityrate : this.selectedUtilityRateId,
              annualutilityescalation :this.desginForm.get('annualutilityescalation').value,
              incentive : this.desginForm.get('incentive').value,
              costofsystem : this.desginForm.get('costofsystem').value,
              personname : this.desginForm.get('personname').value,
              requirementtype :this.desginForm.get('requirementtype').value,
            }
            this.utils.showLoading('Saving').then(() => {
          this.apiService.updateDesignForm(postData, this.designId).subscribe(response => {
            this.utils.hideLoading().then(()=>{
              if(this.logoSelected){
              this.updateLogo();
              }
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
        else if(this.send===ScheduleFormEvent.SEND_SALES_FORM){
          postData = {
            company: this.desginForm.get('company').value,
            name: this.desginForm.get('name').value,
            email: this.desginForm.get('email').value,
            solarmake: this.desginForm.get('solarmake').value,
            solarmodel: this.desginForm.get('solarmodel').value,
            invertermake: this.desginForm.get('invertermake').value,
            invertermodel: this.desginForm.get('invertermodel').value,
            monthlybill: this.desginForm.get('monthlybill').value,
            address: this.desginForm.get('address').value,
            createdby: this.desginForm.get('createdby').value,
            assignedto: this.desginForm.get('assignedto').value,
            rooftype: this.desginForm.get('rooftype').value,
            //prelimdesign: new FormControl(null),
            architecturaldesign: this.desginForm.get('architecturaldesign').value,
            tiltgroundmount: this.desginForm.get('tiltgroundmount').value,
            mountingtype: this.desginForm.get('mountingtype').value,
            // jobtype: new FormControl('', [Validators.required]),
            projecttype: this.desginForm.get('projecttype').value,
            newconstruction: this.desginForm.get('newconstruction').value,
            source: this.desginForm.get('source').value,
            comments: this.desginForm.get('comments').value,
            requesttype: this.desginForm.get('requesttype').value,
            latitude: this.desginForm.get('latitude').value,
            longitude: this.desginForm.get('longitude').value,
            country:this.desginForm.get('country').value,
            state: this.desginForm.get('state').value,
            city: this.desginForm.get('city').value,
            postalcode:this.desginForm.get('postalcode').value,
            status: this.desginForm.get('status').value,
            attachments: this.desginForm.get('attachments').value,
            deliverydate:this.desginForm.get('deliverydate').value,
            outsourcedto:this.desginForm.get('outsourcedto').value,
            isoutsourced:this.desginForm.get('isoutsourced').value,
            designacceptancestarttime:this.desginForm.get('designacceptancestarttime').value,
            creatorparentid:this.desginForm.get('creatorparentid').value,
            //isonpriority:new FormControl('false'),
            paymentstatus:this.desginForm.get('paymentstatus').value,
            paymenttype:this.desginForm.get('paymenttype').value,
            utility:this.selectedUtilityId,
            utilityrate : this.selectedUtilityRateId,
            annualutilityescalation :this.desginForm.get('annualutilityescalation').value,
            incentive : this.desginForm.get('incentive').value,
            costofsystem : this.desginForm.get('costofsystem').value,
            personname : this.desginForm.get('personname').value,
            requirementtype :this.desginForm.get('requirementtype').value,
          }
          this.apiService.updateDesignForm(postData, this.designId).subscribe(response => {
            this.utils.hideLoading().then(()=>{
              if(this.logoSelected){
              this.updateLogo();
              }
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
                    fulldesigndata:response,
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
      else if(this.desginForm.value.utility=='' || this.desginForm.get('utility').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field utility name.');
      }
      else if(this.desginForm.value.utilityrate=='' || this.desginForm.get('utilityrate').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field utility rate.');
      }
      else if(this.desginForm.value.mountingtype==''){
        this.utils.errorSnackBar('Please fill the mounting type.');
      }
      else if(this.desginForm.value.annualutilityescalation==''){
        this.utils.errorSnackBar('Please fill the annual utility escalation.');
      }
      else if(this.desginForm.value.incentive==''){
        this.utils.errorSnackBar('Please fill the incentive.');
      }
      else if(this.desginForm.value.costofsystem==''){
        this.utils.errorSnackBar('Please fill the cost of system');
      }
      else if(this.desginForm.value.personname==''){
        this.utils.errorSnackBar('Please fill the representative name.');
      }
      else if(this.desginForm.value.mountingtype==''){
        this.utils.errorSnackBar('Please fill the mounting type.');
      }
      else if(this.desginForm.value.projecttype==''){
        this.utils.errorSnackBar('Please fill the project type.');
      }
      else if(this.desginForm.value.tiltgroundmount=='' || this.desginForm.get('tiltgroundmount').hasError('pattern')){
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

  updateLogo(){

    this.apiService.uploadlogo(this.blob,this.uploadLogo).subscribe(res=>{
      console.log(res);
        this.apiService.updateUser(this.userId,this.uploadLogo).subscribe((res:any)=>{
          console.log('updated',res);

         let token=  this.storage.getJWTToken();
          this.storage.setUser(res,token);
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
      else if(this.desginForm.value.tiltgroundmount=='' || this.desginForm.get('tiltgroundmount').hasError('pattern')){
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

  onRangeChangeHandler() {
    this.number = this.desginForm.get('annualutilityescalation').value;
    console.log(this.number);


    if (this.desginForm.get('annualutilityescalation').value > 0 && this.desginForm.get('annualutilityescalation').value < 1) {
        this.color = 'dark';
    }
    else if (this.desginForm.get('annualutilityescalation').value > 2 && this.desginForm.get('annualutilityescalation').value < 3) {
      this.color = 'primary';
    }
    else if (this.desginForm.get('annualutilityescalation').value > 3 && this.desginForm.get('annualutilityescalation').value < 4) {
      this.color = 'secondary';
    }
    else {
      this.color = 'danger';
    }
  }
}
