import { Injectable } from '@angular/core';
import { Teacher } from '../models/Teacher';
import { BusinessAbstracts } from '../interfaces/BusinessAbstracts';

@Injectable({
  providedIn: 'root'
})
export class TeacherService implements BusinessAbstracts<Teacher>{
  add(t: Teacher): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): import("rxjs").Observable<Teacher[]> {
    throw new Error("Method not implemented.");
  }
  getById(id?: number): import("rxjs").Observable<Teacher> {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
