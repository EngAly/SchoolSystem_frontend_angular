import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CacheObjectService } from 'src/app/services/cache-object.service';
import { JWTAuthInterceptorService } from 'src/app/services/jwtauth-interceptor.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-start',
   // templateUrl: './ee.html',
   templateUrl: './start.component.html',
   styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

   dir: string
   isRight: boolean
   smallSize: boolean

   isLogin: boolean;

   // handle username and store it to show it in navbar for all login time
   username: string

   constructor(private translate: TranslateService, private _cache: CacheObjectService,
      private auth: AuthenticationService, private route: Router) {

      // check screen size when user open site on its device
      this.checkWidth()

      // call lang settings from session 
      this.useLanguage(localStorage.getItem('currentLang'))
   }

   ngOnInit(): void {

      // if user is logged in show its name in navbar (refresh)
      this.username = localStorage.getItem("username");

      // if there username in local storage then user isLogin (refresh)
      this.isLogin = localStorage.getItem('username') != null ? true : false

      // get username to show in navbar (instantaneous)
      this._cache.getUserName.subscribe(user => this.username = user, err => console.log(err))

      // to switch between login and logout (instantaneous)
      this._cache.getLogin.subscribe(isLogged => this.isLogin = isLogged, err => console.log(err))

   }

   useLanguage(lang: string) {
      this.langSetting(lang);
   }

   private langSetting(lang: string) {
      if (lang == "ar") {
         this.dir = "rtl";
         this.isRight = true;
      } else {
         this.dir = "ltr";
         this.isRight = false;
      }
      // set  dir setting if RTL or LTR
      this.dirSetting(lang, this.dir);
      // save selected language and page dir to session to be default when reopen
      localStorage.setItem('currentLang', lang);
      //  call translate to switch between two languages
      this.translate.use(lang);
   }

   private dirSetting(lang: string, dir: string) {
      // setting page direction
      document.getElementsByTagName('body')[0].setAttribute('dir', dir);
      document.getElementsByTagName('html')[0].setAttribute('lang', lang);
   }

   /**
    * periodic update each seceen size changes
    */
   @HostListener('window:resize', ['$event'])
   onResize(event) {
      this.checkWidth()
   }


   private checkWidth() {
      if (window.innerWidth < 768) {
         this.smallSize = true
      } else {
         this.smallSize = false
      }
   }

   /**
    * save clicked item in statistics to pass it to statistics
    * component in other hand
    */
   persistItem(event: Event) {
      this._cache.setObject = (event.target as Element).innerHTML
   }

   clearCachedObejct() {
      this._cache.setObject = {};
   }

   /**
    * destroy all session keys (username + token)
    * to destory login mode
    */
   logOut() {
      // remove username key from local storage
      this.auth.logOut();

      // delete username from navbar (instantaneous)
      this._cache.setUserName = ""

      // switch to logout status (instantaneous)
      this._cache.setLogin = false;

      // redirect to login page 
      this.route.navigate(['login'])
   }

   /**
    * get login user details
    */
   getDetails() {
      this.route.navigate(['users/', this.username])
   }
}

