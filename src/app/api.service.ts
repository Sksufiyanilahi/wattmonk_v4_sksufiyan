import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { LoginModel } from "./model/login.model";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders;
  baseUrl = 'http://ec2-52-15-84-24.us-east-2.compute.amazonaws.com:1337';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  login(data: any): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl + '/auth/local', data, { headers: this.headers })
  }

  sendForgotPasswordLink(data: any) {
    return this.http.post(this.baseUrl + '/auth/forgot-password', data, { headers: this.headers })
  }

  refreshHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getJWTToken()
    });
  }
}
