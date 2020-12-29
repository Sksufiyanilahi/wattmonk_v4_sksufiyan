import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  @ViewChild('fileInput',{static:false}) el: ElementRef;
  logo: any ;
  editFile: boolean = true;
  removeUpload: boolean = false;

  buffer:any;
  value=0.25;

  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  @ViewChild("slidess", {static:true}) slides:any;

  isCompany:boolean = false;
  radioValues:any;
  teamMember=[];
  userId: string;
  blob: Blob;
  fileName: any;
 

  constructor(public renderer:Renderer,
              private router:Router,
              private formBuilder: FormBuilder,
              private storage:StorageService,
              private apiService: ApiService,
              private cd:ChangeDetectorRef,
              private utils:UtilitiesService
              
              ) {
                this.firstFormGroup = this.formBuilder.group({
                  usertype : new FormControl(null),
                  billingaddress:new FormControl(null),
                  company:new FormControl(null),
                  logo:new FormControl(null),
                  ispaymentmodeprepay:new FormControl(null),
                  registrationnumber:new FormControl(null)
                })
                this.secondFormGroup = this.formBuilder.group({
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
               }

  ngOnInit() {
    this.userId= this.storage.getUserID();
    console.log(this.userId);
      this.onboardingData();
  


this.buffer= this.value + 0.25;
    console.log(this.buffer);
    this.fetchTeamData();

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
        designcompletednotification:res.designcompletednotification,
        designdeliverednotification:res.designdeliverednotification,
        designmovedtoqcnotification:res.designmovedtoqcnotification,
        designonholdnotification:res.designonholdnotification,
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
    
    this.apiService.updateUser(this.userId,this.firstFormGroup.value).subscribe((res)=>{
      console.log('updated',res);
      this.updateLogo();
    })
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
    else if(value=='requestdesign'){
      this.secondFormGroup.patchValue({
        requestindesigningnotification:event.detail.checked
      })
    }
    else if(value=='onhold'){
      this.secondFormGroup.patchValue({
        designonholdnotification:event.detail.checked
      })
    }
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

  secondStepper(){
    console.log(this.secondFormGroup.value);
    this.apiService.updateUser(this.userId,this.secondFormGroup.value).subscribe((res)=>{
      console.log('updated',res);
      
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
