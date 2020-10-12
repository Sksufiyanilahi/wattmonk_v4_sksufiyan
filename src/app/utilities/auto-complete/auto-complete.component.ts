import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutoCompleteComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AutoCompleteComponent
    }
  ]
})
export class AutoCompleteComponent implements ControlValueAccessor, Validator {

  @Input() dataList: any[];
  @Input() placeholder = '';
  @Input() mode = 'id'; //id or object
  @Input() name='';
  @Output() modulename= new EventEmitter();

  private onChange: (data: any) => void;
  selectedOption: any;
  showSuggestions: false;
  sortedList: any[] = [];
  selectedDataId = 0;
  selectedDataName = '';
  manualinput = '';

  constructor(public apiService:ApiService,private utility:UtilitiesService) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.selectedDataId !== 0) {
      return null;
    }
    return null;
    // return {
    //   error: 'No option selected'
    // };
  }

  writeValue(data: any): void {
    if (data !== null && data !== undefined && data !== '') {
      this.selectedDataId = data;
      let selectedData: any;
      this.dataList.forEach((item) => {
        if (item.id === data) {
          selectedData = item;
        }
      });
      debugger;
      if(selectedData){
      this.sortedList = this.dataList.filter((item) => {
        return (item.name.toLowerCase().indexOf(selectedData.name.toLowerCase()) > -1);
      });
    }
      if (this.sortedList.length === 1) {
        if (this.sortedList[0].name.toLowerCase() === selectedData.name.toLowerCase()) {
          this.sortedList = [];
        }
      }

      if (selectedData) {
        this.selectOption(selectedData);
      }
    } else {
      this.selectedDataId = 0;
      this.selectedDataName = '';
      this.dataList = [];
    }

  }


  onValueChanged(event) {
    console.log('value changed');
    console.log(this.dataList);
    this.manualinput = event.detail.value;
    this.utility.manualInput.next(this.manualinput);
    // this.selectedDataName = event.detail.value;
    console.log(this.selectedDataName);
    
    this.sortedList = this.dataList.filter((item) => {
      if(item.name !==null){
        return (item.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      }
    });
    if (this.sortedList.length === 1) {
      if (this.sortedList[0].name.toLowerCase() === event.detail.value.toLowerCase()) {
        // this.onChange(event.target.value);
        this.sortedList = [];
       
      }
    }
    else{
      // this.selectedDataName= event.detail.value;
      // event.detail.value = this.selectedDataName;
      // this.onChange(this.selectedDataName);
    }
  }

  selectOption(data: any) {
    console.log('data changed');
    this.sortedList = [];
    this.selectedOption = data;
    this.selectedDataId = data.id;
    this.selectedDataName = data.name;

    if (this.mode === 'id') {
      this.onChange(data.id);
    } else {
      this.onChange(data);
    }
  }

  onFocus(event: CustomEvent) {
   this.modulename.emit(this.name);
    this.sortedList = this.dataList.filter((item) => {
      console.log(item);
        if(item.name !== null){
          return (item.name.toLowerCase().indexOf(this.selectedDataName) > -1);
        }
    });
    if (this.sortedList.length === 1) {
      this.selectedDataName = this.sortedList[0].name;
      // if (this.mode === 'id') {
      //   this.onChange(this.sortedList[0].id);
      // } else {
        // }
        if (this.sortedList[0].name.toLowerCase() === this.selectedDataName.toLowerCase()) {
       
        this.sortedList = [];
      }
    }
  }

  onBlur(event: CustomEvent) {
    setTimeout(() => {
      this.sortedList = [];
    }, 100);

  }
}
