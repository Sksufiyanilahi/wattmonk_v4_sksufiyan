import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sales-proposal',
  templateUrl: './sales-proposal.page.html',
  styleUrls: ['./sales-proposal.page.scss'],
})
export class SalesProposalPage implements OnInit {

  prelimDetailsFormGroup: FormGroup;
  salesProposalFormGroup: FormGroup;
  stepNumber: number;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.stepNumber = 1;
    this.prelimDetailsFormGroup = this.formBuilder.group({
      companyname: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      monthlybill: new FormControl('',[Validators.required,Validators.min(0)]),
      address: new FormControl('',[Validators.required]),
      createdby: new FormControl(''),
      assignedto: new FormControl(''),
      rooftype: new FormControl(''),
      //prelimdesign: new FormControl(null),
      architecturaldesign: new FormControl(''),
      tiltofgroundmountingsystem: new FormControl(''),
      mountingtype: new FormControl('', [Validators.required]),
      // jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      newconstruction: new FormControl(false),
      source: new FormControl('android', [Validators.required]),
      comments: new FormControl(''),
      requesttype: new FormControl('prelim'),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postalcode: new FormControl(''),
      status: new FormControl('created'),
      attachments: new FormControl([]),
      deliverydate:new FormControl(),
      outsourcedto:new FormControl(null),
      isoutsourced:new FormControl('false'),
      designacceptancestarttime:new FormControl(null),
      creatorparentid:new FormControl(),
      //isonpriority:new FormControl('false'),
      paymentstatus:new FormControl(null),
      paymenttype:new FormControl(null)
      // uploadbox:new FormControl('')
    });
    this.salesProposalFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  goToStep2(){
    this.stepNumber = 2;
  }
}
