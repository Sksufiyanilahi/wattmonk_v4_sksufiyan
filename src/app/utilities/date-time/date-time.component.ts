import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { UtilitiesService } from 'src/app/utilities.service';

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

  @Input() date: any;
  @Input() placeholder = '';

  private onChange: (value: Date) => void;

  constructor(
    private datePicker: DatePicker,
    private utilities:UtilitiesService
  ) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(date: any): void {
    this.date = date;
    // console.log(this.date);

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
    // console.log(currentDate);
    this.datePicker.show({
      date: new Date(this.date),
      minDate: new Date().getTime(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.date = date.getTime();
        this.onChange(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  changeTime() {
    const currentDate = new Date();
    // console.log(currentDate);
    this.datePicker.show({
      date: new Date(this.date),
      minDate: new Date().getTime(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        // if(this.date.getTime > currentDate.getTime()){
        // }
        const oldDate = new Date(this.date);
        oldDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
        this.date = oldDate.getTime();
         var selected_date=oldDate.getDay();

        this.onChange(oldDate);
        if(this.date < currentDate.getTime() ){
          this.utilities.showAlert("Invalid time")
          this.date = new Date().getTime();
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
