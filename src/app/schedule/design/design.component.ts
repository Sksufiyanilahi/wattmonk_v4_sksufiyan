import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {

  desginForm: FormGroup;
  knobValues: '';
  minRange = 100;
  maxRange = 10000;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      comment: new FormControl('')
    });
  }

  ngOnInit() { }


}
