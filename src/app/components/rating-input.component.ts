import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rating-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor {
  stars: boolean[] = Array(5).fill(false);

  @Input() disabled = false; // Allow disabling the input
  
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  // function to call when the rating changes
  onChange = (value: number) => {
    console.log('Component onChange called with', value);
  };

  // function to call when the input is touched (when a star is clicked)
  onTouched = () => {
    console.log('Component onTouched called');
  };

  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  rate(rating: number) {
    console.log('Component rate called with', rating, ' disabled is ', this.disabled);
    if (this.disabled) return; // Do nothing if disabled

    // update the stars based on the new rating
    this.writeValue(rating);
    // notify Angular forms of the change
    this.onChange(rating);
    // mark the input as touched
    this.onTouched();
  }

  // ControlValueAccessor interface methods

  // update the model and notify Angular forms of the change
  writeValue(rating: number): void {
    console.log('CVA writeValue called with', rating);
    this.stars = this.stars.map((_, i) => rating > i);
  }

  registerOnChange(fn: (value: number) => void): void {
    console.log('CVA registerOnChange called with function', fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('CVA registerOnTouched called with function', fn);
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('CVA setDisabledState called with', isDisabled);
    this.disabled = isDisabled;
  }
}
