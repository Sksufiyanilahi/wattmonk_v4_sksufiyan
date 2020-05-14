import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

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

  private onChange: (data: number) => void;
  selectedOption: any;
  showSuggestions: false;
  sortedList: any[] = [];
  selectedDataId = 0;
  selectedDataName = '';

  constructor() {
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

      this.sortedList = this.dataList.filter((item) => {
        return (item.name.toLowerCase().indexOf(selectedData.name.toLowerCase()) > -1);
      });
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

  onValueChanged(event: CustomEvent) {
    console.log('value changed');
    console.log(this.dataList);
    this.sortedList = this.dataList.filter((item) => {
      return (item.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
    });
    if (this.sortedList.length === 1) {
      if (this.sortedList[0].name.toLowerCase() === event.detail.value.toLowerCase()) {
        this.sortedList = [];
      }
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
    console.log(event);
    this.sortedList = this.dataList.filter((item) => {
      return (item.name.toLowerCase().indexOf(this.selectedDataName) > -1);
    });
    if (this.sortedList.length === 1) {
      if (this.sortedList[0].name.toLowerCase() === this.selectedDataName.toLowerCase()) {
        this.sortedList = [];
      }
    }
  }

  onBlur(event: CustomEvent) {
    console.log(event);
    setTimeout(() => {
      this.sortedList = [];
    }, 100);

  }
}
