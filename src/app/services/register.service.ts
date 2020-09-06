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

   public async add(user: Register): Promise<number> {
      let flag: number;
      await this.http.post(`${this.url}/add`, user, { observe: 'response' }).toPromise()
         .then((response) => {
            flag = response.status
         }).catch((err) => {
            flag = err.status;
            console.log(err);
            
         })
      return flag
   }


}
