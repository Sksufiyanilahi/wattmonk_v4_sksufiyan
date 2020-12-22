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
                  secondCtrl: new FormControl('')
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
    let dataToBeUpdated={
      usertype:this.radioValues,
      billingaddress:'',
      company:'',
      logo:'',
      ispaymentmodeprepay:''

    }

    console.log(this.firstFormGroup.value);
    
    this.apiService.updateUser(this.userId,this.firstFormGroup.value).subscribe((res)=>{
      console.log('updated',res);
      
    })
  }

  secondStepper(){
    let dataToBeUpdated={
      designcompletednotification:'',
      designdeliverednotification:'',
      designmovedtoqcnotification:'',
      designonholdnotification:'',
      designreviewfailednotification:'',
      designreviewpassednotification:'',
      requestgeneratednotification:'',
      requestacknowledgementnotification:'',
      requestindesigningnotification:''

    }
    this.apiService.updateUser(this.userId,dataToBeUpdated).subscribe(()=>{
      console.log('updated');
      
    })
  }

  updateProcess(){
    let dataToBeUpdated={
      usertype:this.radioValues,
      billingaddress:'',
      company:'',
      logo:'',
      designcompletednotification:'',
      designdeliverednotification:'',
      designmovedtoqcnotification:'',
      designonholdnotification:'',
      designreviewfailednotification:'',
      designreviewpassednotification:'',
      requestgeneratednotification:'',
      requestacknowledgementnotification:'',
      requestindesigningnotification:'',
      ispaymentmodeprepay:''

    }
    this.apiService.updateUser(this.userId,dataToBeUpdated).subscribe(()=>{
      console.log('updated');
      
    })
  }

}
