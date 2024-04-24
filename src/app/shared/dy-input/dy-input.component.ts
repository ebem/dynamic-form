import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-dy-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dy-input.component.html',
  styleUrl: './dy-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DyInputComponent),
      multi: true,
    },
  ],
})
export class DyInputComponent implements ControlValueAccessor {
  @Input() inputType = 'text';
  @Input() id = '';
  @Input() label = '';
  @Input() key = '';
  @Input() placeholder = '';

  value = null;
  disabled = false;

  onChange: any;
  onTouched: any;

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(value: null | string | number) {
    let updatedValue = value;
    if (value !== null && this.inputType === 'number') {
      updatedValue = Number(updatedValue);
    }

    this.onChange(updatedValue)
  }
}
