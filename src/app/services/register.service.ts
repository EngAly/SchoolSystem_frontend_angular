import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
   providedIn: 'root'
})
export class RegisterService {

   // root url 
   url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "register";
   }

   public async add(user: Register): Promise<boolean> {
      let flag: boolean = false;
      await this.http.post(`${this.url}/add`, user, { observe: 'response' }).toPromise()
         .then((response) => {
            response.status == 200 ? flag = true : flag;
         }).catch((err) => {
            // if (err.status == 401) {
               alert(err.status)
            // }
            flag = false;
            console.log(err)
         })
      return flag
   }


}
