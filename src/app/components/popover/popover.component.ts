import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(private router:Router,private utilities:UtilitiesService) { }

  ngOnInit() {}

  siteAssessment(){
    this.router.navigate(['/schedule/design']);
    this.utilities.dismissPopover();
  }

  salesProposal(){
    this.router.navigate(['/schedule/sales-proposal']);
    this.utilities.dismissPopover();
  }

}
