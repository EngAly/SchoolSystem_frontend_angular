import { AbstractControl } from '@angular/forms';

export function ValidateMonth(control: AbstractControl) {
  // alert(control.value)
  if (!(control.value <= 12 && control.value >= 1)) {
    return { validMonth: true };
  }
  return null;
}