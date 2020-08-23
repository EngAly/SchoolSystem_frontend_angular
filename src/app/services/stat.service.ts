import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class StatService {

   private url: string

   constructor(private http: HttpClient, private root: SharedService) {
      this.url = this.root.getRootUrl() + "school/stat";
   }

   public getSchoolStat(): Observable<any[]> {
      return this.http.get<any>(`${this.url}`);
   }

   public getStudentStat(): Observable<any[]> {
      return this.http.get<any>(`${this.url}/student`);
   }
}
