import { Component, Input, OnInit } from '@angular/core';
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
  private onChange: (assignee: number) => void;
  selectedUserId = 0;

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
      if (this.selectedUserId !== 0) {
        return null;
      }
      return {
        error: 'Assignee is required'
      };
    }
    return null;
  }

  selectAssignee(assignee: AssigneeModel) {
    this.assignees.forEach((item) => {
      item.selected = false;
    });
    assignee.selected = true;
    this.selectedUserId = assignee.id;
    this.onChange(assignee.id);
  }

  selectSelf() {

  }
}
