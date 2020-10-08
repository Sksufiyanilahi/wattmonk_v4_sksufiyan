import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { LoginModel } from './model/login.model';
import { Observable, Subject, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { SolarMake } from './model/solar-make.model';
import { SolarMadeModel } from './model/solar-made.model';
import { InverterMakeModel } from './model/inverter-make.model';
import { SurveyDataModel } from './model/survey.model';
import { DesginDataModel } from './model/design.model';
import { InverterMadeModel } from './model/inverter-made.model';
import { AssigneeModel } from './model/assignee.model';
import { SearchModel } from './model/search.model';
import { BaseUrl } from './contants';
import { GOOGLE_API_KEY } from './model/constants';
import { UtilitiesService } from './utilities.service';
import { BehaviorSubject } from 'rxjs';
import { DesignModel } from 'src/app/model/design.model'

import { RoofMaterial } from './model/roofmaterial.model';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public onlineOffline: boolean = navigator.onLine;
  headers: HttpHeaders;
  uploadHeaders: HttpHeaders;
  httpWithoutLoader: HttpClient;
  private parentId = '';
  private userId = '';
  public searchbarElement: string = '';
  public _OnMessageReceivedSubject: Subject<string>;
  public design : Observable<DesignModel>;

  public solarMakeValue: BehaviorSubject<any> = new BehaviorSubject<any>('');


  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private utilities:UtilitiesService
  ) {
    if (!navigator.onLine) {
      // this.utilities.showSnackBar('No internet connection');
      //Do task when no internet connection
      }
      window.addEventListener('online', () => {
        //Do task when internet connection returns
        });

        window.addEventListener('offline', () => {
          //Do task when no internet connection
          this.utilities.errorSnackBar('No internet connection');
          });
    this.resetHeaders();
    this._OnMessageReceivedSubject = new Subject<string>();
  }
  
 /**
 * emits a message. 
 */
  public emitMessageReceived(msg: string): void {
    this._OnMessageReceivedSubject.next(msg);
  }
  login(data: any): Observable<LoginModel> {
    this.resetHeaders();
    return this.http.post<LoginModel>(BaseUrl + '/auth/local', data, { headers: this.headers });
  }

  sendForgotPasswordLink(data: any) {
    return this.http.post(BaseUrl + '/auth/forgot-password', data, { headers: this.headers });
  }

  getSolarMake() {
    return this.http.get<SolarMake[]>(BaseUrl + '/modulemakes', { headers: this.headers });
  }
  postSolarMake(data){
    return this.http.post<SolarMake[]>(BaseUrl + '/modulemakes',data, { headers: this.headers });
  }

  getRoofMaterial() {
    return this.http.get<SolarMake[]>(BaseUrl + '/roofmaterials', { headers: this.headers });
  }

  getSolarMade(id: number) {
    return this.http.get<SolarMadeModel[]>(BaseUrl + '/modulemodels?modulemake.id_eq=' + id, { headers: this.headers });
  }

  postSolarMade(data){
    return this.http.post<SolarMadeModel[]>(BaseUrl + '/modulemodels' ,data, { headers: this.headers });
  }

  getInverterMake() {
    return this.http.get<InverterMakeModel[]>(BaseUrl + '/invertermakes', { headers: this.headers });
  }

  postInverterMake(data){
    return this.http.post<InverterMakeModel[]>(BaseUrl + '/invertermakes',data, { headers: this.headers });
  }

  postInverterMade(data){
    return this.http.post<InverterMadeModel[]>(BaseUrl + '/invertermodels', data,{ headers: this.headers });

  }

  getUtilities() {
    return this.http.get<InverterMakeModel[]>(BaseUrl + '/utilities', { headers: this.headers });
  }

  addUtility(data: any): Observable<InverterMakeModel> {
    return this.http.post<InverterMakeModel>(BaseUrl + '/utilities', data, { headers: this.headers });
  }

  getRoofMaterials() {
    return this.http.get<RoofMaterial[]>(BaseUrl + '/roofmaterials', { headers: this.headers });
  }

  getInverterMade(id): Observable<InverterMadeModel[]> {
    console.log(id);
    return this.http.get<InverterMadeModel[]>(BaseUrl + '/invertermodels?invertermake.id_eq=' + id, { headers: this.headers });
  }

  addDesginForm(data: any): Observable<DesginDataModel> {
    return this.http.post<DesginDataModel>(BaseUrl + '/designs', data, { headers: this.headers });
  }

  updateDesignForm(data: any, id: number): Observable<DesginDataModel> {
    return this.http.put<DesginDataModel>(BaseUrl + '/designs/' + id, data, { headers: this.headers });
  }

  getDesgin() {
    return this.http.get<DesginDataModel[]>(BaseUrl + '/userdesigns?id=' + this.userId, { headers: this.headers });
  }

  getDesginDetail(id): Observable<DesginDataModel> {
    return this.http.get<DesginDataModel>(BaseUrl + '/designs/' + id, { headers: this.headers });
  }

  deleteDesign(id): Observable<DesginDataModel> {
    return this.http.delete<DesginDataModel>(BaseUrl + '/designs/' + id, { headers: this.headers });
  }

  getSurvey() {
    return this.http.get<SurveyDataModel[]>(BaseUrl + '/usersurveys?id=' + this.userId, { headers: this.headers });
  }

  getSurveyDetail(id): Observable<SurveyDataModel> {
    return this.http.get<SurveyDataModel>(BaseUrl + '/surveys/' + id, { headers: this.headers });
  }

  deleteSurvey(id): Observable<SurveyDataModel> {
    return this.http.delete<SurveyDataModel>(BaseUrl + '/surveys/' + id, { headers: this.headers });
  }

  updateSurveyForm(data: any, id: number): Observable<SurveyDataModel> {
    return this.http.put<SurveyDataModel>(BaseUrl + '/surveys/' + id, data, { headers: this.headers });
  }

  getSurveyorSurveys(search : string) {
    return this.http.get<SurveyDataModel[]>(BaseUrl + '/usersurveys?id=' + this.userId + '&' + search, { headers: this.headers });
  }
  getDesignSurveys(search : string) {
    return this.http.get(BaseUrl + '/userdesigns?id=' + this.userId + '&' + search, { headers: this.headers });
  }
  getAnalystDesign(search :string){
    return this.http.get<DesginDataModel[]>(BaseUrl+'/userdesign?id='+this.userId+'&'+search,{headers:this.headers});
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
    return this.http.post<SurveyDataModel>(BaseUrl + '/surveys', data, { headers: this.headers });
  }

  getSurveyors(): Observable<AssigneeModel[]> {
    return this.http.get<AssigneeModel[]>(BaseUrl + '/surveyors?parent_eq=' + this.parentId, { headers: this.headers });
  }

  searchAllDesgin(searchterm): Observable<SearchModel> {
    return this.http.get<SearchModel>(BaseUrl + '/globalsearch?term=' + searchterm, { headers: this.headers });
  }

  getDesigners(): Observable<AssigneeModel[]> {
    return this.http.get<AssigneeModel[]>(BaseUrl + '/designers?parent_eq=' + this.parentId, { headers: this.headers });
  }

  uploadImage(surveyId: number, key: string, blob: Blob, fileName: string) {
    const data = new FormData();
    data.append('files', blob, fileName);
    data.append('path', 'survey/' + surveyId);
    data.append('refId', surveyId + '');
    data.append('ref', 'survey');
    data.append('field', key);

    console.log("file upload data---"+data);

    return this.http.post(BaseUrl + '/upload', data, { headers: this.uploadHeaders });
  }
  uploadDeclineImage(designId: number, key: string, blob: Blob, fileName: string) {
    const data = new FormData();
    data.append('files', blob, fileName);
    data.append('path', 'designs/' + designId);
    data.append('refId', designId + '');
    data.append('ref', 'design');
    data.append('field', key);

    console.log("file upload data---"+data);

    return this.http.post(BaseUrl + '/upload', data, { headers: this.uploadHeaders });
  }
  uploaddesign(data) {
    return this.http.post(BaseUrl + '/upload', data, { headers: this.uploadHeaders });
  }

  resetpassword(data){
    return this.http.post(BaseUrl + '/auth/reset-password',data,{ headers: this.uploadHeaders });
  }
  changepassword(data){
    return this.http.post(BaseUrl + '/auth/set-password',data,{ headers: this.uploadHeaders });
  }

  updateresetpassword(userId,data){
    return this.http.put(BaseUrl + '/users/'+ userId,data,{ headers: this.uploadHeaders });
  }

  updateUser(id, data){
    return this.http.put(BaseUrl + '/users/'+ id, data, { headers: this.uploadHeaders } );
  }

  profileNotification(){
    return this.http.get(BaseUrl + '/notifications/user/' + this.userId,{ headers: this.headers })
  }
  getGoogleImage(lat:number, lng:number): Observable<Blob> {
    var imageurl = "https://maps.googleapis.com/maps/api/staticmap?zoom=19&size=1200x1600&scale=4&maptype=satellite&center=" + lat + ","+ lng + "&key=" + GOOGLE_API_KEY;
    return this.http.get(imageurl, { responseType: 'blob' });
  }

  deletePrelimImage(id){
    return this.http.delete(BaseUrl + "upload/files/" + id,{ headers: this.headers });
  }

  rechargePost(data){
    return this.http.post(BaseUrl + "recharges/" ,data, { headers: this.headers });
  }

  activityDetails(designid){
    return this.http.get(BaseUrl+ "designs/" + designid, { headers: this.headers});
  }

  publishSolarMake(value){
    this.solarMakeValue.next(value);
  }

  editDesign(id, inputData): Observable<DesignModel>{
   
    return this.http
    .put<DesignModel>(BaseUrl + "designs/"+ id, inputData, {
      
      observe: "response"
    })
    .pipe(
      map(value => {
        const member: DesignModel = value.body;
        return member;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        //   this.utils.showApiError(err.error.message);
        return throwError(err.error.message);
      })
    );
  }

  
}
