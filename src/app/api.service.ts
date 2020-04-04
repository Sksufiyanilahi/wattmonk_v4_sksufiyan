import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { LoginModel } from "./model/login.model";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";
import { SolarMake } from './model/solar-make.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders;
  baseUrl = 'http://ec2-3-17-28-7.us-east-2.compute.amazonaws.com:1337';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  login(data: any): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl + '/auth/local', data, { headers: this.headers });
  }

  sendForgotPasswordLink(data: any) {
    return this.http.post(this.baseUrl + '/auth/forgot-password', data, { headers: this.headers });
  }

  getSolarMake() {
    return this.http.get<SolarMake[]>(this.baseUrl + '/modulemakes', { headers: this.headers })
  }

  refreshHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storageService.getJWTToken()
    });
  }
}
