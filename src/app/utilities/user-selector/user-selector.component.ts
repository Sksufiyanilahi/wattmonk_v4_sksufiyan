import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { AssigneeModel } from '../../model/assignee.model';
import { StorageService } from 'src/app/storage.service';

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
export class UserSelectorComponent implements ControlValueAccessor, Validator ,OnInit,OnChanges{

  @Input() assignees: AssigneeModel[] = [];
  filteredAssignees: AssigneeModel[];
  @Input() placeholder = 'Assign to';
  @Input() required = false;
  @Output() assigneeData = new EventEmitter<AssigneeModel>();
  private onChange: (assignee: number) => void;
  selectedUserId = null;
  @Input() reviewAssigned:any;
  userId:any;
  searchTerm:any='';
  // assignee: AssigneeModel;

  constructor( private storage:StorageService) {
   
  }
ngOnInit(){

   this.userId=this.storage.getUserID();
   console.log(this.userId)

}

ngOnChanges(){
  this.filterUsers();
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
    console.log(this.reviewAssigned);
    return null;
    
  }

  selectAssignee(assignee: AssigneeModel) {
    console.log(this.userId);
    if( this.reviewAssigned!=null && this.reviewAssigned.id!=this.userId ){
    const element = <HTMLElement> document.getElementById('pre');
    element.className='afterselected';

    
  }

    console.log("this is",assignee)
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

  filterUsers(){
    console.log('-------------------');
    console.log(this.searchTerm);
    this.filteredAssignees = this.assignees.filter(assignee =>{
      return assignee.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      || assignee.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase())  > -1

    })
    console.log(this.filteredAssignees)
  }
}
