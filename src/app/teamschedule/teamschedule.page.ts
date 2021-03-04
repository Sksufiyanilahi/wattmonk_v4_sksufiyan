import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-teamschedule',
  templateUrl: './teamschedule.page.html',
  styleUrls: ['./teamschedule.page.scss'],
})
export class TeamschedulePage implements OnInit {
  teamForm:FormGroup;
  constructor(private navController:NavController,
              private formBuilder:FormBuilder) { 
    this.teamForm = this.formBuilder.group({
      firstname:new FormControl(''),
      lastname:new FormControl(''),
      workemail:new FormControl(''),
      userrole : new FormControl('')
    })
  }

  ngOnInit() {
  }

  goBack() {
    // this.mixpanelService.track("PERMITDESIGN_PAGE_CLOSE", {
    // });
   this.navController.pop();
   
  }
}
