import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.component.html',
  styleUrls: ['./popover-component.component.scss'],
})
export class PopoverComponentComponent implements OnInit {

  constructor(private router:Router,private utilities:UtilitiesService) { }

  ngOnInit() {}

  siteAssessment(){
    this.router.navigate(['/schedule/design']);
    this.utilities.dismissPopover();
  }

  salesProposal(){
    this.router.navigate(['/schedule/salesproposal']);
    this.utilities.dismissPopover();
  }

}
