
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ROLES } from '../contants';
import { User } from '../model/user.model';
import { FIELD_REQUIRED, INVALID_ADDRESS, INVALID_COMPANY_NAME, INVALID_EMAIL_MESSAGE, INVALID_FIRST_NAME, INVALID_LAST_NAME, INVALID_PHONE_NUMBER, INVALID_REGISTRATION_NUMBER } from '../model/constants';
import { MenuController, NavController } from '@ionic/angular';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { MatStepper } from '@angular/material/stepper';
import { ErrorModel } from '../model/error.model';
//import { Slides } from 'ionic-angular';

export function getFileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  return zoneOriginalInstance || fileReader;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  @ViewChild('fileInput', { static: false }) el: ElementRef;
  notification: any = {

  }

  user: any;
  roles: any;

  // buffer:any;
  // value=0.25;
  firstnameError = INVALID_FIRST_NAME;
  lastnameError = INVALID_LAST_NAME;
  fieldRequired = FIELD_REQUIRED;
  emailError = INVALID_EMAIL_MESSAGE;
  addressError = INVALID_ADDRESS;
  registrationError = INVALID_REGISTRATION_NUMBER;
  companyError = INVALID_COMPANY_NAME;
  phoneError = INVALID_PHONE_NUMBER;


  logo: any;
  editFile: boolean = true;
  removeUpload: boolean = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  @ViewChild("slidess", { static: true }) slides: any;

  isCompany: boolean = false;
  radioValues: any;
  teamMember = [];
  userId: string;
  isLinear: boolean;
  prelimCharges: any;
  salesProposalCharges:any;
  permitCharges: any;
  prelimSettingValue: any;
  salesProposalSettingValue: any;
  permitSettingValue: any;
  blob: Blob;
  fileName: any;
  logoUploaded: boolean = false;
  logoSelected: boolean = false;
  checkboxValue: boolean;
  roleValue: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private apiService: ApiService,
    private menu: MenuController,
    private utils: UtilitiesService,
    private navCtrl: NavController,
    private cd: ChangeDetectorRef,) {
    this.user = this.storage.getUser();
    console.log(this.user);
    this.userId = this.storage.getUserID();
  }

  ngOnInit() {
    const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD &_*#/'\s,-]+$/;
    const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
    this.firstFormGroup = this.formBuilder.group({
      usertype: new FormControl('company'),
      billingaddress: new FormControl(null, [Validators.required, Validators.pattern(ADDRESSFORMAT)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern("^[0-9]{8,15}$")]),
      //companyaddresssameasbilling:new FormControl(''),
      companyaddress: new FormControl(null, [Validators.required, Validators.pattern(ADDRESSFORMAT)]),
      company: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(COMPANYFORMAT)]),
      ispaymentmodeprepay: new FormControl(null),
      // logo:new FormControl(null, [Validators.required]),
      registrationnumber: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[0-9]{3,20}$")]),
      isonboardingcompleted: new FormControl(true)
    })
    this.secondFormGroup = this.formBuilder.group({
      //For Emails
      designcompletedemail: new FormControl(false),
      designdeliveredemail: new FormControl(false),
      designmovedtoqcemail: new FormControl(false),
      designonholdemail: new FormControl(false),
      designreviewfailedemail: new FormControl(false),
      designreviewpassedemail: new FormControl(false),
      requestgeneratedemail: new FormControl(false),
      requestacknowledgementemail: new FormControl(false),
      requestindesigningemail: new FormControl(false),
      //For Notifications
      designcompletednotification: new FormControl(false),
      designdeliverednotification: new FormControl(false),
      designmovedtoqcnotification: new FormControl(false),
      designonholdnotification: new FormControl(false),
      designreviewfailednotification: new FormControl(false),
      designreviewpassednotification: new FormControl(false),
      requestgeneratednotification: new FormControl(false),
      requestacknowledgementnotification: new FormControl(false),
      requestindesigningnotification: new FormControl(false)
    })
    const EMAILPATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    const NAMEPATTERN = /^[a-zA-Z]{3,}$/;
    this.thirdFormGroup = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern(NAMEPATTERN)]),
      lastname: new FormControl('', [Validators.required, Validators.pattern(NAMEPATTERN)]),
      workemail: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      userrole: new FormControl(''),
      peengineertype: new FormControl(''),
      usertype: new FormControl('company')
    })
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "onboarding")
        this.outlet.deactivate();
    });
    this.getRoles()
    console.log("onboarding")
    this.menu.enable(false);
    // this.user = this.storage.getUser();
    // console.log(this.user)
    // this.userId= this.storage.getUserID();


    this.onboardingData();
    this.paymentCharges();
    this.apiService.emitUserNameAndRole(this.user);




    // this.buffer= this.value + 0.25;

    this.fetchTeamData();

  }

  ionViewDidEnter() {
    this.user = this.storage.getUser();
  }

  ngOnDestroy() {

  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  onboardingData() {

    this.apiService.getUserData(this.userId).subscribe((res: any) => {
      //this.checkboxValue = res.companyaddresssameasbilling;
      if (res.usertype == 'company') {
        this.isCompany = true;
      } else {
        this.isCompany = false;
      }
      this.firstFormGroup.patchValue({
        usertype: res.usertype,
        billingaddress: res.billingaddress,
        phone: res.phone,
        companyaddresssameasbilling: res.companyaddresssameasbilling,
        companyaddress: res.companyaddress,
        company: res.company,
        ispaymentmodeprepay: res.ispaymentmodeprepay,
        registrationnumber: res.registrationnumber,
        logo: res.logo,

      })
      this.secondFormGroup.patchValue({
        //For Emails
        // designcompletedemail:res.designcompletedemail,
        designdeliveredemail: res.designdeliveredemail,
        designmovedtoqcemail: res.designmovedtoqcemail,
        //designonholdemail:res.designonholdemail,
        designreviewfailedemail: res.designreviewfailedemail,
        designreviewpassedemail: res.designreviewpassedemail,
        requestgeneratedemail: res.requestgeneratedemail,
        requestacknowledgementemail: res.requestacknowledgementemail,
        requestindesigningemail: res.requestindesigningemail,
        // For Notifications
        //designcompletednotification:res.designcompletednotification,
        designdeliverednotification: res.designdeliverednotification,
        designmovedtoqcnotification: res.designmovedtoqcnotification,
        //designonholdnotification:res.designonholdnotification,
        designreviewfailednotification: res.designreviewfailednotification,
        designreviewpassednotification: res.designreviewpassednotification,
        requestgeneratednotification: res.requestgeneratednotification,
        requestacknowledgementnotification: res.requestacknowledgementnotification,
        requestindesigningnotification: res.requestindesigningnotification
      })

    })
  }

  companyOptions(e) {

    this.radioValues = e.target.value;

    if (this.radioValues === 'company') {
      this.isCompany = true;
      this.checkboxValue = false;
      this.firstFormGroup.patchValue({
        phone: '',
        billingaddress: '',

      })
    }
    else {
      this.isCompany = false;
      this.checkboxValue = false;
      this.firstFormGroup.patchValue({
        company: '',
        companyaddress: '',
        registrationnumber: '',
        phone: '',
        billingaddress: ''
      })
      this.firstFormGroup.get('companyaddress').clearValidators();
      this.firstFormGroup.get('company').clearValidators();
      //this.firstFormGroup.get('company').reset();
      this.firstFormGroup.get('registrationnumber').clearValidators();
      //this.firstFormGroup.get('registrationnumber').reset();

    }
    this.firstFormGroup.get('companyaddress').updateValueAndValidity();
    this.firstFormGroup.get('company').updateValueAndValidity();
    this.firstFormGroup.get('registrationnumber').updateValueAndValidity();
  }

  // addPrelim(){
  //   this.router.navigate(['/schedule/design']);
  // }

  // addPermit(){
  //   this.router.navigate(['/permitschedule']);
  // }

  fetchTeamData() {
    this.apiService.getTeamData().subscribe(response => {
      this.teamMember = response;

    })
  }

  getRoles() {
    console.log(this.user);
    let parentId = this.user.parent.id;
    let roleId = this.user.role.id;
    this.apiService.getDynamicRoles(parentId, roleId).subscribe((res) => {
      console.log(res);
      this.roles = res;
      console.log(this.roles);
      if (res == 0) {
        this.apiService.getDefaultRoles(roleId).subscribe((response) => {
          console.log(response);
          this.roles = response;
          console.log(this.roles)
        })
      }
    })
  }

  firstStepper() {
    // if(this.firstFormGroup.status === 'VALID')
    // {
    if (this.logoSelected) {
      this.updateLogo();
    }
    else {
      // if(this.logoUploaded){
      //   this.apiService.updateUser(this.userId,this.firstFormGroup.value).subscribe((res:any)=>{


      //    let token=  this.storage.getJWTToken();
      //     this.storage.setUser(res,token);
      //   })
      // }
      // else{

      this.apiService.updateUser(this.userId, this.firstFormGroup.value).subscribe((res: any) => {


        let token = this.storage.getJWTToken();
        this.storage.setUser(res, token);
      })
      // }
    }
    // }
    // else{
    //   if(this.firstFormGroup.value.billingaddress === ''){
    //     this.utils.errorSnackBar('Please Enter Billing Address');
    //   }
    //   else if(this.firstFormGroup.value.company === '')
    //   {
    //     this.utils.errorSnackBar('Please Enter Company Name');
    //   }
    //   else {
    //     this.utils.errorSnackBar('Please Check Fields');
    //   }
    // }

  }


  onChange(event, value) {


    if (value == 'requestgenerated') {
      this.secondFormGroup.patchValue({
        requestgeneratednotification: event.detail.checked
      })
    }
    else if (value == 'requestacknoledged') {
      this.secondFormGroup.patchValue({
        requestacknowledgementnotification: event.detail.checked
      })
    }
    else if (value == 'designcompletednotification') {
      this.secondFormGroup.patchValue({
        designcompletednotification: event.detail.checked
      })
    }
    // else if(value=='onhold'){
    //   this.secondFormGroup.patchValue({
    //     designonholdnotification:event.detail.checked
    //   })
    // }
    else if (value == 'requestindesigningnotification') {
      this.secondFormGroup.patchValue({
        requestindesigningnotification: event.detail.checked
      })
    }
    else if (value == 'qc') {
      this.secondFormGroup.patchValue({
        designmovedtoqcnotification: event.detail.checked
      })
    }
    else if (value == 'reviewfailed') {
      this.secondFormGroup.patchValue({
        designreviewfailednotification: event.detail.checked
      })
    }
    else if (value == 'reviewpassed') {
      this.secondFormGroup.patchValue({
        designreviewpassednotification: event.detail.checked
      })
    }
    else if (value == 'delivered') {
      this.secondFormGroup.patchValue({
        designdeliverednotification: event.detail.checked
      })
    }
  }

  onEmailChange(event, value) {


    if (value == 'requestgeneratedemail') {
      this.secondFormGroup.patchValue({
        requestgeneratedemail: event.detail.checked
      })
    }
    else if (value == 'requestacknoledgedemail') {
      this.secondFormGroup.patchValue({
        requestacknowledgementemail: event.detail.checked
      })
    }
    else if (value == 'designcompletedemail') {
      this.secondFormGroup.patchValue({
        designcompletedemail: event.detail.checked
      })
    }
    //  else if(value=='onhold'){
    //    this.secondFormGroup.patchValue({
    //      designonholdemail:event.detail.checked
    //    })
    //  }
    else if (value == 'requestindesigningemail') {
      this.secondFormGroup.patchValue({
        requestindesigningemail: event.detail.checked
      })
    }
    else if (value == 'qcemail') {
      this.secondFormGroup.patchValue({
        designmovedtoqcemail: event.detail.checked
      })
    }
    else if (value == 'reviewfailedemail') {
      this.secondFormGroup.patchValue({
        designreviewfailedemail: event.detail.checked
      })
    }
    else if (value == 'reviewpassedemail') {
      this.secondFormGroup.patchValue({
        designreviewpassedemail: event.detail.checked
      })
    }
    else if (value == 'deliveredemail') {
      this.secondFormGroup.patchValue({
        designdeliveredemail: event.detail.checked
      })
    }
  }

  secondStepper() {

    this.apiService.updateUser(this.userId, this.secondFormGroup.value).subscribe((res: any) => {

      let token = this.storage.getJWTToken();
      this.storage.setUser(res, token);
      //this.utils.showSnackBar('Changes saved successfully');

    })
  }

  thirdStepper() {

    //  if (this.thirdFormGroup.status === 'VALID') {
    // $ev.preventDefault();
    let peengineertype;
    let rolesel = parseInt(this.thirdFormGroup.get("userrole").value);
    var senddesignrequestpermission = false;
    if (rolesel == ROLES.ContractorAdmin || rolesel == ROLES.Admin || rolesel == ROLES.BD) {
      senddesignrequestpermission = true;
    }
    this.apiService
      .addUser(
        this.thirdFormGroup.get("workemail").value,
        this.thirdFormGroup.get("firstname").value,
        this.thirdFormGroup.get("lastname").value,
        senddesignrequestpermission,
        parseInt(this.thirdFormGroup.get("userrole").value),
        this.user.parent.minpermitdesignaccess,
        this.thirdFormGroup.get("peengineertype").value,
        this.thirdFormGroup.get("usertype").value
      )
      .subscribe(
        (response: any) => {

          this.utils.showSnackBar('Team created successfully');
          this.thirdFormGroup.reset();
        },
        // error => {
        //   this.utils.errorSnackBar(error);
        // }
        responseError => {
          const error: ErrorModel = responseError.error;
          this.utils.errorSnackBar(error.message);
        }
      );

    // }
    // else{
    //   if(this.thirdFormGroup.value.firstname =='' || this.thirdFormGroup.get('firstname').hasError('pattern')){

    //     this.utils.errorSnackBar('Please check the field first name');
    //   }
    //   else if(this.thirdFormGroup.value.lastname =='' || this.thirdFormGroup.get('lastname').hasError('pattern')){
    //     this.utils.errorSnackBar('Please check the field last name');
    //   }
    //   else if(this.thirdFormGroup.value.workemail =='' || this.thirdFormGroup.get('workemail').hasError('pattern')){
    //     this.utils.errorSnackBar('Please check the field email')
    //   }
    //   else{
    //     this.utils.errorSnackBar('Please check fields')
    //   }
    // }

  }


  goToWallet() {


    if (this.user.amount == 0 && this.user.isonboardingcompleted == false) {
      //this.router.navigate(['/add-money',{mode:"wallet", onBoarding:"true"}]);
      let objToSend: NavigationExtras = {
        queryParams: {
          mode: "wallet",
          onBoarding: "true"
        },
        skipLocationChange: false,
        fragment: 'top'
      };


      this.router.navigate(['/add-money'], {
        state: { productdetails: objToSend }
      });
    }
    else {
      //this.router.navigate(['/add-money',{mode:"wallet", onBoarding:"false"}])
      let objToSend: NavigationExtras = {
        queryParams: {
          mode: "wallet",
          onBoarding: "false"
        },
        skipLocationChange: false,
        fragment: 'top'
      };


      this.router.navigate(['/add-money'], {
        state: { productdetails: objToSend }
      });
    }
  }

  paymentCharges() {

    this.apiService.prelimCharges().subscribe(res => {
      // this.prelimCharge = res;

      // this.storage.setPrelimCharges(res);
      this.prelimCharges = res;
      this.prelimCharges.forEach(element => {
        this.prelimSettingValue = element.settingvalue;
      })



    })

    this.apiService.prelimSalesCharges().subscribe(res=>{
      this.salesProposalCharges = res;
      this.salesProposalCharges.forEach(element=>{
        this.salesProposalSettingValue = element.settingvalue;
      })
    })

    this.apiService.permitinitcharges().subscribe(res => {
      // this.storage.setPermitCharges(res);
      this.permitCharges = res;
      this.permitCharges.forEach(element => {
        this.permitSettingValue = element.settingvalue;
      })
    })
  }

  uploadFile(event) {
    this.logoSelected = true;
    this.fileName = event.target.files[0].name;


    let reader = getFileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.logo = reader.result;
        this.blob = this.utils.b64toBlob(this.logo);


        this.firstFormGroup.patchValue({
          logo: this.fileName
        });



        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  removeLogo(event) {
    event.stopPropagation();
    this.logo = null;
    this.firstFormGroup.patchValue({
      logo: null
    });
  }

  updateLogo() {

    this.apiService.uploadlogo(this.blob, this.fileName).subscribe(res => {

      this.apiService.updateUser(this.userId, this.firstFormGroup.value).subscribe((res: any) => {


        let token = this.storage.getJWTToken();
        this.storage.setUser(res, token);
      })
    })
  }

  move($event, index: number) {
    $event.stopPropagation();
    this.stepper.selectedIndex = index;
  }

  moveToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goBack() {
    this.navCtrl.pop();
  }

  change(e) {
    this.checkboxValue = e.detail.checked;

    if (this.checkboxValue == true) {
      this.firstFormGroup.get("billingaddress").setValue(this.firstFormGroup.get("companyaddress").value);

    }
    else {
      this.firstFormGroup.get("billingaddress").setValue('');
    }
  }
  roleChange(id) {
    console.log(id)
    this.roleValue = id;
  }

  scheduledPage() {
    // this.mixpanelService.track("ADD_PRELIMDESIGN_PAGE_OPEN", {
    // });
    this.utils.presentPopover('design');
    this.utils.setDesignDetails(null);
    // this.route.navigate([ '/schedule/design' ]);
  }

}
