import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StorageService } from 'src/app/storage.service';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Router } from '@angular/router';
import { ScheduleFormEvent } from 'src/app/model/constants';
import { DesignStatistic } from 'src/app/model/designstats.model';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss'],
})
export class DesignsComponent implements OnInit {

  desginForm:FormGroup;
  user:User;
  statistic:DesignStatistic[]=[];
  prelimcount:any=[];
  permitCount:any=[];
  maxDate:Date;
  clientcompany:any=[];
  myDate:string;
  mydates:string;
  dateChangeValue:any;
  companyChangeValue:any;

  private subscription: Subscription;

  companyList: string[]=this.clientcompany

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ticks: {
      beginAtZero:true,
      stepSize:1
   }}] },
    plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
      font: {
        size: 10,
      }
    }
  } 
  };
  public barChartLabels: Label[] = ['New', 'On Hold', 'Accepted', 'In Designing', 'Completed', 'Review Failed', 'Review Passed','Delivered','Overdue'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];//pluginDataLabels];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'lightpink',
    },
  ];
  public barChartData: ChartDataSets[] = [
    { data: this.prelimcount, label: 'Prelim Design'},
     {data: this.permitCount, label: 'Permit Design' }
    //{ data: [12,23,97,102,34,78,23,54,6], label: 'Permit Design' }
  ];
 

  constructor(private storage:StorageService,
    private service:ApiService,
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private datePicker: DatePicker,
    public route: Router) {
      this.desginForm = this.formBuilder.group({
        company : new FormControl(''),
        filterDates : new FormControl('current'),
        datetime: new FormControl(new Date().getTime()),
        startdate :new FormControl("", [Validators.required]),
        enddate : new FormControl("", [Validators.required])
      });
     // this.startdate = new Date(this.myDate);
     // this.enddate = new Date(this.mydates).toISOString();
     

      this.maxDate = new Date();
     }

  ngOnInit() {

    this.user = this.storage.getUser();
    this.getStatistic();
    this.fetchClientSuperamin();
    //this.getFilteredStatistic();
    
    this.subscription = this.utilities.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SEND_VALUE) {
        this.getFilteredStatistic();
      
      }
    });

  }

  
  getStatistic(){
    
    var starttime=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+'01T06:30:00.000Z'
    var endtime=new Date()
    const data= {
      "starttime" : starttime.toString(),
      "endtime" : endtime.toISOString(),
     "creatorparentid": null
    }
  this.service.getStatistic(data).subscribe(
    response =>{
      this.statistic=response;
      this.statistic.forEach(element =>{
        this.prelimcount.push(element.prelim);
        this.permitCount.push(element.permit);
      })
    }
  )
  }

  getFilteredStatistic(){
    //if(this.desginForm.status === 'VALID'){
    var starttime;
    var endtime;
    var text = this.desginForm.get('filterDates').value;
    
    
    //var nn=(this.newDate)+"-"+'01T06:30:00.000Z';
    //var rr = (this.newdates)+"-"+'31T06:30:00.000Z';
    
   /* switch(this.desginForm.get('filterDates').value)
   
    {
      case 'Current Month':
        var date=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+'01T06:30:00.000Z'
        starttime=date.toString();
        endtime=new Date().toISOString();
        break;
      case 'Previous Month' :
        var date=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+'01T06:30:00.000Z'
        starttime=date.toString();
       // endtime=new Date().toISOString();
        endtime=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+'31T06:30:00.000Z'
        break;
      case 'Previous Quater' :
        var date=new Date().getFullYear()+"-"+(new Date().getMonth()-2)+"-"+'01T06:30:00.000Z'
        starttime=date.toString();
        //endtime=new Date().toISOString();
        endtime=new Date().getFullYear()+"-"+(new Date().getMonth()-3)+"-"+'31T06:30:00.000Z'
        break;
     // case 'Customs Dates':
     //   starttime=this.startDate.value.toISOString();
     //   endtime=this.endDate.value.toISOString();
     //   break;   
    }*/
    if(text=='current'){
      var date=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+'01T06:30:00.000Z'
        starttime=date.toString();
        endtime=new Date().toISOString();
    }
    else if(text=='previous'){
      var date=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+'01T06:30:00.000Z'
        starttime=date.toString();
        endtime=new Date().getFullYear()+"-"+(new Date().getMonth())+"-"+'31T06:30:00.000Z'
    }
    else if(text == 'quarter'){
      var date=new Date().getFullYear()+"-"+(new Date().getMonth()-2)+"-"+'01T06:30:00.000Z'
      starttime=date.toString();
      endtime=new Date().getFullYear()+"-"+(new Date().getMonth()-3)+"-"+'31T06:30:00.000Z'
    }
    else if(text == 'customs'){
      var startDate = new Date(this.desginForm.get('startdate').value);
      startDate.setDate(startDate.getDate()+1);
     var endDate = new Date(this.desginForm.get('enddate').value);
      endDate.setDate(endDate.getDate()+1);
      
      starttime = startDate.toISOString();
      endtime = endDate.toISOString();
      
    }
    this.prelimcount.length=0;
    this.permitCount.length=0;
    const data= {
      "starttime" : starttime,
      "endtime" : endtime,
//"creatorparentid": this.user.id
      "creatorparentid": this.desginForm.get('company').value.id
}
  this.service.getStatistic(data).subscribe(
    response =>{
      this.statistic=response;
      this.statistic.forEach(element =>{
        this.prelimcount.push(element.prelim)
        this.permitCount.push(element.permit)
      })
     // this.changeDetectorRef.detectChanges();
    }
  )
    //}
    //else{
    //  if(this.desginForm.value.startdate == ''){
    //      this.utilities.errorSnackBar("Please fill Start Date");
    //  }
    //  else if(this.desginForm.value.enddate == ''){
   //     this.utilities.errorSnackBar("Please fill End Date");
   // }
    //}
}

  fetchClientSuperamin() {
    this.service.getClientSuperadmin().subscribe(
      (response) => {
       response.forEach(element =>{
         if(element.company!=null){
          this.clientcompany.push({id:element.id,company:element.company })
         }
         
         if(element.company==null){
          this.clientcompany.push({id:element.id,company:element.email})
         }
       })
      },
      error => {
       console.log(error)
      }
    );
  }

  sendValue(){
    if(this.desginForm.status=='VALID'){
      if(this.desginForm.get('enddate').value > this.desginForm.get('startdate').value)
      {
    this.utilities.setScheduleFormEvent(ScheduleFormEvent.SEND_VALUE);
      }
      else{
        this.utilities.errorSnackBar("Invalid End Date")
      }
    }else{
      if(this.desginForm.value.startdate == ''){
             this.utilities.errorSnackBar("Please fill Start Date");
          }
          else if(this.desginForm.value.enddate == ''){
           this.utilities.errorSnackBar("Please fill End Date");
    }
  }
}

    

  eventDatesChange(e){
    this.dateChangeValue = e.target.value;
  //  console.log(this.showValue);
    if(this.dateChangeValue!='customs'){
    this.getFilteredStatistic();
    }
    
  }

  eventCompanyChange(e)
  {
    this.companyChangeValue = e.target.value;
   // console.log(this.value);
    this.getFilteredStatistic();
  }


}
