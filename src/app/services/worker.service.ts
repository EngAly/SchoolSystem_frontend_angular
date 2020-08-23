import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';
import { Worker } from '../models/Worker';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';

@Injectable({
   providedIn: 'root'
})
export class WorkerService implements BusinessAbstracts<Worker> {


   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "worker";
   }

   public async add(worker: Worker): Promise<boolean> {
      let flag: boolean = false;
      await this.http.post(`${this.url}/add`, worker, { observe: 'response' }).toPromise()
         .then((response) => {
            response.status == 200 ? flag = true : flag;
         }).catch((err) => {
            flag = false;
            console.log(err)
         })
      return flag
   }

   public getAll(): Observable<Worker[]> {
      return this.http.get<Worker[]>(`${this.url}`);
   }

   public getByName(name: string, page = 0, pageSize = 8, sortBy = "id", direction = "asc"): Observable<Worker[]> {
      return this.http.get<Worker[]>(`${this.url}/byName/${name}/?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
   }

   getById(id?: number): Observable<Worker> {
      return this.http.get<Worker>(`${this.url}/byId/${id}`);
   }
}
