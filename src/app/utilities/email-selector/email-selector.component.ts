import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { BaseUrl } from 'src/app/constants'

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
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator } from '@angular/forms';
import { UserSelectorComponent } from '../user-selector/user-selector.component';


@Component({
  selector: 'app-email-selector',
  templateUrl: './email-selector.component.html',
  styleUrls: ['./email-selector.component.scss'],

providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: UserSelectorComponent
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: UserSelectorComponent
  }
]
})
export class EmailSelectorComponent implements ControlValueAccessor, Validator {
  example:any=[];
  teamMember:User[]=[];
  TeamData:any=[];
  headers: HttpHeaders;
  bodyData:any=[];
  selectedEmails:any=[];
  resp:any=[];
  emailArray;
  design : DesignModel;

  constructor(
    private util:UtilitiesService,
    private cdr:ChangeDetectorRef,
    private http: HttpClient,
    private storage : StorageService,
    private api : ApiService
  ){
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

    this.api.getTeamData().subscribe(
      response => {

        this.teamMember=response
        this.example=response
        this.example.push(this.design);
        this.TeamData=this.example
      })
  }
  //onCloseClick(){
   // this.dialogRef.close(this.data);
 // }
 selectAll(event) {
    const checked = event.target.checked;
    this.TeamData.forEach(item => item.checked = checked);
  }

 SendMail(){
  var emails =(document.getElementById("inputemails") as HTMLInputElement).value
  this.emailArray = emails.split(',')
  this.emailArray.forEach(element =>{
    this.selectedEmails.push(element)
  })

  this.bodyData= this.TeamData.filter(item=> item.checked);
    this.bodyData.forEach(element => {

      this.selectedEmails.push(element.email)
    });
    this.selectedEmails.push()

  let body= {emails:this.selectedEmails,
  id:this.design}
   return this.http.post(BaseUrl+"designs/send-prelim-design",
   body,
   {
    headers:this.headers
   }).subscribe((response)=>{
     this.resp=response
     if(this.resp.status=='success'){
        this.util.showSnackBar("Email Sent  Successfully");
       // this.dialogRef.close( );
     }

   },
   error => {

    this.util.errorSnackBar(
      "Something went wrong. Please try again."
    );

  })

 }

}
