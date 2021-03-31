import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sales-proposal',
  templateUrl: './sales-proposal.page.html',
  styleUrls: ['./sales-proposal.page.scss'],
})
export class SalesProposalPage implements OnInit {

  salesProposal:FormGroup;
  number: number;
color: string;

  constructor(private formBuilder: FormBuilder) {
    this.salesProposal = this.formBuilder.group({
      utilityName : new FormControl(null, [Validators.required]),
      utilityRate:  new FormControl(null, [Validators.required]),
      annualUtilityEscalation : new FormControl(3, [Validators.required]),
      incentives :  new FormControl(null, [Validators.required]),
      costOfSystem :  new FormControl(null, [Validators.required]),
      name : new FormControl(null, [Validators.required]),
      logo : new FormControl(null, [Validators.required]),
      companyName :  new FormControl(null, [Validators.required])
    })
  }

  ngOnInit() {
  }

  onRangeChangeHandler() {
    this.number = this.salesProposal.get('annualUtilityEscalation').value;


    if (this.salesProposal.get('annualUtilityEscalation').value > 0 && this.salesProposal.get('annualUtilityEscalation').value < 1) {
        this.color = 'dark';
    }
    else if (this.salesProposal.get('annualUtilityEscalation').value > 2 && this.salesProposal.get('annualUtilityEscalation').value < 3) {
      this.color = 'primary';
    }
    else if (this.salesProposal.get('annualUtilityEscalation').value > 3 && this.salesProposal.get('annualUtilityEscalation').value < 4) {
      this.color = 'secondary';
    }
    else {
      this.color = 'danger';
    }
  }


}
