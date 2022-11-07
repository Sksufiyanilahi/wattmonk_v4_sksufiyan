import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-job-list-model',
  templateUrl: './job-list-model.page.html',
  styleUrls: ['./job-list-model.page.scss'],
})
export class JobListModelPage implements OnInit {


  jobData: User[] = [];
  jobDataId: any[] = [];
  data: any;
  user: User;
  // designId:Array<string>;
  designId: any[] = [];
  constructor(private nav: NavParams,
    private router: Router,
    private navigate: NavController,
    private modalController: ModalController,
    private apiService: ApiService,
    private storage: StorageService) {
    this.jobData = this.nav.get('jobData');
    this.jobDataId = this.nav.get('designId');
    console.log(this.jobDataId)

  }

  ngOnInit() {
    this.data = this.jobData;
    this.designId = this.jobDataId;
    this.user = this.storage.getUser();
    console.log(this.user)
    console.log(this.designId)
  }

  goBack() {
    this.modalController.dismiss();
  }

  remove(value, index) {
    this.data.forEach((element, i) => {
      console.log(i)
      console.log(value, element)
      if (index == i) {
        this.data.splice(i, 1);
        this.designId.splice(i, 1)
      }

    })
  }

  uploadJobs() {
    const postData = {
      type: this.user.role.type,
      designid: this.designId
    }
    this.apiService.uploadJobs(this.user.id, postData).subscribe((res) => {
      console.log(res);
      this.modalController.dismiss();
      this.data = '';
      this.designId = [];
    })
  }
}
