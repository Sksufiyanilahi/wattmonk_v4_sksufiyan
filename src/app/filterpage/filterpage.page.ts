import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Company } from '../model/company.model';

@Component({
  selector: 'app-filterpage',
  templateUrl: './filterpage.page.html',
  styleUrls: ['./filterpage.page.scss'],
})
export class FilterpagePage implements OnInit {

  filterform:FormGroup;
  clientList:Company[];
  requestType:string;

  checked:boolean;
  value:string;
  clientId: any;
  id:number;
  clientValue:string;
  isFilterApplied:boolean;
  segmentValue: any;
  designerList:Company[];
  analystsList:Company[];
  assignedId: any;
  selectedDesigner: any;
  selectedAnalyst: any;
  assignedAnalystId: any;

  company:Company[];
  companyList:any[];

  constructor( public modalController: ModalController,
                private apiservice:ApiService,
                private nav:NavParams,
                private formBuilder:FormBuilder) {
                  this.requestType= this.nav.get('requesttype');
                  this.id= this.nav.get('memberid');
                  this.isFilterApplied = this.nav.get('isFilterApplied');
                  // this.companyList = this.company;
                  
                  // this.clientValue = this.nav.get('value');
                  
                  // this.segmentValue = this.nav.get('segmentValue');
                  // this.selectedDesigner = this.nav.get('assignedId');
                  // this.selectedAnalyst = this.nav.get('assignedAnalystId')
                  this.filterform = this.formBuilder.group({
                    client:new FormControl(''),
                    // status:new FormControl(''),
                    // designer:new FormControl(''),
                    // analyst:new FormControl('')
                  })
                }

  ngOnInit() {
    this.getCompanies();
    // if(this.segmentValue=="InDesign"){
    // this.getDesigners();
    // }
    // else if(this.segmentValue=='InReview'){
    //   this.getAnalysts();
    // }
    if(this.isFilterApplied)
    {
      this.getFilterValue();
    }
  }

  getFilterValue() {
    this.filterform.patchValue({
      client:this.id,
      // status:this.clientValue,
      // designer:this.selectedDesigner,
      // analyst:this.selectedAnalyst
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidLeave()
  {
    this.updateRadioValue();
  }


  getCompanies(){
    this.apiservice.getCompanies(this.requestType).subscribe((res:any)=>{
      this.companyList=res;
      this.company= res;
      this.clientList = this.company.slice(0,10);
    })
  }

  // getDesigners(){
  //   this.apiservice.getDesignersForFilter(this.requestType).subscribe((res:any)=>{
  //     console.log(res);
  //     this.designerList = res;
  //   })
  // }

  // getAnalysts(){
  //   this.apiservice.getAnalystsForFilter(this.requestType).subscribe((res:any)=>{
  //     console.log(res);
  //     this.analystsList = res;
  //   })
  // }

  // valueChanged(event){
  //   console.log(event);
  //   // console.log(value)
  //   this.value = event.detail.value;
  //   console.log(this.value)
  //   // this.value = value;
  // }

  clientSelected(event)
  {
    console.log(event.detail.value)
    this.clientId = event.detail.value;
  }

  // designerSelected(event)
  // {
  //   console.log(event.detail.value)
  //   this.assignedId = event.detail.value;
  // }

  // analystSelected(event)
  // {
  //   this.assignedAnalystId = event.detail.value;
  // }

  applyFilter()
  {
    this.modalController.dismiss({
      'dismissed':true,
      // value:this.value,
      id:this.clientId
      // assignedId:this.assignedId,
      // assignedAnalystId:this.assignedAnalystId
     })
  }

  updateRadioValue()
  {
    this.value = null;
    this.clientId = null
    this.filterform.get('client').reset();
    // this.filterform.get('status').reset();
    // this.filterform.get('designer').reset();
    // this.filterform.get('analyst').reset();
  }

  viewAll()
  {
    // debugger;
    this.clientList=[];
    this.clientList = this.companyList;
  }

}
