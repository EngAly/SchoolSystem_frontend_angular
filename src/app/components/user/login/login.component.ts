import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { JwtRequest } from 'src/app/models/Login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CacheObjectService } from 'src/app/services/cache-object.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   // credentials models
   user = new JwtRequest();
   // stop login process when commit to login
   inPrograss: boolean;

   dataForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
   });

   constructor(private service: AuthenticationService, private route: Router, private _cache: CacheObjectService) { }

   get controls() {
      return this.dataForm.controls;
   }

   ngOnInit(): void {
      this.isLoggedIn();
   }

   /**
    * test if user login redirect to home page
    * if user already logged In so redirect to homr page dont't show login page
    */
   private isLoggedIn() {
      if (this.service.isUserLoggedIn()) {
         this.route.navigate(['/'])
      }
   }

   /**
    * commit login to application
    * functions if user is correct anf first time to login
    * 1) store username to localstorage
    * 2) store token in session so interceptor can access it when request is triger
    * 3) after successful login redirect to home page
    * 4) release login button to un disabled
    * 5) tell username observable that with the usename
    * 
    */
   login() {
      this.inPrograss = true;
      // alert(JSON.stringify(this.user));
      this.service.authenticate(this.user).subscribe(
         data => {
            localStorage.setItem('username', this.user.username)
            localStorage.setItem('token', data['token']);

            this.route.navigate([''])
            this.inPrograss = false;
            this._cache.setUserName = localStorage.getItem('username');
            this._cache.setLogin = localStorage.getItem('username') != null ? true : false
 
         }, err => {
            // test if unautorized
            if (err['status'] == 401) {
               alert("Invalid Username Or Password")
            } else
               alert("There Problem In Login")
            this.inPrograss = false;
            console.log(err);
         })
   }

}
