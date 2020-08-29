import { AbstractControl } from '@angular/forms';


export class CustomValidators {

   public static ValidateMonth(control: AbstractControl) {
      // test if value len between 1 and 12
      if (!(control.value <= 12 && control.value >= 1)) {
         return { validMonth: true };
      }
      return null;
   }


   public static ValidatePassword(control: AbstractControl) {
      let dd = control.value;
      // test if value has number
      let hasDigit = /\d/.test(control.value)
      // test if value has lowercase
      let hasLower = /[a-z]/.test(control.value)
      // test if value has uppercase
      let hasUpper = /[A-Z]/.test(control.value)
      // test if value has special char
      let hasSymbol = /[$@!%*?&]/.test(control.value)
      // test if value length less that 5 letters then force len min=5 and max=<?
      // let len = (control.value as string).length < 5
      let len = (control.value < 5)
      // test if all previous status is valid
      let valid = hasDigit && hasLower && hasUpper && hasSymbol;
      if (!valid || len) {
         return { strong: true };
      }
      return null;

   }

}