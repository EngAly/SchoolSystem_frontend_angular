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
 
   /**
    * cache object for some time so can pass object 
    * from component to other
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

}
