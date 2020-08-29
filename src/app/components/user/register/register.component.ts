import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Register } from 'src/app/models/Register';
import { EndPointAbstracts } from 'src/app/interfaces/EndPointAbstracts';
import { RegisterService } from 'src/app/services/register.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements EndPointAbstracts {

   user = new Register();
   inPrograss: boolean = false;
   // 
   passwordStatus = false
   // english pattern only
   en_pattern = '[a-zA-Z0-9._]{5,30}';
   // all pattern (i.e arabic + english + some special chars)
   a_pattern = '[ء-يa-zA-Z0-9._]{5,30}';

   formData = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.pattern(this.a_pattern), Validators.required])),
      // use custome validators to make password complex
      password: new FormControl('', [Validators.required, CustomValidators.ValidatePassword]),
      confirmPassword: new FormControl('', [Validators.required]),
      gender: new FormControl('Male', [Validators.required]),
      role: new FormControl('ROLE_USER', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{11}")]),
      joinDate: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
   });

   constructor(private service: RegisterService) { }

   get controls() {
      return this.formData.controls;
   }

   /**
    * get selected gender from view when change then insert
    * it to register object
    * @param event: to handle dom object actions
    */
   setGender() {
      this.user.gender = this.formData.get('gender').value
   }

   /**
    * get selected role from view and put insert to role in 
    * register object
    * @param event: to handle dom object actions
    */
   setRole() {
      this.user.role = this.formData.get('role').value;
   }

   getAllSetter() {
      this.setGender();
      this.setRole();
   }

   save() {
      this.getAllSetter();
      // delete it from original object to send it to backend without confirmPassword
      delete this.user.confirmPassword;
      // alert(JSON.stringify(this.user));
      this.service.add(this.user).then(
         saved => {
            if (saved) {
               alert(document.getElementById('savedMsg').textContent);
               this.reset();
            } else {
               alert(document.getElementById('unsavedMsg').textContent)
            }
            this.inPrograss = false;
         }
      );
      console.log(this.user)
   }

   reset() {
      this.controls.reset;
   }

   togglePassword() {
      this.passwordStatus = !this.passwordStatus;
      this.passwordStatus ? document.getElementById('password').setAttribute('type', 'text') :
         document.getElementById('password').setAttribute('type', 'password');
   }
}
