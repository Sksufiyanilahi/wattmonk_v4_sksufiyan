import { Component, OnInit } from '@angular/core';
import { BaseUrl } from 'src/app/contants' 

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { UtilitiesService } from 'src/app/utilities.service';
import { StorageService } from 'src/app/storage.service';
import { ApiService } from 'src/app/api.service';
import { User  } from 'src/app/model/user.model';
import { DesignModel  } from 'src/app/model/design.model';
import { ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-email-model',
  templateUrl: './email-model.page.html',
  styleUrls: ['./email-model.page.scss'],
})
export class EmailModelPage implements OnInit {

  example:any=[];
  teamMember:User[]=[];
  TeamData:any=[];
  headers: HttpHeaders;
  bodyData:any=[];
  selectedEmails:any=[];
  resp:any=[];
  emailArray;
  design : DesignModel;
  id:any;
  data:any;
  emails:any='';
  checkedEmailIds: boolean=false;
  
  constructor(
    private util:UtilitiesService,
    private http: HttpClient,
    private storage : StorageService,
    private api : ApiService,
    private modalctrl: ModalController,
    private nav:NavParams
  ){
    this.getTeamData();
  }
  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    throw new Error("Method not implemented.");
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
    this.id= this.nav.get('id');
    this.data=this.nav.get('designData');
    console.log("hello",this.data);
   
  }

  getTeamData(){
    this.util.showLoading('Loading emails').then(()=>{

      this.api.getTeamData().subscribe(
        response => {
          this.util.hideLoading().then(()=>{
            this.teamMember=response;
            this.example=response;
            this.TeamData=this.example  ;
          })
        })
    })
  }
  //onCloseClick(){
   // this.dialogRef.close(this.data);
 // }
 selectAll(event) {
    const Checked = event.target.checked;
    this.TeamData.forEach(item => item.Checked = Checked);
    console.log(this.TeamData.Checked);
    
  }

  checkedMails(event){
    const Checked = event.target.checked;
    this.checkedEmailIds = event.target.checked;
  
    
  }
  
 SendMail(){
  var emails =(document.getElementById("inputemails") as HTMLInputElement).value
  this.emailArray = emails.split(',')
  this.emailArray.forEach(element =>{
    this.selectedEmails.push(element)
  })

  this.bodyData= this.TeamData.filter(item=> item.Checked);
    this.bodyData.forEach(element => {
     
      this.selectedEmails.push(element.email)
    });
  
    console.log(this.selectedEmails)
    // if(this.selectedEmails.length > 1){
  let body= {emails:this.selectedEmails,
  id:this.id}
  if(this.data.requesttype==='prelim'){
  this.api.sendPrelimEmails(body).subscribe((response)=>{
     this.resp=response
     if(this.resp.status=='success'){
        this.util.showSnackBar("Email Sent  Successfully");
        this.modalctrl.dismiss({
          'dismissed': true
        });
       // this.dialogRef.close( );
     }
     this.selectedEmails=[]; 
   },
   error => {
   
    this.util.errorSnackBar(
      "Something went wrong. Please try again."
    );
    this.selectedEmails=[];
      }
      )
    } 
    else{
      this.api.sendPermitEmails(body).subscribe((response)=>{
        this.resp=response
        if(this.resp.status=='success'){
           this.util.showSnackBar("Email Sent  Successfully");
           this.modalctrl.dismiss({
             'dismissed': true
           });
          // this.dialogRef.close( );
        }
        this.selectedEmails=[]; 
      },
      error => {
      
       this.util.errorSnackBar(
         "Something went wrong. Please try again."
       );
       this.selectedEmails=[];
         }
         )
    }
  // }
  //   else{
  //     this.util.errorSnackBar("Please Select the Email");
  //   }
   
      
  }


 cancel(){
  this.modalctrl.dismiss({
    'dismissed': true,
    cancel:'cancel'
  });
}

checkedData(event){
console.log(event.target.checked);

}

}
