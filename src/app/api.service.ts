import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { LoginModel } from './model/login.model';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { SolarMake } from './model/solar-make.model';
import { SolarMadeModel } from './model/solar-made.model';
import { InverterMakeModel } from './model/inverter-make.model';
import { SurveyModel, SurveyDataModel } from './model/survey.model';
import { DesginDataModel } from './model/design.model';
import { InverterMadeModel } from './model/inverter-made.model';
import { AssigneeModel } from './model/assignee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders;
  baseUrl = 'http://ec2-3-17-28-7.us-east-2.compute.amazonaws.com:1337';
  private parentId = '';

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
    return this.http.get<SolarMake[]>(this.baseUrl + '/modulemakes', { headers: this.headers });
  }

  getSolarMade(id: number) {
    return this.http.get<SolarMadeModel[]>(this.baseUrl + '/modulemodels?modulemake.id_eq=' + id, { headers: this.headers });
  }

  getInverterMake() {
    return this.http.get<InverterMakeModel[]>(this.baseUrl + '/invertermakes', { headers: this.headers });
  }

  getInverterMade(id): Observable<InverterMadeModel[]> {
    console.log(id);
    return this.http.get<InverterMadeModel[]>(this.baseUrl + '/invertermodels?invertermake.id_eq=' + id, { headers: this.headers });
  }

  addDesginForm(data: any): Observable<DesginDataModel> {
    return this.http.post<DesginDataModel>(this.baseUrl + '/designs', data, { headers: this.headers });
  }

  getDesgin() {
    return this.http.get<DesginDataModel[]>(this.baseUrl + '/designs', { headers: this.headers });
  }

  getDesginDetail(id): Observable<DesginDataModel> {
    return this.http.get<DesginDataModel>(this.baseUrl + '/designs?id=' + id, { headers: this.headers });
  }

  getSurvey() {
    return this.http.get<SurveyDataModel[]>(this.baseUrl + '/surveys', { headers: this.headers });
  }

  refreshHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storageService.getJWTToken()
    });
    this.parentId = this.storageService.getParentId();
  }

  saveSurvey(data: any): Observable<SurveyDataModel[]> {
    return this.http.post<SurveyDataModel[]>(this.baseUrl + '/surveys', data, { headers: this.headers });
  }

  getAssignees(userType: number): Observable<AssigneeModel[]> {
    return this.http.get<AssigneeModel[]>(this.baseUrl + '/users?parent.id_eq=' + this.parentId + '&role.id_eq=' + userType, { headers: this.headers });
  }
}
