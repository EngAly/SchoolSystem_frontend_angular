import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Absence } from '../models/Absence';
import { Student } from '../models/Student';

@Injectable({
   providedIn: 'root'
})

export class AbsenceService {
   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "absence";
   }

   public async add(student:Student): Promise<number> {
      let flag: number
      await this.http.post(`${this.url}/add`, student, { observe: 'response' }).toPromise()
         .then((response) => {
            flag = response.status
         }).catch((err) => {
            flag = err.status
            console.log(err)
         })
      return flag
   }



}
