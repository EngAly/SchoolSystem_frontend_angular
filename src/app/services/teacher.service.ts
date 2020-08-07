import { Injectable } from '@angular/core';
import { Teacher } from '../models/Teacher';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

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


  getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): import("rxjs").Observable<Teacher[]> {
    throw new Error("Method not implemented.");
  }
  getById(id?: number): import("rxjs").Observable<Teacher> {
    throw new Error("Method not implemented.");
  }


}
