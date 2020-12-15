import { Component, OnInit, Renderer, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
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

  // accordionExpanded = false;
  // accordionExpanded1 = true;
  // accordionExpanded2 = true;
  // accordionExpanded3 = true;
  isCompany:boolean = false;
  radioValues:any;
  teamMember=[];

  // @ViewChild("sample", {static:true}) cardContent: any;
  // @ViewChild("sample1", {static:true}) cardContent1: any;
  // @ViewChild("sample2", {static:true}) cardContent2: any;
  // @ViewChild("sample3", {static:true}) cardContent3: any;

  constructor(public renderer:Renderer,
              private router:Router,
              private formBuilder: FormBuilder,
              private apiService: ApiService) {
                this.firstFormGroup = this.formBuilder.group({
                  firstCtrl : new FormControl('')
                })
                this.secondFormGroup = this.formBuilder.group({
                  secondCtrl: new FormControl('')
                })
               }

  //isCompany:boolean = false;
  // radioValues:any;
  //constructor(){}

  ngOnInit() {
//  console.log(this.cardContent.el)
//  this.toggle();
this.buffer= this.value + 0.25;
    console.log(this.buffer);
    this.fetchTeamData();

  }

  // toggle(){
  //   this.toggleAccordion();
  //   this.toggleAccordion1();
  //   this.toggleAccordion2();
  //   this.toggleAccordion3();
  // }
  // toggleAccordion(){
    
  //   if(this.accordionExpanded){
  //     this.renderer.setElementStyle(this.cardContent.el, "max-height", "500px");
      
  //     console.log(this.accordionExpanded)
  //   }
  //   else{
  //     this.renderer.setElementStyle(this.cardContent.el, "max-height", "0px");
  //     console.log(this.accordionExpanded)
  //   }
  //   this.accordionExpanded = !this.accordionExpanded;

  // }

  // toggleAccordion1(){
    
  //   if(this.accordionExpanded1){
  //     this.renderer.setElementStyle(this.cardContent1.el, "max-height", "0px");
  //   }
  //   else{
  //     this.renderer.setElementStyle(this.cardContent1.el, "max-height", "500px");
  //   }
  //   this.accordionExpanded1 = !this.accordionExpanded1;

  // }
  // toggleAccordion2(){
    
  //   if(this.accordionExpanded2){
  //     this.renderer.setElementStyle(this.cardContent2.el, "max-height", "0px");
  //   }
  //   else{
  //     this.renderer.setElementStyle(this.cardContent2.el, "max-height", "500px");
  //   }
  //   this.accordionExpanded2 = !this.accordionExpanded2;

  // }
  // toggleAccordion3(){
    
  //   if(this.accordionExpanded3){
  //     this.renderer.setElementStyle(this.cardContent3.el, "max-height", "0px");
  //   }
  //   else{
  //     this.renderer.setElementStyle(this.cardContent3.el, "max-height", "500px");
  //   }
  //   this.accordionExpanded3 = !this.accordionExpanded3;

  // }
  companyOptions(e){
    console.log(e.target.value);
    this.radioValues = e.target.value;
    console.log(this.radioValues);
    if(this.radioValues === 'company'){
    this.isCompany = true;
    }
    else{
      this.isCompany = false;
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

}
