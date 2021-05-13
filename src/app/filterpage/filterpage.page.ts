import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Company } from '../model/company.mode';

@Component({
  selector: 'app-filterpage',
  templateUrl: './filterpage.page.html',
  styleUrls: ['./filterpage.page.scss'],
})
export class FilterpagePage implements OnInit {

  checkedIdx=0;
  checkedIdx1=0;
  checkedIdx2=0;
  public form = [
    { val: 'johnDoe@wattmonk.com', isChecked: false },
    { val: 'johnDoe@wattmonk.com', isChecked: false },
    { val: 'johnDoe@wattmonk.com', isChecked: false }
  ];

  public form1 = [
    { val: 'On Hold', isChecked: false },
    { val: 'Rivision', isChecked: false },
    
  ];

  public form3= [
    { val: 'john Doe', isChecked: false },
    { val: 'john gates', isChecked: false },
    { val: 'john Morrison', isChecked: false }
  ];

  filterform:FormGroup;

  clientList:Company;
  requestType:string;
  constructor( public modalController: ModalController,
                private apiservice:ApiService,
                private nav:NavParams,
                private formBuilder:FormBuilder) { 
                  this.requestType= this.nav.get('requesttype');
                  console.log(this.requestType)
                  this.filterform = this.formBuilder.group({
                    client : new FormControl(''),
                    onhold : new FormControl(''),
                    revision : new FormControl('')
                  })
                }

  ngOnInit() {
    this.getCompanies();
  }

  dismiss() {  
    this.modalController.dismiss();  
  }  


  getCompanies(){
    this.apiservice.getCompanies(this.requestType).subscribe((res:any)=>{
      console.log(res);
      this.clientList=res;
      console.log(this.clientList)
    })
  }

  valueChanged(event,value){
    console.log(event);
    console.log(value)
  }

  applyFilter()
  {
    console.log(this.filterform.get('client').value)
    console.log(this.filterform.get('onhold').value)
    console.log(this.filterform.get('revision').value)
  }

}
