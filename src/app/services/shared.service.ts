import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // switch it in develop mode
  // private rootUrl: string = "http://localhost:8080/";

  // switch it in deployment mode
  private rootUrl: string = "http://localhost:8088/school/";
 
  getRootUrl() {
    return this.rootUrl;
  }
}
