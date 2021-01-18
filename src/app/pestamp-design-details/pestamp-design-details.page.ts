import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-pestamp-design-details',
  templateUrl: './pestamp-design-details.page.html',
  styleUrls: ['./pestamp-design-details.page.scss'],
})
export class PestampDesignDetailsPage implements OnInit {
  
  designId:any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private utilities:UtilitiesService,
              private apiService:ApiService) { 
    this.designId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getDesignDetails();
  }

  getDesignDetails() {
    //this.getAssignees();

    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.designId).subscribe((result) => {
        this.utilities.hideLoading();
        console.log('re', result);
        //this.setData(result);
        //this.timer();
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }
}
