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

   public async add(level: Level): Promise<boolean> {
      let flag: boolean = false;
      await this.http.post(`${this.url}/add`, level, { observe: 'response' }).toPromise()
         .then((response) => {
            response.status == 200 ? flag = true : flag;
         }).catch((err) => {
            flag = false;
            console.log(err)
         })
      return flag
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

   getById(id?: number): Observable<Level> {
      throw new Error("Method not implemented.");
   }
}
