import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Level } from '../models/Level';
import { Observable } from 'rxjs';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';

@Injectable({
   providedIn: 'root'
})

export class LevelService implements BusinessAbstracts<Level> {
   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "level";
   }

   public async add(level: Level): Promise<number> {
      let flag: number
      await this.http.post(`${this.url}/add`, level, { observe: 'response' }).toPromise()
         .then((response) => {
            flag = response.status
         }).catch((err) => {
            flag = err.status
            console.log(err)
         })
      return flag
   }

   public async update(level: Level): Promise<number> {
      let flag: number;
      await this.http.put(`${this.url}/update`, level, { observe: 'response' }).toPromise()
         .then((response) => flag = response.status).catch((err) => {
            flag = err.status;
            console.log(err)
         })
      return flag
   }

   getById(id: number): Observable<Level> {
      return this.http.get<Level>(`${this.url}/byId/${id}`);
   }

   public getByName(name: string, pagesize = 8, page = 0, sortBy = 'id', direction = "asc"): Observable<Level[]> {
      return this.http.get<Level[]>(`${this.url}/byName/${name}?pageSize=${pagesize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   /**
    * this methods take three arguments
    * int page  => define page size for incoming data defualt is 0
    * String field => sort by this filed default is id
    * String direction => sort direction default is asc
    */
   public getAll(pagesize: number = 8, page?: number, sortBy?: string, direction?: string): Observable<Level[]> {
      return this.http.get<Level[]>(`${this.url}?pageSize=${pagesize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   public deleteById(id: number) {
      return this.http.delete(`${this.url}/delete/${id}`);
   }

}
