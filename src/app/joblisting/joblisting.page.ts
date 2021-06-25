import { Component, OnChanges, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { JoblistingmodelPage } from '../joblistingmodel/joblistingmodel.page';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-joblisting',
  templateUrl: './joblisting.page.html',
  styleUrls: ['./joblisting.page.scss'],
})
export class JoblistingPage implements OnInit, OnChanges {
  
  user:User;
  siteAssessmentJobslength:number=0;
  salesProposalJobslength:number=0;
  permitJobslength:number=0;

  siteAssessmentJobs:User[]=[];
  salesProposalJobs:User[]=[];
  permitJobs:User[]=[];

  jobsData:any;
  jobsDataLength:number=0;

  selectedJobs:any[]=[];
  selectedJobsId:any[]=[];
  jobs:boolean;

  active:string='Sales Proposal';
  searchTerm:any='';
  searchData: any;

  constructor(private apiService : ApiService,
              private storage : StorageService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.user = this.storage.getUser();
    this.getJobs();
  }
  
  ngOnChanges(){
    // this.filterJobs();
    console.log("hhjkll")
  }


  getJobs()
  {
    this.apiService.getSiteAssessmentJobs(this.user.id).subscribe((res:any)=>{
      console.log(res);
      this.siteAssessmentJobslength = res.length;
      this.siteAssessmentJobs=res;
      console.log(this.siteAssessmentJobs)
    })

    this.apiService.getSalesProposalJobs(this.user.id).subscribe((res:any)=>{
      console.log(res);
      this.salesProposalJobslength = res.length;
      this.salesProposalJobs=res;
    })

    this.apiService.getPermitJobs(this.user.id).subscribe((res:any)=>{
      console.log(res)
      this.permitJobslength = res.length;
      this.permitJobs = res;
      console.log(this.permitJobs)
    })
  }

  selectCard(value){
    console.log(value)
    switch (value) {
      case "sales":
      this.jobsData = this.salesProposalJobs;
      this.active = 'Sales Proposal';
      this.jobsDataLength = this.salesProposalJobslength;
      console.log(this.jobsData)
      break;

      case "site":
        this.jobsData = this.siteAssessmentJobs;
        this.jobsDataLength = this.siteAssessmentJobslength;
        this.active = 'Site Assessment';
        console.log(this.jobsData)
        break;

      case "permit":
        this.jobsData = this.permitJobs;
        this.jobsDataLength = this.permitJobslength;
        this.active = 'Permit';
        console.log(this.jobsData)
        break;
    }
    this.filterJobs(); 
  }

  selectJob(job){
    console.log(this.selectedJobs)
  //   if(this.selectedJobs.length && this.selectedJobsId.length){
  //     console.log("not")
  //     this.selectedJobs.forEach(el=>{
  //       console.log(el)
  //       if(job.id != el.id)
  //       {
  //         this.selectedJobs.push(job);
  //         this.selectedJobsId.push(job.id)
  //         console.log(this.selectedJobs)
  //         console.log(this.selectedJobsId)
  //         console.log(this.selectedJobs.length)
  //       }
  //     })
  //   }
  //   else{
  //     console.log('hello')
  //     this.selectedJobs.push(job);
  //     this.selectedJobsId.push(job.id)
  // }


  let filterData = this.selectedJobs.filter(data =>{
    console.log(data)
    return data.id.toString().indexOf(job.id.toString()) > -1
  })
  if(filterData.length==0)
  {
    this.selectedJobs.push(job);
  }
    
    // }
  }

  async openJobListingModel(){
    // console.log(job)
    const modal = await this.modalController.create({
      component: JoblistingmodelPage,
      cssClass: 'joblistingmodal',
      backdropDismiss: true,
      componentProps: {
        jobData:this.selectedJobs,
        designId:this.selectedJobsId
      },

    });
    return await modal.present();
  }

  filterJobs(){
    this.searchData = this.jobsData.filter(data =>{
      return data.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      || data.address.toLowerCase().indexOf(this.searchTerm.toLowerCase())  > -1
    || data.email.toLowerCase().indexOf(this.searchTerm.toLowerCase())  > -1
    })
    console.log(this.searchData.length)
    this.jobsDataLength = this.searchData.length
  }
}
