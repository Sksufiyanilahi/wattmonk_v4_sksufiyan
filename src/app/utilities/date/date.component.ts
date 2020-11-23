import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateComponent
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() date: number;
  @Input() placeholder = '';

  newDate:any;

  private onChange: (value: Date) => void;

  constructor(
    private datePicker: DatePicker
  ) { }

  

registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
}

writeValue(date: number): void {
  this.date = date;
  
}

validate(control: AbstractControl): ValidationErrors | null {
  if (this.date !== null && this.date !== undefined && this.date !== 0 && this.date > new Date().getTime()) {
    return null;
  }
  if (this.date > 0 && this.date < new Date().getTime()) {
    return null;
    // return {
    //   error: 'Date must be a future date'
    // };
  }
  return {
    error: 'Please choose a date'
  };
}

changeDate() {
  const currentDate = new Date(this.date);

  this.datePicker.show({
    date: new Date(this.date),
    //maxDate:new Date().getTime(),
    maxDate:new Date().getTime(),
    minDate: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
  }).then(
    date => {
      this.date = date.getTime();//date.getFullYear()+date.getMonth()+date.getDate()+date.getTime();//date.getFullYear()+date.getTime();
      this.onChange(date);
      this.newDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    },
    err => console.log('Error occurred while getting date: ', err)
  );
}

  ngOnInit() {}

}
