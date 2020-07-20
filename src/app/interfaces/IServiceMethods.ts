import { Observable } from 'rxjs';

export interface IServiceMethods<T> {
    add(t: T): Promise<boolean>;
    getAll(): Observable<T[]>;
}