import { Component, OnInit, Renderer, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
//import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  notification:any={

  }

  buffer:any;
  value=0.25;

  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  @ViewChild("slidess", {static:true}) slides:any;

  isCompany:boolean = false;
  radioValues:any;
  teamMember=[];
  userId: string;
 

  constructor(public renderer:Renderer,
              private router:Router,
              private formBuilder: FormBuilder,
              private storage:StorageService,
              private apiService: ApiService) {
                this.firstFormGroup = this.formBuilder.group({
                  usertype : new FormControl(null),
                  billingaddress:new FormControl(null),
                  company:new FormControl(null),
                  ispaymentmodeprepay:new FormControl(null)
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
        ispaymentmodeprepay:res.ispaymentmodeprepay
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

}
