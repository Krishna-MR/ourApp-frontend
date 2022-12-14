import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:8100/";

var httpLink = {
  getAllUser: apiUrl + "/api/user/getAllUser",
  deleteUserById: apiUrl + "/api/user/deleteUserById",
  getUserDetailById: apiUrl + "/api/user/getUserDetailById",
  saveUser: apiUrl + "/api/user/saveUser"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllUser(): Observable<any> {
    return this.webApiService.get(httpLink.getAllUser);
  }
  public deleteUserById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteUserById + '?employeeId=' + model, "");
  }
  public getUserDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getUserDetailById + '?employeeId=' + model);
  }
  public saveUser(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveUser, model);
  }  
}