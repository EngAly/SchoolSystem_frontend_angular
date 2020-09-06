import { Observable } from 'rxjs';

export interface BusinessAbstracts<T> {
   add(t: T): Promise<number>

   update(t: T): Promise<number>

   getById(id?: number): Observable<T>

   getByName(name: string, pageSize?: number, page?: number, sortBy?: string, direction?: string): Observable<T[]>

   getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): Observable<T[]>

   deleteById(id: number)
}