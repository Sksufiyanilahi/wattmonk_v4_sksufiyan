import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.page.html',
    styleUrls: ['./filter.page.scss'],
})

export class FilterPage implements OnInit {

    filterform: FormGroup;
    clientList: Company[];
    requestType: string;
  
    checked: boolean;
    value: string;
    clientId: any;
    id: number;
    clientValue: string;
    isFilterApplied: boolean;
    segmentValue: any;
    designerList: Company[];
    analystsList: Company[];
    assignedId: any;
    selectedDesigner: any;
    selectedAnalyst: any;
    assignedAnalystId: any;
  
    company: Company[];
    companyList: any[];
    checkedIdx=0;
    client_id: any = [];
    client_id_value:any =[];
  allClients: any;
    constructor(public modalController: ModalController,
      private apiservice: ApiService,
      private nav: NavParams,
      private formBuilder: FormBuilder) {
      this.requestType = this.nav.get('requesttype');
      console.log("REQUESTTYPE",this.requestType);
      
      this.id = this.nav.get('memberid');
      this.isFilterApplied = this.nav.get('isFilterApplied');
      // this.companyList = this.company;
  
      // this.clientValue = this.nav.get('value');
      // this.getClients();

  
      // this.segmentValue = this.nav.get('segmentValue');
      // this.selectedDesigner = this.nav.get('assignedId');
      // this.selectedAnalyst = this.nav.get('assignedAnalystId')
      this.filterform = this.formBuilder.group({
        client: new FormControl(''),
        // status:new FormControl(''),
        // designer:new FormControl(''),
        // analyst:new FormControl('')
      })
    }
  
    ngOnInit() {
      this.getClients();
      // if(this.segmentValue=="InDesign"){
      // this.getDesigners();
      // }
      // else if(this.segmentValue=='InReview'){
      //   this.getAnalysts();
      // }
      if (this.isFilterApplied) {
        this.getFilterValue();
      }
    }
  
    getFilterValue() {
      this.filterform.patchValue({
        client: this.id,
        // status:this.clientValue,
        // designer:this.selectedDesigner,
        // analyst:this.selectedAnalyst
      })
    }
  
    dismiss() {
      this.modalController.dismiss();
    }
  
    ionViewDidLeave() {
      this.updateRadioValue();
    }

   
  
  
    // getCompanies() {
    //   this.apiservice.getCompanies(this.requestType).subscribe((res: any) => {
    //     this.companyList = res;
    //     console.log('this.companyList', this.companyList);
  
    //     this.company = res;
    //     this.clientList = this.companyList;
    //   })
    // }

    getClients() {
      this.apiservice.getAllClients().subscribe((res: any) => {
        this.allClients = res.data;
        console.log('this.allClients', this.allClients);
  
        // this.company = res;
        this.clientList = this.allClients;
        
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
  
    clientSelected(event) {
      console.log('selected data', event.detail.value)
      let sclient = event.detail.value
      this.clientId = sclient.id;
      this.value = sclient.attributes.username;
  
  
      this.client_id.push(this.clientId);
      this.client_id_value.push(this.value);
  
  
      console.log(this.clientId);
      console.log(this.value);

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
  
    applyFilter() {
      this.modalController.dismiss({
        'dismissed': true,
        value:this.client_id_value,
        id: this.client_id
        // assignedId:this.assignedId,
        // assignedAnalystId:this.assignedAnalystId
      })
    }
  
    updateRadioValue() {
      this.ngOnInit();
      this.value = null;
      this.clientId = null
      this.filterform.get('client').reset();
      // this.filterform.get('status').reset();
      // this.filterform.get('designer').reset();
      // this.filterform.get('analyst').reset();
    }
  
    viewAll() {
      // debugger;
      this.clientList = [];
      // this.clientList = this.companyList;
      this.clientList.push(this.allClients)
      this.clientList = this.allClients;

    }
  
    filterCompany(event) {
      let searchValue: string = event.detail.value;
      console.log(searchValue);
      
      if (searchValue.length > 0) {
        this.clientList = this.allClients.filter((client: any) => {
          return client.attributes.username.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        });
        console.log('this.clientList', this.clientList);
      } else {
        this.clientList = this.allClients;
        //this.clientList = this.company.slice(0, 10);
      }
    }
  
  }