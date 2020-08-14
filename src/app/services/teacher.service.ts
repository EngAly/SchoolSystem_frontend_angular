import { Injectable } from '@angular/core';
import { Teacher } from '../models/Teacher';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class TeacherService implements BusinessAbstracts<Teacher>{

   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "teacher";
   }

   public async add(teacher: Teacher): Promise<boolean> {
      let flag: boolean = false;
      await this.http.post(`${this.url}/add`, teacher, { observe: 'response' }).toPromise()
         .then((response) => {
            response.status == 200 ? flag = true : flag;
         }).catch((err) => {
            flag = false;
            console.log(err)
         })
      return flag
   }

   //  there bug here we need to sync this block
   public getById(id = 1): Observable<Teacher> {
      return this.http.get<Teacher>(`${this.url}/byId/${id}`);
   }

   public getByName(name: string, page = 0, pageSize = 8, sortBy = "id", direction = "asc"): Observable<Teacher[]> {
      return this.http.get<Teacher[]>(`${this.url}/byName/${name}/?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): Observable<Teacher[]> {
      throw new Error("Method not implemented.");
   }




}
