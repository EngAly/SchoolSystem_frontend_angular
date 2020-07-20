import { Injectable } from '@angular/core';
import { IServiceMethods } from '../interfaces/IServiceMethods';
import { Subject } from '../models/Subject';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService implements IServiceMethods<Subject>{

  private url: string

  constructor(private http: HttpClient, private root: SharedService) {
    this.url = this.root.getRootUrl() + "subject";
  }

  public async add(subject: Subject): Promise<boolean> {
    let flag: boolean = false;
    await this.http.post(`${this.url}/add`, subject, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status == 200 ? flag = true : flag;
      }).catch((err) => {
        flag = false;
        console.log(err)
      })
    return flag
  }

  public getByName(name: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.url}/byName/${name}`);
  }

  public getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.url}`);
  }


}
