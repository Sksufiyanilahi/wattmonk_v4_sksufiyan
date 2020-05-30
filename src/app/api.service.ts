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
  uploadHeaders: HttpHeaders;
  baseUrl = 'http://ec2-3-17-28-7.us-east-2.compute.amazonaws.com:1337';
  private parentId = '';
  private userId = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.resetHeaders();
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

  getRoofMaterial() {
    return this.http.get<SolarMake[]>(this.baseUrl + '/roofmaterials', { headers: this.headers });
  }

  getSolarMade(id: number) {
    return this.http.get<SolarMadeModel[]>(this.baseUrl + '/modulemodels?modulemake.id_eq=' + id, { headers: this.headers });
  }

  getInverterMake() {
    return this.http.get<InverterMakeModel[]>(this.baseUrl + '/invertermakes', { headers: this.headers });
  }

  getUtilities() {
    return this.http.get<InverterMakeModel[]>(this.baseUrl + '/utilities', { headers: this.headers });
  }

  getInverterMade(id): Observable<InverterMadeModel[]> {
    console.log(id);
    return this.http.get<InverterMadeModel[]>(this.baseUrl + '/invertermodels?invertermake.id_eq=' + id, { headers: this.headers });
  }

  addDesginForm(data: any): Observable<DesginDataModel> {
    return this.http.post<DesginDataModel>(this.baseUrl + '/designs', data, { headers: this.headers });
  }

  updateDesignForm(data: any, id: number): Observable<DesginDataModel> {
    return this.http.put<DesginDataModel>(this.baseUrl + '/designs/' + id, data, { headers: this.headers });
  }

  getDesgin() {
    return this.http.get<DesginDataModel[]>(this.baseUrl + '/userdesigns?id=' + this.userId, { headers: this.headers });
  }

  getDesginDetail(id): Observable<DesginDataModel> {
    return this.http.get<DesginDataModel>(this.baseUrl + '/designs/' + id, { headers: this.headers });
  }

  deleteDesign(id): Observable<DesginDataModel> {
    return this.http.delete<DesginDataModel>(this.baseUrl + '/designs/' + id, { headers: this.headers });
  }

  getSurvey() {
    return this.http.get<SurveyDataModel[]>(this.baseUrl + '/usersurveys?id=' + this.userId, { headers: this.headers });
  }

  getSurveyDetail(id): Observable<SurveyDataModel> {
    return this.http.get<SurveyDataModel>(this.baseUrl + '/surveys/' + id, { headers: this.headers });
  }

  deleteSurvey(id): Observable<SurveyDataModel> {
    return this.http.delete<SurveyDataModel>(this.baseUrl + '/surveys/' + id, { headers: this.headers });
  }

  updateSurveyForm(data: any, id: number): Observable<SurveyDataModel> {
    return this.http.put<SurveyDataModel>(this.baseUrl + '/surveys/' + id, data, { headers: this.headers });
  }

  refreshHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storageService.getJWTToken()
    });
    this.uploadHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.storageService.getJWTToken()
    });
    this.parentId = this.storageService.getParentId();
    this.userId = this.storageService.getUserID();
  }

  resetHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.uploadHeaders = new HttpHeaders();
    this.parentId = '';
    this.userId = '';
  }

  saveSurvey(data: any): Observable<SurveyDataModel> {
    return this.http.post<SurveyDataModel>(this.baseUrl + '/surveys', data, { headers: this.headers });
  }

  getSurveyors(userType: number): Observable<AssigneeModel[]> {
    return this.http.get<AssigneeModel[]>(this.baseUrl + '/surveyors?parent_eq=' + this.parentId + '&role_eq=' + userType, { headers: this.headers });
  }

  searchAllDesgin(searchterm) {
    return this.http.get(this.baseUrl + '/globalsearch?term=' + searchterm , { headers: this.headers });
  }

  getDesigners(userType: number): Observable<AssigneeModel[]> {
    return this.http.get<AssigneeModel[]>(this.baseUrl + '/designers?parent_eq=' + this.parentId + '&role_eq=' + userType, { headers: this.headers });
  }

  uploadImage(surveyId: number, key: string, blob: Blob, fileName: string) {
    const data = new FormData();
    data.append('files', blob);
    data.append('path', '');
    data.append('refId', surveyId + '');
    data.append('ref', 'survey');
    data.append('field', key);
    data.append('name', fileName);

    return this.http.post(this.baseUrl + '/upload', data, { headers: this.uploadHeaders });
  }
}
