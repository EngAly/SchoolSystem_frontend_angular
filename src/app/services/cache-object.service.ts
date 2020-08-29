import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { Observable, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class CacheObjectService {

   // cache object to pass from component to other
   private object = new Object();

   // cache object to pass from child to parent
   //  and update its value dynamic when any changes
   private object$ = new Subject<Object>();

   // test if user login
   private login = new Subject<boolean>();

   // cache username for all components to show it in nav bar
   private username = new Subject<string>();

   /**
    * cache object for some time so can pass object 
    * from component to other in component LC // life cycle it once
    */
   set setObject(object: any) {
      this.object = object;
   }

   get getObject(): any {
      return this.object;
   }

   /**
    * cache object to pass from child to parent 
    * note that: it auto update direct when its value 
    * is changed so all subscriber update its values instancely
    * it often used with <router-outlet> to pass value from component 
    * to other
    * @param object
    */
   set setObject$(object: any) {
      this.object$.next(object);
   }

   get getObject$(): Observable<any> {
      return this.object$.asObservable();
   }

   /**
    * switch between login and logout
    */
   set setLogin(isLogin: boolean) {
      this.login.next(isLogin);
   }

   get getLogin(): Observable<boolean> {
      return this.login.asObservable();
   }

   /**
    * properity to save username for all components
    * so can show username in all components for all session time
    */
   set setUserName(username: string) {
      this.username.next(username);
   }

   get getUserName(): Observable<string> {
      return this.username.asObservable();
   }


}
