import {Component, forwardRef, Input} from '@angular/core';
import {NgFor} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dy-select',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './dy-select.component.html',
  styleUrl: './dy-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DySelectComponent),
      multi: true,
    },
  ],
})
export class DySelectComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() key = '';
  @Input() options: string[] = [];

  value: any = null;
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

  onOptionSelected(value: any) {
    this.onChange(value.target.value)
  }
}
