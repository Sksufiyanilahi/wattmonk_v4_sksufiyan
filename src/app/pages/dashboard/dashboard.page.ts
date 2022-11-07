import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api/api.service';
import { ROLES } from 'src/app/services/constants';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Chart,
  //  LineController,
  // LineElement,
  // PointElement,
  // LinearScale,
  // CategoryScale,
  // Title,
  // BarElement, 
} from 'chart.js';
  // Chart.register(
  //   LineController,
  //   LineElement,
  //   BarElement,
  //   PointElement,
  //   LinearScale,
  //   CategoryScale,
  //   Title,
  // )
  import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas', { static: false }) private lineCanvas: ElementRef;
  @ViewChild('doughnutCanvasTR') private doughnutCanvasTR: ElementRef;
  @ViewChild('barCanvasBig') private barCanvasBig: ElementRef;
  @ViewChild('doughnutCanvasState') private doughnutCanvasState: ElementRef;



  salesproposalcurrent: any;
  permitcurrent: any;
  pestampcurrent: any;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  doughnutChartTR: any;
  barChartbig: any;
  doughnutChartState: any;
  demo = [1, 4, 5, 3, 1, 4, 5, 1];
  waitingforacceptance: any;
  unassigned: any;
  onHold: any;
  revision: any;
  userId: any;
  count: any = {
    isinrevisionstatecount: '',
    putonhold: '',
    unassiigned: '',
    waitingforacceptance: ''
  };
  userData: any;
  public unreadCount: any;
  current = 5
  max = 24;
  stroke = 20;
  radius = 125;
  semicircle = false;
  rounded = true;
  responsive = true;
  clockwise = true;
  color = '#fff';
  background = '#eaeaea';
  duration = 800;
  animation = 'easeOutCubic';
  animationDelay = 0;

  gradient = '#fff';
  realCurrent = 0;
  services: any;
  spermit: any;
  ssalesproposal: any;
  spestamp: any;
  spermitValues: any[];
  stateReport: string[];
  ssalesproposalValue: any[];
  spestampValue: any[];
  servicespie: any;
  countkeyspie: string[];
  countvaluepie: any[];
  totalcountpie: number;
  username: any;
  userlogo: any;

  linesekeleton: boolean = false;
 StateDonutSkeleton: boolean = false ;

  TRvalue: any;
  TRarray: any[];
  TRarraycount: any[];
  TRbararray: any[];
  TRbararraycount: any[];
  label1: any;
  label2: any;
  isTR: boolean = false
  statenamelength: any;
  arrayTR = [];
  label3: any;
  count1: any;
  count2: any;
  count3: any;
  label4: any;
  label5: any;
  label6: any;
  label7: any;
  count4: any;
  count5: any;
  count6: any;
  count7: any;
  filter = 'pestamp';
  isfilter = "week"
  states: any;
  statecount: any[];
  statename: any[];
  isState = false
  totalCount: number;
  zerothkey: string;
  zerothcount: any;
  stateKeys: string[];
  statecounts: any[];
  statecountpie: any;
  zerothkeylabels: string[];
  zerothKeycounts: any[];
  zerothstatecountpie: number;
  iszerothvalue : boolean = false
  spermitKeys: any[];
  newArr :any [];
  public dateExample;
  ssalesproposalKeys: any[];
  spesatampKeys: any[];
  servicetitle="Pe Stamp";
  servicesLineGraph: any = {
    lineChartData: [],
    view: [400, 380],
    xAxis: true,
    yAxis: true,
    timeline: true,
    colorScheme: {
        domain: ['#FBB814', '#78C371', '#6DD3FE']
    }
}
  totalProjects: any;
  onhold: string;
  Delivered: any;
  countkeypieArr: any[];
  tasktitle= 'Pe stamp';
  acceptedCount: any;
  notacceptedCount: number;
  view: any;
  Tr: Object;
  zeropie: any;
  // userPrelimModuleName = '-';
  // userPermitModuleName = '-';
  // userPestampModuleName = '-';
  
  // servicesGraphDetails = {graphdata: [{name: this.userPrelimModuleName, date: []},{name:this.userPermitModuleName, date: []},{name:this.userPestampModuleName, date: []}], counts:[{name:'On Hold',value: 0},{name:'In Revision',value: 0},{name:'Delivered',value: 0}]};

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private storage: StorageService,
    private mixpanelService: MixpanelService,
    public utilities: UtilitiesService,
    private datastorage: Storage,
    public router: Router,
    private loadingController: LoadingController
  ) {
    this.view = [innerWidth / 1.3, 400];
  }

  ngOnInit() {
    // var dates = ["2019-01-01", "2019-01-02", "2019-01-03"];

    // Object.values(this.newArr).map() = moment().format('DD MMM'); 
    // this.dateExample = moment(this.newArr).format('DD MMM');
        //  datetime = this.dateExample;
     
        
        // console.log(formate, "is formatted original datetime")
    this.userId = this.storage.getUserID();
    this.userData = this.storage.getUser();
    this.username = this.userData.firstname
    // + " " + this.userData.lastname
    console.log(this.username)
    this.userlogo = this.userData.logo
    console.log(this.userlogo)
    // this.getServices();

    // this.fetchsurveyprocessjsons(); // comment on 20220805
    //  let data = this.route.snapshot.data.userdata; // get data from resolver
    //this.getCount();
    this.mixpanelService.track('DASHBOARD_PAGE_OPEN', {
    });


    // this.getTaskReport();
    // this.getStateReport();
    // this.getProductionTimeReport();
    // console.log(this.spermitValues)
    // this.getServices()
    // console.log(this.spermitValues)
   this.apiService.getServices(this.filter,this.isfilter).subscribe((res=>{
    console.log(res)
    this.servicesLineGraph.lineChartData = [res['dataa'].graphdata?.prelim, res['dataa'].graphdata?.permit, res['dataa'].graphdata?.pestamp];
    console.log("this.servicesLineGraph.lineChartData",this.servicesLineGraph.lineChartData);
    
    let totalPrelim = 0; // For finding the total number of prelim count in res
    let totalPermit = 0; // For finding the total number of permit count in res
    let totalPestamp = 0; // For finding the total number of pestamp count in res
    
    res['dataa'].graphdata.prelim.series.map(item => {totalPrelim = totalPrelim + Number(item.value)});
    res['dataa'].graphdata.permit.series.map(item => {totalPermit = totalPermit + Number(item.value)});
    res['dataa'].graphdata.pestamp.series.map(item => {totalPestamp = totalPestamp + Number(item.value)});
    
    this.totalProjects = totalPermit + totalPestamp + totalPrelim;
    console.log("this is total projects",this.totalProjects)
   }))
    this.servicesLineGraph.view = [350, 400];


    // demoData.dataa.graphdata.prelim.name = 'Prelim'; //setting dynamic name of Prelim module in graph
    // demoData.dataa.graphdata.permit.name = 'Permit'; //setting dynamic name of Permit module in graph
    // demoData.dataa.graphdata.pestamp.name = 'PE Stamp'; //setting dynamic name of Pestamp module in graph

    // this.servicesLineGraph.lineChartData = [demoData.dataa.graphdata?.prelim, demoData.dataa.graphdata?.permit, demoData.dataa.graphdata?.pestamp];  

    console.log('this.servicesLineGraph', this.servicesLineGraph);
// }, 2000);
   
  }

  ngAfterViewInit() {
    // this.getServices();
    // this.barChartMethod();
    // this.doughnutChartMethod();
    // this.lineChartMethod();
    // this.TRdougnutChartMethod();
    // this.dougnutChartMethodState();

    // this.barChartMethodBig();
    // console.log(this.spermitValues)

  }



  ionViewWillEnter() {
   this.getZerothValues();
    this.getProductionTimeReport();
    // this.dougnutChartMethodState(); 
    this.getServices(this.filter, this.isfilter);
    this.getTaskReport(this.filter, this.isfilter);
    this.getStateReport(this.isfilter);
    this.dougnutChartMethodState(this.zerothkeylabels,this.zerothKeycounts);

  }
  // ionViewDidLoad(){
  // }

  ionViewDidEnter() {
    console.log("in ionViewDidEnter")
    console.log(this.spermitValues)

    this.getCount();
    this.apiService.emitUserNameAndRole(this.userData);


  }

  getCount() {
    this.apiService.getcounts(this.userId).subscribe(res => {
      this.count = res;
    });
    this.apiService.getCountOfUnreadNotifications().subscribe((count) => {
      this.unreadCount = count;
    });
  }

  fetchsurveyprocessjsons() {
    this.datastorage.get('pvsurveyjson').then((data) => {
      console.log('fetchsurveyprocessjsons data', data);
      if (!data) {
        this.apiService.fetchJSON(this.storage.getParentId(), 'pv').subscribe((response: any) => {
          console.log('fetchJSON response', response);
          this.datastorage.set('pvsurveyjson', response);
        });
      }
    });
  }

  setzero() {
    this.unreadCount = 0;
  }

  searchbar() {
    this.router.navigate(['/search-bar']);
  }

  sliderConfig = {
    slidesPerView: 2.3,
    // spaceBetween: 1,
    // centeredSlides: true
  };

  sliderConfig1 = {
   
  };

  // lineChartMethod(spermitvalues, salesproposalvalues, pesatampvalues,newAllweeksArray) {
      
  //   this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  //     type: 'line',
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //     },
  //     data: {
  //       labels: newAllweeksArray,
  //       datasets: [
  //         {
  //           label: 'Sales proposal',
  //           fill: false,
  //           // lineTension: 0.1,
  //           backgroundColor: '#FBB814',
  //           borderColor: '#FBB814',
  //           borderCapStyle: 'butt',
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: 'miter',
  //           pointBorderColor: 'rgba(75,192,192,1)',
  //           pointBackgroundColor: '#fff',
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //           pointHoverBorderColor: 'rgba(220,220,220,1)',
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 10,
  //           data: salesproposalvalues,
  //           spanGaps: false,
  //         },
  //         {
  //           label: 'PE Stamps',
  //           fill: false,
  //           // lineTension: 0.1,
  //           backgroundColor: '#6DD3FE',
  //           borderColor: '#6DD3FE',
  //           borderCapStyle: 'butt',
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: 'miter',
  //           pointBorderColor: 'rgba(75,192,198,9)',
  //           pointBackgroundColor: '#fff',
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //           pointHoverBorderColor: 'rgba(220,220,220,1)',
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 5,
  //           data: pesatampvalues,
  //           spanGaps: false,
  //         },
  //         {
  //           label: 'Permit',
  //           fill: false,
  //           // lineTension: 0.1,
  //           backgroundColor: '#78C371',
  //           borderColor: '#78C371',
  //           borderCapStyle: 'butt',
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: 'miter',
  //           pointBorderColor: '#78C371',
  //           pointBackgroundColor: '#fff',
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //           pointHoverBorderColor: 'rgba(220,220,220,1)',
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 10,
  //           data: spermitvalues,
  //           spanGaps: false,
  //         }
  //       ]
  //     }
  //   });
  // }


  doughnutChartMethod(countkey, countvalue) {

console.log(countkey,"countkey");
// if (condition) {
  
// }

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',

      options: {
        cutout: 80,

      },
      data: {
        labels: countkey,

        datasets: [{
          label: 'Overall Completion',

          data: countvalue,
          offset: 0,



          backgroundColor: [
            '#FBB814',
            '#EF7734',
            '#61B05A',

          ],
          borderWidth: 0,
          borderJoinStyle: 'round',
          borderAlign: 'center',
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',

          ]
        }]
      }

    });
  }

  TRdougnutChartMethod(TRdata, TRcount) {


    console.log("in donit chart method");
    console.log(this.doughnutCanvasTR);


    this.doughnutChartTR = new Chart(this.doughnutCanvasTR.nativeElement, {
      type: 'doughnut',

      options: {
        cutout: 80,

      },
      data: {
        labels: TRdata,

        datasets: [{
          label: 'Overall Completion',

          data: TRcount,
          offset: 0,



          backgroundColor: [
            '#FDD42F',
            '#61B05A',
            '#6DD3FE',

          ],
          borderWidth: 0,
          borderJoinStyle: 'round',
          borderAlign: 'center',
          hoverBackgroundColor: [
            '#FDD42F',
            '#61B05A',
            '#6DD3FE',

          ]
        }]
      }

    });


  }

  dougnutChartMethodState(stateName,stateCount){
  console.log(stateName)
  console.log(stateCount)
    this.doughnutChartState = new Chart(this.doughnutCanvasState.nativeElement, {
      type: 'doughnut',
      
      options:{
        cutout: 90,
        
      },
      data: {
        labels: stateName,
        
        datasets: [{
          label: 'Overall Completion',
          
          data: stateCount,
          offset:0,
          
          
          
          backgroundColor: [
            '#FBB814',
            '#78C371',
            '#6DD3FE',
       
          ],
          borderWidth:0,
          borderJoinStyle:'round',
          borderAlign:'center',
          hoverBackgroundColor: [
            '#FBB814',
            '#78C371',
            '#6DD3FE',
           
          ]
        }]
      }
      
    });
  }
  barChartMethodBig(TRbardata, TRbararraycount) {

    this.barChartbig = new Chart(this.barCanvasBig.nativeElement, {
      type: 'bar',
      data: {
        // labels: ['New', 'OnHold', 'Revision', 'Delivered'],
        labels: TRbardata,

        datasets: [{
          label: 'Count',
          data: TRbararraycount,
          
          backgroundColor: [
            'rgba(253, 207, 39, 100)',
          ],
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(253, 207, 39, 100)',
          hoverBorderColor: 'rgba(253, 207, 39, 100)',
          borderColor: ['rgba(253, 207, 39, 100)',],
          borderWidth: 1
        }]

      },
      options: {
        
        responsive: true,
        maintainAspectRatio: false,
       
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#AFAFAF',font: {
              size: 12,
              family:'Lexend'
              
          }}
          
          },
          x: {
            ticks: { color: '#AFAFAF',font: {
              size: 12,
              family:'Lexend'
              
          } }
          
          }
          
        },
        
        
      }
    });

  }
  barChartMethod(statename,statecount){
    console.log(statename);
    console.log(this.barCanvas);
    
  
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
    
      data: {
        labels: statename,
        datasets: [{
          label: 'Count',
          data: statecount,
          backgroundColor: [
            'rgba(253, 207, 39, 100)',
          ],
          barThickness: 15,
          borderRadius:4,
          hoverBackgroundColor:  'rgba(253, 207, 39, 100)',
          hoverBorderColor:  'rgba(253, 207, 39, 100)',
          borderColor: ['rgba(253, 207, 39, 100)',],
          borderWidth: 1
        }]
  
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#AFAFAF',font: {
              size: 12,
              family:'Lexend',

              
          }}
          
          },
          x: {
            ticks: { color: '#AFAFAF',font: {
              size: 12,
              family:'Lexend',

              
          } }
          
          }
          
        },
      }
      
    });
  
  
  }
  getOverlayStyle() {
    const isSemi = this.semicircle;
    const transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      top: isSemi ? 'auto' : '50%',
      bottom: isSemi ? '5%' : 'auto',
      left: '50%',
      transform,
      fontSize: this.radius / 3.5 + 'px',
    };
  }


  async getTaskReport(filter, isfilter) {
    // const loading = await this.loadingController.create({
    //   message: 'Please Wait',
    //   translucent: true,
    // });
    // await loading.present();
    this.apiService.getDesignTaskReport(filter, isfilter).subscribe(res => {

      console.log(res, "is task rep");

      if (filter == 'pestamp') {
        this.label1 = 'Structural';
        this.label2 = 'Electrical';
        this.label3 = 'Both';
      }
      else if (filter == 'permit') {
        this.label1 = 'Residential';
        this.label2 = 'Commercial';
        this.label3 = 'Both';
      }
      else if (filter == 'prelim') {
        this.label1 = 'Sales Proposal';
        this.label2 = 'Site Assessment';
        this.label3 = 'Both';
      }


      if (filter == 'pestamp') {
        this.count1 = res['total_structural'];
        this.count2 = res['total_electrical'];
        this.count3 = res['total_structural'] + res['total_electrical'];

        this.acceptedCount =  +res['electrical_accepted'] + +res['structural_accepted'];
        console.log("Accepted Count is ", this.acceptedCount);

        this.notacceptedCount =  +res['electrical_notaccepted'] + +res['structural_notaccepted'];
        console.log("Not Accepted Count is ", this.notacceptedCount);
        
        this.totalCount = +res['electrical_accepted'] + +res['electrical_notaccepted'] + +res['structural_accepted'] + +res['structural_notaccepted']
  console.log("prestamp status count",this.totalCount);
      }


      else if (filter == 'permit') {
        this.count1 = res['total_residential'];
        this.count2 = res['total_commercial'];
        this.count3 = res['total_residential'] + res['total_commercial'];

        this.acceptedCount =  +res['commercial_accepted'] + +res['residentail_accepted'];
        console.log("Accepted Count is ", this.acceptedCount);

        this.notacceptedCount =  +res['commercial_notaccepted'] + +res['residential_notaccepted'];
        console.log("Not Accepted Count is ", this.notacceptedCount);

        this.totalCount = +res['commercial_accepted'] + +res['commercial_notaccepted'] + +res['residentail_accepted'] + +res['residential_notaccepted']
  console.log("permit status count",this.totalCount);
      }


      else if (filter == 'prelim') {
        this.count1 = res['total_proposal'];
        this.count2 = res['total_assessment'];
        this.count3 = res['total_proposal'] + res['total_assessment'];

        this.acceptedCount =  +res['assessment_accepted'] + +res['proposal_accepted'];
        console.log("Accepted Count is ", this.acceptedCount);

        this.notacceptedCount =  +res['assessment_notaccepted'] + +res['proposal_notaccepted'];
        console.log("Not Accepted Count is ", this.notacceptedCount);


        this.totalCount = +res['assessment_accepted'] + +res['assessment_notaccepted'] + +res['proposal_accepted'] + +res['proposal_notaccepted']
  console.log("permit status count",this.totalCount);
      }

      

      this.TRarray = []
      this.TRarray.push(this.label1, this.label2, this.label3);
      this.TRarraycount = [this.count1, this.count2, this.count3]


      console.log(this.TRarray);
      console.log(this.TRarraycount);


      if (filter == 'pestamp' && isfilter == 'week') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';

      }
      else if (filter == 'permit' && isfilter == 'week') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';
      }
      else if (filter == 'prelim' && isfilter == 'week') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';
      }



      if (filter == 'pestamp' && isfilter == 'month') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';

      }
      else if (filter == 'permit' && isfilter == 'month') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';
      }
      else if (filter == 'prelim' && isfilter == 'month') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';
      }

      if (filter == 'pestamp' && isfilter == 'year') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';

      }
      else if (filter == 'permit' && isfilter == 'year') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';
      }
      else if (filter == 'prelim' && isfilter == 'year') {
        this.label4 = 'New';
        this.label5 = 'On Hold';
        this.label6 = 'Revision';
        this.label7 = 'Delivered';
      }


      if (filter == 'pestamp' && isfilter == 'week') {
        this.count4 = res['pestampnewdesign'];
        this.count5 = res['pestamponhold'];
        this.count6 = res['pestamprevision'];
        this.count7 = res['pestampdelivered'];
      }
      else if (filter == 'permit' && isfilter == 'week') {
        this.count4 = res['permitnewdesign'];
        this.count5 = res['permitonhold'];
        this.count6 = res['permitrevision'];
        this.count7 = res['permitdelivered'];

      }
      else if (filter == 'prelim' && isfilter == 'week') {
        this.count4 = res['prelimnewdesign'];
        this.count5 = res['prelimonhold'];
        this.count6 = res['prelimrevision'];
        this.count7 = res['prelimdelivered'];
      }

      if (filter == 'pestamp' && isfilter == 'month') {
        this.count4 = res['pestampnewdesign'];
        this.count5 = res['pestamponhold'];
        this.count6 = res['pestamprevision'];
        this.count7 = res['pestampdelivered'];
      }
      else if (filter == 'permit' && isfilter == 'month') {
        this.count4 = res['permitnewdesign'];
        this.count5 = res['permitonhold'];
        this.count6 = res['permitrevision'];
        this.count7 = res['permitdelivered'];

      }
      else if (filter == 'prelim' && isfilter == 'month') {
        this.count4 = res['prelimnewdesign'];
        this.count5 = res['prelimonhold'];
        this.count6 = res['prelimrevision'];
        this.count7 = res['prelimdelivered'];

      }


      if (filter == 'pestamp' && isfilter == 'year') {
        this.count4 = res['pestampnewdesign'];
        this.count5 = res['pestamponhold'];
        this.count6 = res['pestamprevision'];
        this.count7 = res['pestampdelivered'];
      }
      else if (filter == 'permit' && isfilter == 'year') {
        this.count4 = res['permitnewdesign'];
        this.count5 = res['permitonhold'];
        this.count6 = res['permitrevision'];
        this.count7 = res['permitdelivered'];

      }
      else if (filter == 'prelim' && isfilter == 'year') {
        this.count4 = res['prelimnewdesign'];
        this.count5 = res['prelimonhold'];
        this.count6 = res['prelimrevision'];
        this.count7 = res['prelimdelivered'];

      }

     

      this.TRbararray = [this.label4, this.label5, this.label6, this.label7];
      this.TRbararraycount = [this.count4, this.count5, this.count6, this.count7];
      // loading.dismiss();


      setTimeout(() => {

        console.log(this.isTR);

        this.isTR = true;

        this.TRdougnutChartMethod(this.TRarray, this.TRarraycount);
        this.barChartMethodBig(this.TRbararray, this.TRbararraycount);

      }
        , 200);
       this.isTR = true;



      // this.TRdougnutChartMethod(this.TRdata,filter);

    });
  }

  async getStateReport(filter){
    console.log(filter)
  
    this.states = false;
    this.StateDonutSkeleton = false;
    this.apiService.getStateWiseReport(filter).subscribe(res => {
      this.states = res
      console.log(this.states,"is statewise rep");
      this.statename = Object.keys(this.states);
      this.statenamelength = this.statename.length;
      console.log(this.statenamelength);
      console.log(this.statename);
      this.zerothkey = this.statename[0]
      console.log("this is zeroth key",this.zerothkey)
      this.statecount = Object.values(this.states);
      this.zerothcount = this.statecount[0]
      console.log("this is zeroth Value",this.zerothcount)
      // loading.dismiss();
  console.log(this.statecount);
      });

  
      setTimeout(() => {
        // this.isState = true;
  
         this.barChartMethod(this.statename,this.statecount)
        // this.iszerothvalue = true;
         console.log("in state timeouts");
         
         }
         , 3000);
        // loading.dismiss();
        // this.isState = true;
  
  }

  async getZerothValues(){
    // const loading = await this.loadingController.create({
    //   message: 'Please Wait',
    //   translucent: true,
    // });
    // await loading.present();
    console.log(this.zerothkey)
    this.apiService.getSingleStateReport(this.zerothkey).subscribe((res)=>{
      this.StateDonutSkeleton = true;

      console.log(this.zerothkey)
        console.log("this is zeroth detail",res);
        this.zerothkeylabels = Object.keys(res);
        console.log(this.zerothkeylabels);
        this.zerothKeycounts = Object.values(res);
        console.log(this.zerothKeycounts);
        this.zerothstatecountpie = +this.zerothKeycounts[0] +  +this.zerothKeycounts[1]
        console.log(this.zerothstatecountpie);
        // loading.dismiss();
        this.iszerothvalue = true;
        this.StateDonutSkeleton = false;

        this.doughnutChartState.destroy()
        this.dougnutChartMethodState(this.zerothkeylabels,this.zerothKeycounts)
        
    })
    }
  

  async getProductionTimeReport() {
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
    });
    await loading.present();
    this.apiService.getProductionTimeReport().subscribe(res => {
      console.log(res, "is timerep rep");
      this.salesproposalcurrent = res['prelim_averagehrs']
      console.log(this.salesproposalcurrent, "sales proposal current hours");
      this.permitcurrent = res['permit_averagehrs']
      console.log(this.permitcurrent, "Permit current hours");
      this.pestampcurrent = res['permit_averagehrs']
      console.log(this.pestampcurrent, "Permit current hours");
      loading.dismiss();
      setTimeout(() => {
        this.salesproposalcurrent
      }, 3000);

    }, error => { loading.dismiss(); });
    loading.dismiss();
  }

  async getServices(filter,isfilter) {
    // this.doughnutChart.destroy();
    // const loading = await this.loadingController.create({
    //   message: 'Please Wait',
    //   translucent: true,
    // });
    // await loading.present();
    this.apiService.getServices(filter,isfilter).subscribe(res => {
      console.log(res, "is Services rep");
     
        this.servicesLineGraph.lineChartData = [res['dataa'].graphdata?.prelim, res['dataa'].graphdata?.permit, res['dataa'].graphdata?.pestamp];
       console.log("this.servicesLineGraph.lineChartData",this.servicesLineGraph.lineChartData);
       
      // this.linesekeleton= false
      this.services = res['dataa']['graphdata'];
      console.log(this.services);
      this.servicespie = res['dataa']['counts'];
      console.log(this.servicespie);
      


      this.countkeyspie = Object.keys(this.servicespie);
      console.log(this.countkeyspie);
      let entry1 = this.countkeyspie[0];
      let entry2 = this.countkeyspie[1];

      let entry3 = this.countkeyspie[2];
      console.log(entry1,entry2,entry3);

      var a = entry1;
      var c = a[0]
      let b = a.split('').shift().toUpperCase();
      this.onhold = a.replace(c, b);
      console.log(this.onhold)
      
      var d = entry2;
      var e =d[0]
      let f =d.split('').shift().toUpperCase();
      this.revision =d.replace(e, f);
      console.log(this.revision)

      var x = entry3;
      var y = x[0]
      let z = x.split('').shift().toUpperCase();
      this.Delivered = x.replace(y, z);
      console.log(this.Delivered)
    

      this.countkeypieArr = [this.onhold,this.revision,this.Delivered]
      console.log(this.countkeypieArr);
      

      this.countvaluepie = Object.values(this.servicespie);
      console.log(this.countvaluepie);

      console.log(this.countvaluepie[0]);
       this.totalcountpie = this.countvaluepie[0] + this.countvaluepie[1] + this.countvaluepie[2]
      console.log(this.totalcountpie);
      

      // this.totalcountpie = this.countvaluepie.reduce((a, b) => { a + b }, 0)
      // console.log(this.totalcountpie);
      this.spermit = this.services['permit']['series'];
      console.log(this.spermit);
      this.spermitValues = Object.values(this.spermit).map(Object.values).map(r => r[1]);
      console.log(this.spermitValues);
   
      this.ssalesproposal = this.services['prelim']['series'];
      console.log(this.ssalesproposal);
      this.ssalesproposalValue = Object.values(this.ssalesproposal).map(Object.values).map(r => r[1]);
      console.log("this is value of sales proposal", this.ssalesproposalValue);
   
      this.spestamp = this.services['pestamp']['series'];
      console.log(this.spestamp);
      this.spestampValue = Object.values(this.spestamp).map(Object.values).map(r => r[1]);
      console.log("this is value PE stamp", this.spestampValue);
    
      // loading.dismiss();
   


      setTimeout(() => {
        // this.lineChartMethod(this.spermitValues, this.ssalesproposalValue, this.spestampValue,);
        this.doughnutChartMethod(this.countkeypieArr, this.countvaluepie);
      }, 600);

    }, error => {  });

    // loading.dismiss();
  }
  delivered(delivered: any) {
    throw new Error('Method not implemented.');
  }



 async getStateDetails(event){
  let state= event.target.value
  this.zerothkey = state
  console.log(state)
  this.doughnutChartState.destroy();
  // const loading = await this.loadingController.create({
  //     message: 'Please Wait',
  //     translucent: true,
  //   });
  //   await loading.present();
    this.apiService.getSingleStateReport(state).subscribe((res)=>{
       console.log(res)
       this.stateKeys = Object.keys(res)
       console.log(this.stateKeys)
       this.statecounts = Object.values(res)
       console.log(this.statecounts); 
       this.iszerothvalue = false;
       this.statecountpie = +this.statecounts[0] +  +this.statecounts[1]
       console.log(this.statecountpie);
       this.dougnutChartMethodState(this.stateKeys,this.statecounts)
      //  loading.dismiss()
    })
  }


  handelChangeService(event, type){
    this.servicespie = false
    console.log(event.target.value)
      console.log(type)
      // this.lineChart.destroy();
      this.doughnutChart.destroy();
      if (event.target.value && type == 'servicesLine') {
      console.log(event.target.value)
        
        let filter = event.target.value
        console.log(filter)
        this.getServices(filter,'');
  
      }
       else if(event.target.value && type == 'servicesDonut'){
      console.log(event.target.value)
      if (event.target.value == 'pestamp') {
        this.servicetitle = 'Pe Stamp'
      }
      else if(event.target.value == 'permit'){
        this.servicetitle = 'Permit'
      }
      
      else if(event.target.value == 'prelim'){
        this.servicetitle = 'Sales Proposal'
      }

      else if(event.target.value == 'all'){
        this.servicetitle = 'All'

      }

      let isfilter = event.target.value
        console.log(isfilter)
        this.getServices('',isfilter);
        
      }
  
  }

  handleChange($event,data){
    this.isTR = false;

    this.doughnutChartTR.destroy();
    this.barChartbig.destroy();
    
    if ($event.detail.value && data == 'taskRepDonut') {
      console.log($event.detail.value)
      if ($event.target.value == 'pestamp') {
        this.tasktitle = 'Pe Stamp'
      }
      else if($event.target.value == 'permit'){
        this.tasktitle = 'Permit'
      }
      
      else if($event.target.value == 'prelim'){
        this.tasktitle = 'Sales Proposal'
      }

      else if($event.target.value == 'all'){
        this.tasktitle = 'All'

      }
  let filter = $event.detail.value
  console.log(filter);
  this.getTaskReport(filter,'');
  
    } else if ($event.detail.value && data == 'taskRepBar')
     {
      console.log($event.detail.value)
      let isfilter = $event.detail.value
      console.log(isfilter);
      this.getTaskReport('',isfilter); 
    }
  }

  handleChangeLocation($event,data){
    this.isState = false;
    this.StateDonutSkeleton = false;
    this.barChart.destroy();
    this.doughnutChartState.destroy();
    // this.iszerothvalue = false;

    console.log($event.detail.value)
    if ($event.detail.value && data == 'locationBar') {
      console.log($event.detail.value)
  let isfilter = $event.detail.value
  console.log(isfilter);
  this.getStateReport(isfilter);
  
    } else if ($event.detail.value && data == 'locationDonut')
     {
      console.log($event.detail.value)
      let isfilter = $event.detail.value
      console.log(isfilter);
      this.getStateReport(isfilter); 
    }
  }
  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
}
}