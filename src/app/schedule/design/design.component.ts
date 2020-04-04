import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AssigneeModel, LIST_OF_ASSIGNEES } from 'src/app/model/assignee.model';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit {

  desginForm: FormGroup;
  knobValues: '';

  listOfAssignees: AssigneeModel[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      comment: new FormControl('')
    });
    this.listOfAssignees = LIST_OF_ASSIGNEES;
  }

  ngOnInit() { }


}
