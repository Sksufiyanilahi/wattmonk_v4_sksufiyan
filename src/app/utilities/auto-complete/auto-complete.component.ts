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
    return {
      error: 'No option selected'
    };
  }

  writeValue(data: number): void {
    console.log('patchedvalue ,' + data);
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
      console.log('Patching ');
      console.log(selectedData);
      this.selectOption(selectedData);
    }
  }

  onValueChanged(event: CustomEvent) {
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
    this.sortedList = [];

    this.selectedOption = data;
    this.selectedDataId = data.id;
    this.selectedDataName = data.name;

    this.onChange(data.id);
  }
}