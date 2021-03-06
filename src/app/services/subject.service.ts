import { Injectable } from '@angular/core';
import { Subject } from '../models/Subject';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';

@Injectable({
   providedIn: 'root'
})
export class SubjectService {

   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "subject";
   }

   public add(subject: Subject): Observable<any> {
      return this.http.post(`${this.url}/add`, subject, { observe: 'response' });
      // public async add(subject: Subject): Promise<boolean> {
      //    let flag: boolean = false;
      //    await this.http.post(`${this.url}/add`, subject, { observe: 'response' }).toPromise()
      //       .then((response) => {
      //          response.status == 200 ? flag = true : flag;
      //       }).catch((err) => {
      //          flag = false;
      //          console.log(err)
      //       })
      //    return flag
   }

   public getByName(name: string, pageSize = 8, page = 0, sortBy = "id", direction = "asc"): Observable<Subject[]> {
      return this.http.get<Subject[]>(`${this.url}/byName/${name}/?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   public getAll(pageSize = 8, page = 0, sortBy = "name", direction = "desc"): Observable<Subject[]> {
      return this.http.get<Subject[]>(`${this.url}?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   getById(id?: number): Observable<Subject> {
      throw new Error("Method not implemented.");
   }

}
