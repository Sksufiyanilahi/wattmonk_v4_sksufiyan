import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { AssigneeModel } from '../../model/assignee.model';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UserSelectorComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: UserSelectorComponent
    }
  ]
})
export class UserSelectorComponent implements ControlValueAccessor, Validator {

  @Input() assignees: AssigneeModel[] = [];
  @Input() placeholder = 'assign to';
  @Input() required = false;
  @Output() assigneeData = new EventEmitter<AssigneeModel>();
  private onChange: (assignee: number) => void;
  selectedUserId = null;
  // assignee: AssigneeModel;

  constructor() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  writeValue(assignee: number): void {
    this.selectedUserId = assignee;
    this.assignees.forEach((item) => {
      item.selected = item.id === this.selectedUserId;
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required) {
      console.log(this.selectedUserId);
      if (this.selectedUserId !== null) {
        return null;
      }
      return {
        error: 'Assignee is required'
      };
    }
    return null;
  }

  selectAssignee(assignee: AssigneeModel) {
    this.assigneeData.emit(assignee);
    this.assignees.forEach((item) => {
      item.selected = false;
     
    });
    if (assignee.id === this.selectedUserId) {
      this.selectedUserId = null;
      this.onChange(null);
    } else {
      assignee.selected = true;
      console.log(assignee);
      
      this.selectedUserId = assignee.id;
      this.onChange(assignee.id);
    }
  }

  selectSelf() {

  }
}
