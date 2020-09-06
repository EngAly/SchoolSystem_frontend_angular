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
   private flag: number;

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "worker";
   }

   public async add(worker: Worker): Promise<number> {
      await this.http.post(`${this.url}/add`, worker, { observe: 'response' }).toPromise()
         .then((response) => {
            this.flag = response.status;
         }).catch((err) => {
            this.flag = err.status;
            console.log(err)
         })
      return this.flag;
   }

   public async update(worker: Worker): Promise<number> {
      let flag: number;
      await this.http.put(`${this.url}/update`, worker, { observe: 'response' }).toPromise()
         .then((response) => {
            flag = response.status;
         }).catch((err) => {
            flag = err.status;
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

   getById(id: number): Observable<Worker> {
      return this.http.get<Worker>(`${this.url}/byId/${id}`);
   }

   public deleteById(id: number) {
      return this.http.delete(`${this.url}/delete/${id}`);
   }
}
