import { Observable } from 'rxjs';

export interface BusinessAbstracts<T> {
    add(t: T): Promise<boolean>;
    getAll(pageSize?: number, page?: number, sortBy?: string, direction?: string): Observable<T[]>;
    getById(id?: number): Observable<T>;
 }