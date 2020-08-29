import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Register } from '../models/Register';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class UserService {

   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "register";
   }

   public getByName(username: string, pagesize = 8, page = 0, sortBy = 'id', direction = "asc"): Observable<Register[]> {
      return this.http.get<Register[]>(`${this.url}/byName/${username}?pageSize=${pagesize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   public getDetailsByName(username: string): Observable<Register> {
      return this.http.get<Register>(`${this.url}/details/${username}`);
   }
}
