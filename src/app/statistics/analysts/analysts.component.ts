import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AnalystStatistics } from 'src/app/model/analyststats.model';
import { ScheduleFormEvent } from 'src/app/model/constants';
import { StatisticsDetailsPage } from 'src/app/statistics-details/statistics-details.page';
import { UtilitiesService } from 'src/app/utilities.service';

@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.scss'],
})
export class AnalystsComponent implements OnInit {

  desginForm:FormGroup;

  fieldChangeValue:any;
  sortChangeValue:any;
  isSelected:boolean=false;

  private subscription: Subscription;
  

  //public analystValue:analysts[]=[];
  public analystsList:AnalystStatistics[]=[];
  
  constructor(private service:ApiService,
    private modalController:ModalController,
    private formBuilder:FormBuilder,
    private utilities:UtilitiesService) { 
      this.desginForm = this.formBuilder.group({
        startdate : new FormControl(''),
        enddate : new FormControl(''),
        filterFields : new FormControl(''),
        sort : new FormControl('')
      })
    }

   
  ngOnInit() {
    this.getAnalystsPerformer();
    this.isSelected=true;
    this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SEND_ANALYSTS_VALUE) {
        console.log(event);
        this.fetchFilteredStatisticsAnalysts();
      
      }
    });
  }


  getAnalystsPerformer(){
    const date = new Date();
        const starttime=date.getFullYear()+'-01-01T06:30:00.000Z'.toString();
        const endtime = date.getFullYear()+'-12-31T06:30:00.000Z'.toString();
  
    this.service.getanalystanalytics(starttime, endtime).subscribe(
      response => {
        this.analystsList = response;
        
  
  
      })
  }

  fetchFilteredStatisticsAnalysts(){
    var startDate = new Date(this.desginForm.get('startdate').value);
        startDate.setDate(startDate.getDate()+1);
        console.log("date",startDate)
       var endDate = new Date(this.desginForm.get('enddate').value);
        endDate.setDate(endDate.getDate()+1);
    const starttime = startDate.toISOString();
    const endtime = endDate.toISOString();
  
    this.service.getanalystanalytics(starttime, endtime).subscribe(
      response =>{
        this.analystsList = response;
      /*  this.designers=response;
        this.designers.forEach(element =>{
          this.designerValue.push({designer:element.designer,avgdesigncompletiontime:element.avgdesigncompletiontime,avgreviewfailurecount:element.avgreviewfailurecount,
            latedesignscompleted:element.latedesignscompleted, monthlyrating:element.monthlyrating, ontimedesignscompleted:element.ontimedesignscompleted,totaldesignscreated:element.totaldesignscreated})
        })*/
       // this.changeDetectorRef.detectChanges();
      }
    )
  }

  async details(value){
    let designers = value;
    const modal = await this.modalController.create({
      component: StatisticsDetailsPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
       // id:id
       designersValue:designers
      },
      backdropDismiss:false
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      if(data.data.cancel=='cancel'){
      }//else{
       // this.getDesigns(null)
     // }
  });
    // modal.dismiss(() => {
    //   ;
    //   this.getDesigns(null);
    // });
    return await modal.present();
  }
  
  eventFieldChange(event)
{
  this.isSelected=true;
  this.fieldChangeValue = event.target.value;
  this.eventSortChange();
  console.log("hg",this.isSelected);
  
  
}

eventSortChange()
{
  this.sortChangeValue = this.desginForm.get('sort').value;
  console.log(this.sortChangeValue)
  if(this.sortChangeValue=='lowtohigh'){
  if(this.fieldChangeValue=='Average Completion Time'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => a.avgdesigncompletiontime - b.avgdesigncompletiontime);
   // console.log("Average");
  }
  else if(this.fieldChangeValue=='Average Review Failure'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => a.avgreviewfailurecount-b.avgreviewfailurecount);
    console.log("Average Review");
  }
  else if(this.fieldChangeValue=='Late Designs Completed'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => a.latedesignscompleted-b.latedesignscompleted);
  }
  else if(this.fieldChangeValue=='Monthly Rating'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => a.monthlyrating-b.monthlyrating);
  }
  else if(this.fieldChangeValue=='On Time Design Completed'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => a.ontimedesignscompleted-b.ontimedesignscompleted);
  }
  else if(this.fieldChangeValue=='Total Design Created'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => a.totaldesignscreated-b.totaldesignscreated);
  }
 //this.designersList = this.designersList.sort((a:any,b:any)  => a.i-b.i);
}else if(this.sortChangeValue=='hightolow'){
  if(this.fieldChangeValue=='Average Completion Time'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => b.avgdesigncompletiontime - a.avgdesigncompletiontime);
    console.log("Average");
  }
  else if(this.fieldChangeValue=='Average Review Failure'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => b.avgreviewfailurecount-a.avgreviewfailurecount);
    console.log("Average Review");
  }
  else if(this.fieldChangeValue=='Late Designs Completed'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => b.latedesignscompleted-a.latedesignscompleted);
  }
  else if(this.fieldChangeValue=='Monthly Rating'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => b.monthlyrating-a.monthlyrating);
  }
  else if(this.fieldChangeValue=='On Time Design Completed'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => b.ontimedesignscompleted-a.ontimedesignscompleted);
  }
  else if(this.fieldChangeValue=='Total Design Created'){
    this.analystsList = this.analystsList.sort((a:any,b:any)  => b.totaldesignscreated-a.totaldesignscreated);
  }
}
  
}

sendValue(){
  if(this.desginForm.get('enddate').value > this.desginForm.get('startdate').value){
  this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_ANALYSTS_VALUE);
}
else if(this.desginForm.get('startdate').value == ''){
  this.utilities.errorSnackBar("Please fill Start Date");
}
else if(this.desginForm.get('enddate').value == ''){
  this.utilities.errorSnackBar("Please fill End Date");
}
else{
  this.utilities.errorSnackBar("Invalid End Date");
}
}


}
