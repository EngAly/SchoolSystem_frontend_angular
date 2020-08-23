import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';

@Injectable({
   providedIn: 'root'
})

export class StudentService implements BusinessAbstracts<Student> {

   private url: string



   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "student";
   }

   public async add(student: Student): Promise<boolean> {
      let flag: boolean = false;
      await this.http.post(`${this.url}/add`, student, { observe: 'response' }).toPromise()
         .then((response) => {
            response.status == 200 ? flag = true : flag;
         }).catch((err) => {
            flag = false;
            console.log(err)
         })
      return flag
   }

   //  there bug here we need to synd this block
   public getById(id = 1): Observable<Student> {
      return this.http.get<Student>(`${this.url}/byId/${id}`);
   }

   public getByName(name: string, pageSize = 8, page = 0, sortBy = "id", direction = "asc"): Observable<Student[]> {
      return this.http.get<Student[]>(`${this.url}/byName/${name}?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   public getByAge(start: number, end: number, pageSize = 8, page = 0, sortBy = "id", direction = "asc"): Observable<Student[]> {
      return this.http.get<Student[]>(`${this.url}/byAge?start=${start}&end=${end}&pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   public getByJoinDate(start: string, end: string, pageSize = 8, page = 0, sortBy = "id", direction = "asc"): Observable<Student[]> {
      return this.http.get<Student[]>(`${this.url}/byJoinDate?start=${start}&end=${end}&pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   public getByLevel(level: string, pageSize = 8, page = 0, sortBy = "id", direction = "asc"): Observable<Student[]> {
      return this.http.get<Student[]>(`${this.url}/byLevel/${level}?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   /**
    * Method not implemented
    */
   public getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): Observable<Student[]> {
      throw new Error("Method not implemented.");
   }

}
