import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheObjectService {

  private object = new Object();

  set setObject(object: any) {
    this.object = object;
  }

  get getObject(): any {
    return this.object;
  }

}
