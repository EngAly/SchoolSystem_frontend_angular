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
   deleteById(id: number) {
      throw new Error("Method not implemented.");
   }
   // export class StudentService {

   private url: string



   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "student";
   }

   public async add(student: Student): Promise<number> {
      let flag: number;
      await this.http.post(`${this.url}/add`, student, { observe: 'response' }).toPromise()
         .then((response) => {
            flag = response.status;
         }).catch((err) => {
            flag = err.status;
            console.log(err)
         })
      return flag
   }

   public async update(student: Student): Promise<number> {
      let flag: number;
      await this.http.put(`${this.url}/update`, student, { observe: 'response' }).toPromise()
         .then((response) => {
            flag = response.status;
          }).catch((err) => {
            flag = err.status;
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
