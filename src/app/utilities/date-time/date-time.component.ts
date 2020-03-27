import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateTimeComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateTimeComponent
    }
  ]
})
export class DateTimeComponent implements ControlValueAccessor, Validator {

  @Input() date: Date;
  @Input() placeholder = '';

  private onChange: (value: Date) => void;

  constructor(
    private datePicker: DatePicker
  ) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(date: Date): void {
    this.date = date;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.date !== null && this.date !== undefined) {
      return null;
    }
    return {
      required: 'Please choose a date'
    };
  }

  changeDate() {
    this.datePicker.show({
      date: this.date,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.date = date;
        this.onChange(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  changeTime() {
    this.datePicker.show({
      date: this.date,
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.date = date;
        this.onChange(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
