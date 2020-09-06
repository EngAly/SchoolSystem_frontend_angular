import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from './shared.service';
import { JwtRequest } from 'src/app/models/Login';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
   providedIn: 'root'
})
export class AuthenticationService {

   private url: string

   private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "authenticate";
   }

   /**
    * 
    * @param authenticate 
    */
   authenticate(credentials: JwtRequest): Observable<any> {
      return this.http.post<any>(this.url,
         JSON.stringify({ username: credentials.username, password: credentials.password }), { headers: this.headers });
   }

   /**
    * test if user already logged in to application
    * true if logged in
    * false if logout
    */
   isUserLoggedIn() {
      let user = localStorage.getItem('username')
       return !(user === null)
   }

   logOut() {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('showname')
      localStorage.removeItem('role')
   }

}
