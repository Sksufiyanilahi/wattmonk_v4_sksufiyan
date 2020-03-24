import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: false,
      useExisting: DateTimeComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: false,
      useExisting: DateTimeComponent
    }
  ]
})
export class DateTimeComponent implements ControlValueAccessor, Validator {

  @Input() date: Date;
  private onChange: (value: Date) => void;

  constructor() {
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
    if (this.date === null || this.date === undefined) {
      return null;
    }
    return {
      required: 'Please choose a date'
    };
  }

}
