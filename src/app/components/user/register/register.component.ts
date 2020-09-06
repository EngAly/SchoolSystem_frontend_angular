import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Register } from 'src/app/models/Register';
import { RegisterService } from 'src/app/services/register.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   user = new Register();
   inPrograss: boolean = false;

   // if url has id store it in id so process in update statue
   id: number;

   // toggle between show / hide password 
   passwordStatus = false

   // english pattern only
   en_pattern = '[a-zA-Z0-9._]{5,30}';
   // all pattern (i.e arabic + english + some special chars)
   a_pattern = '[ء-يa-zA-Z0-9._]{5,30}';


   formData = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.pattern(this.a_pattern), Validators.required])),
      showname: new FormControl('', [Validators.required]),
      // use custome validators to make password complex
      password: new FormControl('', [Validators.required, CustomValidators.ValidatePassword]),
      confirmPassword: new FormControl('', [Validators.required]),
      gender: new FormControl('Male', [Validators.required]),
      role: new FormControl('USER', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{11}")]),
      joinDate: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
   });

   constructor(private service: RegisterService, private _cache: CacheObjectService,
      private activeRoute: ActivatedRoute, private route: Router) { }

   get controls() {
      return this.formData.controls;
   }

   ngOnInit(): void {
      if (localStorage.getItem('role') != 'ADMIN') {
         this.controls.role.disable();
      }
      this.update();
   }

   /**
    * update user details except login name + account type
    * if url has id so dataflow intented to update statue
    * if user refresh url or page so will naviagte to home page
    * not permit for user to show another users data 
    */
   private update() {
      this.id = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
      if (this.id) {
         if (Object.keys(this._cache.getObject).length > 0) {
            this.user = this._cache.getObject
            this.controls.gender.setValue(this.user.gender);
            this.controls.role.setValue(this.user.role)
            this.controls.role.disable();
            this.controls.username.disable();
         } else {
            this.route.navigate([''])
         }
      }
   }

   /**
    * get selected gender from view when change then insert
    * it to register object
    */
   setGender() {
      this.user.gender = this.formData.get('gender').value
   }

   /**
    * get selected role from view and put insert to role in 
    * register object
    */
   setRole() {
      this.user.role = this.formData.get('role').value;
   }

   /**
    * save data or update
    * save statue if deta not has if
    * update if data has previous id so data is founded in database
    */
   saveOrUpdate() {
      this.setGender();
      this.setRole();
      // delete it from original object to send it to backend without confirmPassword
      delete this.user.confirmPassword;
      // alert(JSON.stringify(this.user));
      this.service.add(this.user).then(
         status => {
            if (status == 200) {
               alert(document.getElementById('savedMsg').textContent);
            } else if (status === 401 || status === 403) {
               alert("don't have permissions")
            } else if (status === 500) {
               alert("User Name Is Used")
            }
            else {
               alert(document.getElementById('unsavedMsg').textContent)
            }
            this.inPrograss = false;
         });
   }

   togglePassword() {
      this.passwordStatus = !this.passwordStatus;
      this.passwordStatus ? document.getElementById('password').setAttribute('type', 'text') :
         document.getElementById('password').setAttribute('type', 'password');
   }
}
