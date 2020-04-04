import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AssigneeModel, LIST_OF_ASSIGNEES } from 'src/app/model/assignee.model';
import { SolarMake, SolarMakeData } from 'src/app/model/solar-make.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {

  desginForm: FormGroup;
  knobValues: '';
  minRange = 100;
  maxRange = 10000;

  listOfAssignees: AssigneeModel[] = [];
  listOfSolarMAke: SolarMake[] = [];
  itemsolar: SolarMake;
  isItemAvailable: any;
  itemsSolarMake = [];
  

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utils: UtilitiesService
  ) {
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      comment: new FormControl('')
    });
    this.listOfAssignees = LIST_OF_ASSIGNEES;
    this.itemsolar = new SolarMake();
    this.isItemAvailable = false; 
    this.getSolar();
  }

  ngOnInit() { }

  // initializeItems(){
  //   this.items = ["Ram","gopi", "dravid"];
  //   }

    getSolar() {
          this.apiService.getSolarMake().subscribe(response => {
            console.log(response);
            this.listOfSolarMAke = response;
            this.listOfSolarMAke.forEach((value) => {
              this.itemsolar = value
             this.itemsSolarMake.push(this.itemsolar.name);
            }); 
          }, responseError => {
            const error: ErrorModel = responseError.error;
              this.utils.showAlert(error.message[0].messages[0].message);
          });
  
      } 
   
    getItems(ev: any) {
    if( ev.target.value != ''){
    const val = ev.target.value;
    if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.itemsSolarMake =  this.itemsSolarMake.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
    }
    }else{
      this.isItemAvailable = false;
      this.itemsSolarMake = []; 
    }
    
    }

}
