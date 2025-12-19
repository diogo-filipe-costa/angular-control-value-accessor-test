import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RatingInputComponent } from "./components/rating-input.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RatingInputComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'control-value-accessor-test';

  // For template-driven form
  templateRating = 3;

  // FormControl example
  ratingControl = new FormControl<number | null>(2);

  // FormGroup example
  ratingForm = new FormGroup({
    rating: new FormControl<number | null>(4)
  });

  // helper methods to demo
  setAllToFive() {
    this.templateRating = 5;
    this.ratingControl.setValue(5);
    this.ratingForm.get('rating')?.setValue(5);
  }

  toggleDisableFormControl() {
    if (this.ratingControl.disabled) this.ratingControl.enable();
    else this.ratingControl.disable();
  }

  toggleDisableFormGroup() {
    const ratingCtrl = this.ratingForm.get('rating');
    if (!ratingCtrl) return;

    if (ratingCtrl.disabled) ratingCtrl.enable();
    else ratingCtrl.disable();
  }
  
  patchFormGroupToOne() {
    this.ratingForm.patchValue({ rating: 1 });
  }

  resetAll() {
    this.templateRating = 0;
    this.ratingControl.reset();
    this.ratingForm.reset();
  }
}
