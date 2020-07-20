import { Injectable } from '@angular/core';
import { IServiceMethods } from '../interfaces/IServiceMethods';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Level } from '../models/Level';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LevelService implements IServiceMethods<Level> {

    private url: string

    constructor(private http: HttpClient, private root: SharedService) {
        this.url = this.root.getRootUrl() + "level";
    }

    public async add(level: Level): Promise<boolean> {
        let flag: boolean = false;
        await this.http.post(`${this.url}/add`, level, { observe: 'response' }).toPromise()
            .then((response) => {
                response.status == 200 ? flag = true : flag;
            }).catch((err) => {
                flag = false;
                console.log(err)
            })
        return flag
    }

    public getByName(name: string): Observable<Level[]> {
        return this.http.get<Level[]>(`${this.url}/byName/${name}`);
    }



    public getAll(): Observable<Level[]> {
        return this.http.get<Level[]>(`${this.url}`);
    }

}
