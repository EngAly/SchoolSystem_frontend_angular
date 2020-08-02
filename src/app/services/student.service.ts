import { Injectable } from '@angular/core';
import { IServiceMethods } from '../interfaces/IServiceMethods';
import { Student } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService implements IServiceMethods<Student> {
  /**
   * Method not implemented
   * @param pageSize 
   * @param page 
   * @param sortBy 
   * @param direction 
   */
  getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): Observable<Student[]> {
    throw new Error("Method not implemented.");
  }

  private url: string

  constructor(private http: HttpClient, private root: SharedService) {
    this.url = this.root.getRootUrl() + "student";
  }

  public async add(student: Student): Promise<boolean> {
    let flag: boolean = false;
    await this.http.post(`${this.url}/add`, student, { observe: 'response' }).toPromise()
      .then((response) => {
        response.status == 200 ? flag = true : flag;
      }).catch((err) => {
        flag = false;
        console.log(err)
      })
    return flag
  }

  public getByName(name: string, page = 0, sortBy = "id", direction = "asc", pageSize = 8): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/byName/${name}/?pageSize=${pageSize}&page=${page}&sort=${sortBy}&direction=${direction}`);
  }

  public findById(id = 1): Observable<Student> {
     return this.http.get<Student>(`${this.url}/byId/${id}`);
  }



}
