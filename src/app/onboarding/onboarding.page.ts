
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ROLES } from '../contants';
import { User } from '../model/user.model';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE, INVALID_FIRST_NAME, INVALID_LAST_NAME } from '../model/constants';
import { MenuController } from '@ionic/angular';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
//import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  notification:any={

  }

  user:any;

  // buffer:any;
  // value=0.25;
  firstnameError=INVALID_FIRST_NAME;
  lastnameError = INVALID_LAST_NAME;
  fieldRequired = FIELD_REQUIRED;
  emailError = INVALID_EMAIL_MESSAGE;
  @ViewChild('fileInput',{static:false}) el: ElementRef;
  logo: any ;
  editFile: boolean = true;
  removeUpload: boolean = false;

  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  thirdFormGroup:FormGroup;
  @ViewChild("slidess", {static:true}) slides:any;

  isCompany:boolean = false;
  radioValues:any;
  teamMember=[];
  userId: string;
  isLinear:boolean;
  prelimCharges:any;
  permitCharges:any;
  prelimSettingValue:any;
  permitSettingValue:any;
  blob: Blob;
  fileName: any;
 

  constructor(public renderer:Renderer,
              private router:Router,
              private formBuilder: FormBuilder,
              private storage:StorageService,
              private apiService: ApiService,
              private menu:MenuController,
              private utils: UtilitiesService,
              private cd:ChangeDetectorRef,) {
                this.firstFormGroup = this.formBuilder.group({
                  usertype : new FormControl(null),
                  billingaddress:new FormControl(null, [Validators.required]),
                  company:new FormControl(null, [Validators.required]),
                  ispaymentmodeprepay:new FormControl(null),
                  logo:new FormControl(null),
                  registrationnumber:new FormControl(null)
                })
                this.secondFormGroup = this.formBuilder.group({
                  //For Emails
                    designcompletedemail:new FormControl(false),
                    designdeliveredemail:new FormControl(false),
                    designmovedtoqcemail:new FormControl(false),
                    designonholdemail:new FormControl(false),
                    designreviewfailedemail:new FormControl(false),
                    designreviewpassedemail:new FormControl(false),
                    requestgeneratedemail:new FormControl(false),
                    requestacknowledgementemail:new FormControl(false),
                    requestindesigningemail:new FormControl(false),
                  //For Notifications
                    designcompletednotification:new FormControl(false),
                    designdeliverednotification:new FormControl(false),
                    designmovedtoqcnotification:new FormControl(false),
                    designonholdnotification:new FormControl(false),
                    designreviewfailednotification:new FormControl(false),
                    designreviewpassednotification:new FormControl(false),
                    requestgeneratednotification:new FormControl(false),
                    requestacknowledgementnotification:new FormControl(false),
                    requestindesigningnotification:new FormControl(false)
                })
                const EMAILPATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
                const NAMEPATTERN = /^[a-zA-Z]{3,}$/;
                this.thirdFormGroup = this.formBuilder.group({
                  firstname : new FormControl(null,[Validators.required, Validators.pattern(NAMEPATTERN)]),
                  lastname : new FormControl(null, [Validators.required, Validators.pattern(NAMEPATTERN)]),
                  workemail : new FormControl(null, [Validators.required, Validators.pattern(EMAILPATTERN)]),
                  userrole : new FormControl(null)
                })
               }

  ngOnInit() {
    this.menu.enable(false);
    this.user = this.storage.getUser();
    this.userId= this.storage.getUserID();
    console.log(this.prelimCharges);
    console.log(this.permitCharges);
      this.onboardingData();
      this.paymentCharges();



// this.buffer= this.value + 0.25;
//     console.log(this.buffer);
    this.fetchTeamData();

  }

  ngOnDestroy(){
    
  }

  ionViewWillLeave(){
    this.menu.enable(true);
  }

  onboardingData(){

    this.apiService.getUserData(this.userId).subscribe((res:any)=>{
      console.log(res);
      
      if(res.usertype=='company'){
        this.isCompany=true;
      }else{
        this.isCompany=false;
        }
      this.firstFormGroup.patchValue({
        usertype:res.usertype,
        billingaddress:res.billingaddress,
        company:res.company,
        ispaymentmodeprepay:res.ispaymentmodeprepay,
        registrationnumber:res.registrationnumber,
        logo:res.logo
      })
      this.secondFormGroup.patchValue({
        //For Emails
       // designcompletedemail:res.designcompletedemail,
        designdeliveredemail:res.designdeliveredemail,
        designmovedtoqcemail:res.designmovedtoqcemail,
        //designonholdemail:res.designonholdemail,
        designreviewfailedemail:res.designreviewfailedemail,
        designreviewpassedemail:res.designreviewpassedemail,
        requestgeneratedemail:res.requestgeneratedemail,
        requestacknowledgementemail:res.requestacknowledgementemail,
        requestindesigningemail:res.requestindesigningemail,
        // For Notifications
        //designcompletednotification:res.designcompletednotification,
        designdeliverednotification:res.designdeliverednotification,
        designmovedtoqcnotification:res.designmovedtoqcnotification,
        //designonholdnotification:res.designonholdnotification,
        designreviewfailednotification:res.designreviewfailednotification,
        designreviewpassednotification:res.designreviewpassednotification,
        requestgeneratednotification:res.requestgeneratednotification,
        requestacknowledgementnotification:res.requestacknowledgementnotification,
        requestindesigningnotification:res.requestindesigningnotification
      })
    
    })
  }

  companyOptions(e){
    console.log(e);
    this.radioValues = e.target.value;
    console.log(this.radioValues);
    if(this.radioValues === 'company'){
    this.isCompany = true;
    }
    else{
      this.isCompany = false;
      this.firstFormGroup.patchValue({
        company:''
      })
    }
  }

  addPrelim(){
    this.router.navigate(['/schedule/design']);
  }

  addPermit(){
    this.router.navigate(['/permitschedule']);
  }

  fetchTeamData(){
    this.apiService.getTeamData().subscribe(response =>{
      this.teamMember = response;
      console.log(this.teamMember);
    })
  }

  firstStepper(){
    if(this.firstFormGroup.status === 'VALID')
    {
    this.apiService.updateUser(this.userId,this.firstFormGroup.value).subscribe((res)=>{
      console.log('updated',res);
      this.updateLogo();
    })
  }
  else{
    if(this.firstFormGroup.value.billingaddress === ''){
      this.utils.errorSnackBar('Please Enter Billing Address');
    }
    else if(this.firstFormGroup.value.company === '')
    {
      this.utils.errorSnackBar('Please Enter Company Name');
    }
    else {
      this.utils.errorSnackBar('Please Check Fields');
    }
  }
    
  }


  onChange(event,value){
   console.log(event);
   
     if(value=='requestgenerated'){
      this.secondFormGroup.patchValue({
        requestgeneratednotification:event.detail.checked
      })
    }
    else if(value=='requestacknoledged'){
      this.secondFormGroup.patchValue({
        requestacknowledgementnotification:event.detail.checked
      })
    }
    // else if(value=='requestdesign'){
    //   this.secondFormGroup.patchValue({
    //     requestindesigningnotification:event.detail.checked
    //   })
    // }
    // else if(value=='onhold'){
    //   this.secondFormGroup.patchValue({
    //     designonholdnotification:event.detail.checked
    //   })
    // }
    else if(value=='completedesign'){
      this.secondFormGroup.patchValue({
        designcompletednotification:event.detail.checked
      })
    }
    else if(value=='qc'){
      this.secondFormGroup.patchValue({
        designmovedtoqcnotification:event.detail.checked
      })
    }
    else if(value=='reviewfailed'){
      this.secondFormGroup.patchValue({
        designreviewfailednotification:event.detail.checked
      })
    }
    else if(value=='reviewpassed'){
      this.secondFormGroup.patchValue({
        designreviewpassednotification:event.detail.checked
      })
    }
    else if(value=='delivered'){
      this.secondFormGroup.patchValue({
        designdeliverednotification:event.detail.checked
      })
    }
  }

  onEmailChange(event,value){
    console.log(event);
    
      if(value=='requestgeneratedemail'){
       this.secondFormGroup.patchValue({
         requestgeneratedemail:event.detail.checked
       })
     }
     else if(value=='requestacknoledgedemail'){
       this.secondFormGroup.patchValue({
         requestacknowledgementemail:event.detail.checked
       })
     }
    //  else if(value=='requestdesign'){
    //    this.secondFormGroup.patchValue({
    //      requestindesigningemail:event.detail.checked
    //    })
    //  }
    //  else if(value=='onhold'){
    //    this.secondFormGroup.patchValue({
    //      designonholdemail:event.detail.checked
    //    })
    //  }
     else if(value=='completedesignemail'){
       this.secondFormGroup.patchValue({
         designcompletedemail:event.detail.checked
       })
     }
     else if(value=='qcemail'){
       this.secondFormGroup.patchValue({
         designmovedtoqcemail:event.detail.checked
       })
     }
     else if(value=='reviewfailedemail'){
       this.secondFormGroup.patchValue({
         designreviewfailedemail:event.detail.checked
       })
     }
     else if(value=='reviewpassedemail'){
       this.secondFormGroup.patchValue({
         designreviewpassedemail:event.detail.checked
       })
     }
     else if(value=='deliveredemail'){
       this.secondFormGroup.patchValue({
         designdeliveredemail:event.detail.checked
       })
     }
   }

  secondStepper(){
    console.log(this.secondFormGroup.value);
    this.apiService.updateUser(this.userId,this.secondFormGroup.value).subscribe((res)=>{
      console.log('updated',res);
      
    })
  }

  thirdStepper(){
    if (this.thirdFormGroup.status === 'VALID') {
    // $ev.preventDefault();
    
        let rolesel = parseInt(this.thirdFormGroup.get("userrole").value);
        var senddesignrequestpermission = false;
        if(rolesel == ROLES.ContractorAdmin || rolesel == ROLES.Admin || rolesel == ROLES.BD){
          senddesignrequestpermission = true;
        }
        this.apiService
          .addUser(
            this.thirdFormGroup.get("workemail").value,
            this.thirdFormGroup.get("firstname").value,
            this.thirdFormGroup.get("lastname").value,
            senddesignrequestpermission,
            parseInt(this.thirdFormGroup.get("userrole").value),
            this.user.parent.minpermitdesignaccess
          )
          .subscribe(
            response => {
            },
            error => {
            }
          );
      }
    else{
      
      if(this.thirdFormGroup.value.firstname ===null || this.thirdFormGroup.get('firstname').hasError('pattern')){

        this.utils.errorSnackBar('Please check the field first name');
      }
      else if(this.thirdFormGroup.value.lastname ===null || this.thirdFormGroup.get('lastname').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field last name');
      }
      else if(this.thirdFormGroup.value.workemail ===null || this.thirdFormGroup.get('workemail').hasError('pattern')){
        this.utils.errorSnackBar('Please check the field email')
      }
      else{
        this.utils.errorSnackBar('Please check fields')
      }
    }
    
  }

  goToWallet(){
    this.router.navigate(['/add-money',{mode:"wallet", onBoarding:"true"}]);
  }

  paymentCharges(){
    console.log("hello")
    this.apiService.prelimCharges().subscribe(res => {
      // this.prelimCharge = res;
      // console.log(this.prelimCharge.settingvalue)
      // this.storage.setPrelimCharges(res);
      this.prelimCharges = res;
      this.prelimCharges.forEach(element=>{
        this.prelimSettingValue = element.settingvalue;
      })
      console.log(this.prelimCharges)
      console.log('hello', this.prelimSettingValue) 

    })

    this.apiService.permitCharges().subscribe(res => {
      // this.storage.setPermitCharges(res);
      this.permitCharges = res;
      this.permitCharges.forEach(element => {
        this.permitSettingValue = element.settingvalue;
      })
    })
  }
  
  uploadFile(event) {
    this.fileName= event.target.files[0].name;
    console.log(this.fileName);
    
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
          logo: this.fileName
        });

        console.log(this.firstFormGroup.value);
        
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  updateLogo(){

    this.apiService.uploadlogo(this.blob,this.fileName).subscribe(res=>{
      console.log(res);
      
    })
  }

}
