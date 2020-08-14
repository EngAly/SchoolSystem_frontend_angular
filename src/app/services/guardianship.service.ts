import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Guardianship } from '../models/Guardianship';
import { Observable } from 'rxjs';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';


@Injectable({
   providedIn: 'root'
})
export class GuardianshipService implements BusinessAbstracts<Guardianship> {
   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "guardianship";
   }

   public async add(guardianship: Guardianship): Promise<boolean> {
      let flag: boolean = false;
      await this.http.post(`${this.url}/add`, guardianship, { observe: 'response' }).toPromise()
         .then((response) => {
            response.status == 200 ? flag = true : flag;
         }).catch((err) => {
            flag = false;
            console.log(err)
         })
      return flag
   }

   public getByName(name: string, pageSize = 8, page = 0, sortBy = "id", direction = "asc"): Observable<Guardianship[]> {
      return this.http.get<Guardianship[]>(`${this.url}/byName/${name}/?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   public getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): Observable<Guardianship[]> {
      return this.http.get<Guardianship[]>(`${this.url}?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   getById(id?: number): Observable<Guardianship> {
      throw new Error("Method not implemented.");
   }
}
