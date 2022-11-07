import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { DesignModel, activities } from 'src/app/models/design.model';

@Component({
    selector: 'app-activity-details',
    templateUrl: './activity-details.page.html',
    styleUrls: ['./activity-details.page.scss'],
})




export class ActivityDetailsPage implements OnInit {
    activity_details: any = {};
    designId: any;
    name: string;
    userData: any

    public userAccessRights: any = {
        viewonly: true
    };
    constructor(
        private apiservice: ApiService,
        private route: ActivatedRoute,
        private storageService: StorageService,
        private navController: NavController,
        private datepipe: DatePipe,
        public utilities: UtilitiesService,
        private mixpanelService: MixpanelService
    ) {
        this.route.paramMap.subscribe(params => {
            this.designId = params.get('id');
            this.name = params.get('name')
        });
        setTimeout(() => {
            this.userAccessRights = this.utilities.getUserAccessRights('activity');
        }, 1000);
    }

    ngOnInit() {
        this.mixpanelService.track("ACTIVITY_BAR_TOGGLE_PAGE_OPEN", {
        });
        this.userData = this.storageService.getUser();


        this.activitiesList();

    }

    activitiesList() {
        this.utilities.showLoading('Please wait...').then(() => {
            // integrate new activities API
            console.log("this.name",this.name)
            console.log("this.designId",this.designId);
            
            this.apiservice.getActivityDetails(this.name, this.designId).subscribe((response:any) => {
                console.log("response",response)
                this.utilities.hideLoading().then(() => {
                    this.activity_details = response.data;
console.log(this.activity_details);

                    this.activity_details.name = response.data[0].attributes.requestname ? response.data[0].attributes.requestname: '';
                    this.activity_details.requesttype = response.data[0].attributes.requesttype ? response.data[0].attributes.requesttype: '';
                    this.activity_details.status = response.data[0].attributes.currentstatus ? response[0].attributes.currentstatus: '';
                    this.activity_details.personname = response.data[0].attributes.personname ? response.data[0].attributes.personname: '';
                    this.activity_details.type = response.data[0].attributes.type ? response.data[0].attributes.type: '';

                })
            });
        })
    }

    goBack() {
        this.mixpanelService.track("ACTIVITY_BAR_TOGGLE_PAGE_CLOSE", {
        });
        this.navController.pop();
    }

    isDatePassed(datestring: string) {
        var checkdate = moment(datestring, "YYYYMMDD");
        var todaydate = moment(new Date(), "YYYYMMDD");
        var lateby = todaydate.diff(checkdate, "days");
        if (lateby > 0) {
            return lateby;
        } else {
            return false;
        }
    }

    ionViewWillLeave() {
    }




}
