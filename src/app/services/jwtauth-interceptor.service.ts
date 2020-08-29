import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheObjectService } from './cache-object.service';

@Injectable({
   providedIn: 'root'
})
export class JWTAuthInterceptorService implements HttpInterceptor {

   constructor(private _cache: CacheObjectService) {
   }

   /**
    * all requests will filtered here first then it complete its way
    * so interceptor can sure if session has token or not
    * if has token will add Authorization header and complete request
    */
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // console.log(localStorage.getItem('token'));
      if (localStorage.getItem('username') != null) {
         if (localStorage.getItem('username') && localStorage.getItem('token')) {
            req = req.clone({
               // headers:req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
               setHeaders: {
                  'Content-type': 'application/json; charset=utf-8',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
               },
            })
         }
      }
      return next.handle(req);
   }
}