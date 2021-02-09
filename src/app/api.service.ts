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
import { BaseUrl,PlatformUpdateUrl } from './contants';
import { GOOGLE_API_KEY } from './model/constants';
import { UtilitiesService } from './utilities.service';
import { BehaviorSubject } from 'rxjs';
import { DesignModel } from 'src/app/model/design.model'

import { RoofMaterial } from './model/roofmaterial.model';
import { map, catchError } from 'rxjs/operators';
import { User} from 'src/app/model/user.model'
import { AuthGuardService } from './auth-guard.service';
import { DesignStatistic } from './model/designstats.model';
import { DesignersStatistics } from './model/designerstats.model';
import { AnalystStatistics } from './model/analyststats.model';
import { ROLES } from './contants';
import { Clients } from './model/clients.model';
import { Pestamp } from './model/pestamp.model';
import { UploadedFile } from './model/uploadedfile.model';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat/CometChat';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  callData:any;
  public onlineOffline: boolean = navigator.onLine;
  headers: HttpHeaders;
  uploadHeaders: HttpHeaders;
  httpWithoutLoader: HttpClient;
  private parentId = '';
  private userId = '';
  public searchbarElement: string = '';
  public _OnMessageReceivedSubject: Subject<string>;
  public design : Observable<DesignModel>;
  public showUserName:Subject<any>;

  public solarMakeValue: BehaviorSubject<any> = new BehaviorSubject<any>('');
  version = new BehaviorSubject<string>('');


  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private utilities:UtilitiesService,
    private auth: AuthGuardService,
    private navCtrl:NavController,
    private router:Router,
    // private route: ActivatedRoute
  ) {
    // this.listencall();
    this.getUpgradeMessage();
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
    this.showUserName= new Subject<any>();
  }
  
 /**
 * emits a message. 
 */
  public emitMessageReceived(msg: string): void {
    this._OnMessageReceivedSubject.next(msg);
  }

  emitUserNameAndRole(data:any){
    this.showUserName.next(data);
  }


  getUserName():Subject<any>{
    return this.showUserName;
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
    return this.http.get<SurveyDataModel[]>(BaseUrl + '/usersurveys?id=' + this.userId + '&' + search , { headers: this.headers });
  }
  getDesignSurveys(search : string,limit,skip) {
    return this.http.get(BaseUrl + '/userdesigns?id=' + this.userId + '&' + search +'&limit='+ limit +'&skip='+ skip, { headers: this.headers });
  }
  getAnalystDesign(search :string){
    return this.http.get<DesginDataModel[]>(BaseUrl+'/userdesign?id='+this.userId+'&'+search,{headers:this.headers});
  }
  getProfileDetails(){
    return this.http.get<DesginDataModel[]>(BaseUrl+'/users/me',{headers:this.headers});
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

  getAnalysts(): Observable<AssigneeModel[]> {
    return this.http.get<AssigneeModel[]>(BaseUrl + '/analysts?parent_eq=' + this.parentId , { headers: this.headers });
  }

  searchAllDesgin(searchterm): Observable<SearchModel> {
    return this.http.get<SearchModel>(BaseUrl + '/globalsearch?term=' + searchterm + '&userid=' + this.userId, { headers: this.headers });
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
  uploadlogo(blob: Blob, fileName: string) {
    const data = new FormData();
    data.append('files', blob,fileName);
    data.append('path', this.userId + '/logo');
    data.append('refId', ''+ this.userId);
    data.append('ref', 'user');
    data.append('field', 'logo');
    data.append('source', 'users-permissions');

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
  getCountOfUnreadNotifications(){
    return this.http.get(BaseUrl+ "/Notifications/count?user=" + this.userId + "&status=unread", { headers: this.headers});
  }
  profileNotification(){
    return this.http.get(BaseUrl + '/notifications?user=' + this.userId + "&_sort=created_at:DESC",{ headers: this.headers })
  }

  updateNotification(id,status){
    return this.http.put(BaseUrl + '/notifications/' + id,status,{ headers: this.headers })
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

  design_activityDetails(designid){
    return this.http.get(BaseUrl+ "designs/" + designid, { headers: this.headers});
  }

  pestamp_activityDetails(designid){
    return this.http.get(BaseUrl+ "/pestamps/" + designid, { headers: this.headers});
  }
  createPayment(data){
    return this.http.post(BaseUrl + '/createpayment',data,{ headers: this.uploadHeaders });
  }
  recharges(data){
    return this.http.post(BaseUrl + '/recharges',data,{ headers: this.uploadHeaders });
  }
  paymentDetail(C_id){
    return this.http.get(BaseUrl+ "/designs/count?createdby=" + C_id + "&isoutsourced=true&outsourcedto=232", { headers: this.headers});}
 
   
    prelimCharges(){
      return this.http.get(BaseUrl+ "commonsettings?settingname=prelimdesigncharges", { headers: this.headers});}

      permitinitcharges(){
        return this.http.get(BaseUrl+ "commonsettings?settingname=permitdesigncharges", { headers: this.headers});}
   
    permitCharges(data){
      return this.http.post(BaseUrl+ "getdesignservicecharge",data, { headers: this.headers});}
     
      freeCharges(){
        return this.http.get(BaseUrl+ "commonsettings?settingname=freedesigns ", { headers: this.headers});}
   
    survey_activityDetails(surveyid){
     return this.http.get(BaseUrl+ "surveys/" + surveyid, { headers: this.headers});
  
  }
  publishSolarMake(value){
    this.solarMakeValue.next(value);
  }

  editDesign(id:number, inputData:any): Observable<DesignModel>{
   
    return this.http
    .put<DesignModel>(BaseUrl + "/designs/"+ id, JSON.stringify(inputData), {
      headers: this.headers,
      
    })
  
  }

  pushtoken(id,data){
    return this.http.put(BaseUrl + '/users/pushtokens/'+ id, data, { headers: this.uploadHeaders } );
  }

  getTeamData(): Observable<User[]> {
    return this.http.get<User[]>(BaseUrl + "/users?_sort=created_at:desc&parent="+this.parentId+"&id_ne="+this.parentId, {
      headers: this.headers,
   
    })
   
  
    }

    update_message(){
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storageService.getJWTToken()
      });
      console.log(this.headers);
      return this.http.get(BaseUrl + '/platformupdates?status=true&_limit=1&_sort=id:desc&platformtype=app',{ headers: this.headers})  
    }

    getUpgradeMessage(){
      this.update_message().subscribe(res=>{
        console.log(res);
        this.version.next(res[0].appversion);
      })
    }

    getStatistic(inputData:any):Observable<DesignStatistic[]>{
 
      return this.http.post<DesignStatistic[]>(BaseUrl + '/designanalytics', inputData, { headers: this.headers });
    }
  
    getClientSuperadmin(): Observable<User[]> {
     // return this.http.get<User[]>(BaseUrl + "fetchsuperadmins", {
     //   headers: this.headers,
     //   observe: "response"
     // });
     return this.http.get<User[]>(BaseUrl + '/fetchsuperadmins',{headers:this.headers});
    }
  
    getDesignersDetails(starttime:string, endtime:string, requesttype:string):Observable<DesignersStatistics[]>{
      return this.http.get<DesignersStatistics[]>(BaseUrl + '/getdesignanalytics?starttime='+starttime+'&endtime='+endtime+'&companyid=232&requesttype='+requesttype, {headers:this.headers});
    }

    getanalystanalytics(starttime:string, endtime:string, requesttype:string):Observable<AnalystStatistics[]>{
      return this.http.get<AnalystStatistics[]>(BaseUrl + '/getanalystanalytics?starttime='+starttime+'&endtime='+endtime+'&companyid=232&requesttype='+requesttype, { headers: this.headers});
    }

    getDesignerDesignsForStats(startdate:string, enddate:string, requesttype:string, id:number){
      return this.http.get(BaseUrl + '/getdesignerdesigns?status=delivered&designerid='+id+'&startdate='+startdate+'&enddate='+enddate+'&requesttype='+requesttype,{headers: this.headers});
    }

    getAnalystDesignsForStats(startdate:string, enddate:string, requesttype:string, id:number){
      return this.http.get(BaseUrl + '/getanalystdesigns?status=delivered&analystid='+id+'&startdate='+startdate+'&enddate='+enddate+'&requesttype='+requesttype,{headers: this.headers});
    }

    sendPrelimEmails(data:any){
      return this.http.post(BaseUrl+"/designs/send-prelim-design", data,{headers:this.headers})
    }

    sendPermitEmails(data:any){
      return this.http.post(BaseUrl+"/designs/send-permit-design", data,{headers:this.headers})
    }

    getUserData(id){
      return this.http.get(BaseUrl + "/users/" + id,{headers: this.headers})
    }
    
    getCoupons(data){
      return this.http.get(BaseUrl + "/getCoupons?userid="+ this.userId+"&requesttype="+data,{headers: this.headers});
    }
    sendCoupon(data:any){
      return this.http.post(BaseUrl+"/getCoupon", data,{headers:this.headers})
    }

    addUser(
      workemail: String,
      firstname: String,
      lastname: String,
      permissiontomakedesign:boolean,
      role: number,
      minpermitaccess: boolean
      // address: String,
      // country: String,
      // callingcode: number
    ): Observable<User> {
      var randomPassword = this.utilities.randomPass();
      var parentid = 0;
      //this.parentId = this.storageService.getParentId();
      var user = this.storageService.getUser();
      if (user.role.id == ROLES.SuperAdmin || user.role.id == ROLES.ContractorSuperAdmin){
        parentid = user.id;
      }else{
        parentid = user.parent.id;
      }
      const postData = {
        firstname: firstname,
        lastname: lastname,
        email: workemail,
        permissiontomakedesign:permissiontomakedesign,
        password: randomPassword,
        resetPasswordToken: randomPassword,
        source: "android",
        username: workemail,
        confirmed : true,
        isdefaultpassword: true,
        role: role,
        minpermitdesignaccess: minpermitaccess,
        provider: "local",
        parent: parentid,
        company: this.storageService.getUser().company,//user.company,
        addedby: this.storageService.getUser().id//.currentUserValue.user.id
      };
      console.log(postData)
      return this.http
        .post<User>(BaseUrl + "/users", JSON.stringify(postData), {
          headers: this.headers,
         // observe: "response"
        })
        // .pipe(
        //   map(value => {
        //     const member: User = value.body;
        //     return member;
        //   }),
        //   catchError((err: HttpErrorResponse) => {
        //   if(err.error.error == "Unauthorized"){
        //     this.genericService.handleusersignout();
        //   }else{
        //     return throwError(err.error.message);
        //   }
        // })
        // );
    }

    getClients(){
      return this.http.get<Clients[]>(BaseUrl + "/getclients",{headers: this.headers});
    }

    addSiteAssessment(postData){
      return this.http.post<Pestamp>(BaseUrl + "/pestamps",JSON.stringify(postData),{headers:this.headers});
    }

    uploadFile(data): Observable<UploadedFile[]> {
     
      // const data = new FormData();
      // data.append('files', blob, file);
      // data.append('path', path);
      // data.append('refId', ""+recordid);
      // data.append('ref', ref);
      // data.append('field', field);
      
      // console.log("file upload data---"+data);

      return this.http.post<UploadedFile[]>(BaseUrl + "/upload", data, {
          headers: this.uploadHeaders,
        })
    }

    /* SEARCH PE STAMP DESIGNS */
    getFilteredDesigns(search:string): Observable<Pestamp[]> {
    
      return this.http.get<Pestamp[]>(BaseUrl + "/userpestamps?id="+this.storageService.getUser().id+"&"+search, {
        headers: this.headers,
        //observe: "response"
      })
    }

    getPestampDetails(id:number): Observable<Pestamp> {
      return this.http.get<Pestamp>(BaseUrl + "/pestamps/"+id, {
        headers: this.headers
      })
    }

    /* Get Pe Engineers */
    getPeEngineers(peenginertype:string) {
      console.log(peenginertype);
      return this.http.get(BaseUrl + "/peengineers?pestamptype="+peenginertype+"&parent_eq="+this.storageService.getUser().parent.id, {
        headers: this.headers,
      })
    }

    /* Assign to PeEngineer */
    assignPestamps(id:number,inputData: any): Observable<Pestamp> {
      return this.http.put<Pestamp>(BaseUrl + "/pestamps/"+id, JSON.stringify(inputData), {
          headers: this.headers
        })
      }

      updatePestamps(id:number,inputData?: any): Observable<Pestamp> {
        return this.http.put<Pestamp>(BaseUrl + "/pestamps/"+id, JSON.stringify(inputData), {
            headers: this.headers
          })
        }

      deletePestamp(id:string): Observable<Pestamp> {
        return this.http.delete<Pestamp>(BaseUrl + "/pestamps/"+id, {
          headers: this.headers
        })
      }
    getcounts(id){
      return this.http.get(BaseUrl + '/dashboarddesigncount?id=' + id,{headers: this.headers});
    }

    getPeStampCharges(searchData)
    {
      return this.http.get(BaseUrl + '/commonsettings?settingname=' + searchData,{headers:this.headers});
    }

    createdirectpayment(inputData){
      return this.http.post<any>(BaseUrl+"/Pestampdirectpayment", inputData,{
        headers: this.uploadHeaders
       })
      }

      createPestamppayment(inputData:any): Observable<Pestamp>{
        return this.http.post<Pestamp>(BaseUrl+"/pestampdeliverychargespayment", inputData,{
         headers: this.uploadHeaders
        })
      }

      createCommercialPestamppayment (inputData:any): Observable<Pestamp>{
        return this.http.post<Pestamp>(BaseUrl+"/deliveredcommercialpestampayment", inputData,{
         headers: this.uploadHeaders
        })
      }

      getPendingPaymentstatus(){
        return this.http.get(BaseUrl + "paymentpendingpestamps?creatorparentid="+this.storageService.getUser().parent.id, {
          headers: this.headers
        })
      }

      listencall(listnerID) {
      // let listnerID = localStorage.getItem('gid');
        const that= this;
        CometChat.addCallListener(
          listnerID,
          new CometChat.CallListener({
            onIncomingCallReceived(call) {
              console.log('Incoming call:', call);
              that.callData = call;
              // if(call.status=='initiated'){
                that.router.navigate(['/', 'callingscreen']);
              // }
              // Handle incoming call
            },
            onOutgoingCallAccepted(call) {
              console.log('Outgoing call accepted:', call);
              that.callData = call;
              // Outgoing Call Accepted
            },
            onOutgoingCallRejected(call) {
              console.log('Outgoing call rejected:', call);
              that.callData = call;
              // Outgoing Call Rejected
              that.navCtrl.pop();
            },
            onIncomingCallCancelled(call) {
              console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
              
              console.log('Incoming call calcelled:', call);
              console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
              that.callData = call;
        
                // that.location.back();
                that.navCtrl.pop();
      
              
            }
          })
        );
      }
  
      getCallData(): Observable<any> {
        return this.callData;
  }
}
