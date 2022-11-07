import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

import { Pestamp } from 'src/app/models/pestamp.model';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-pestamp-payment-modal',
  templateUrl: './pestamp-payment-modal.page.html',
  styleUrls: ['./pestamp-payment-modal.page.scss'],
})


export class PestampPaymentModalPage implements OnInit {
  public payPalConfig?: IPayPalConfig;
  user
  id: any
  design = 'pestamp';
  count: any
  netPay: any
  freeDesigns: any;
  servicePrice: any = 0;
  settingValue: any = 0;
  freeCharges: any;
  value: number = 50;
  coupondata = null;
  code_discount: any
  discount: any
  userData: any;
  uss: any;
  //counts
  isShow: boolean = false
  newpestamp: Observable<any>;
  newpestampRef: AngularFireObject<any>;
  newpestampscount = 0;

  designData: any;
  data: any;
  assignValue: any;
  serviceCharges: any;
  amounttopay: any;
  createpayment: any;
  deliveryCharges: any;

  public wattmonkadmins: any = [];
  public clientadmins: any = [];

  constructor(private storageService: StorageService,

      private apiService: ApiService,
      public router: Router,
      private route: ActivatedRoute,
      private navController: NavController,
      private utils: UtilitiesService,

      private alertController: AlertController,
      private modalController: ModalController,
      private db: AngularFireDatabase,
      private cdr: ChangeDetectorRef,
      private mixpanelService: MixpanelService
  ) {
      //For Counts
      // this.newpermitsRef = db.object('newpermitdesigns');
      // this.newpermits = this.newpermitsRef.valueChanges();
      // this.newpermits.subscribe(
      //   (res) => {
      //     console.log(res);
      //     this.newpermitscount = res.count;
      //     cdr.detectChanges();
      //   },
      //   (err) => console.log(err),
      //   () => console.log('done!')
      // )
      // //counts
      // this.newprelimsRef = db.object('newprelimdesigns');
      // this.newprelims = this.newprelimsRef.valueChanges();
      // this.newprelims.subscribe(
      //   (res) => {
      //     console.log(res);
      //     this.newprelimscount = res.count;
      //     cdr.detectChanges();
      //   },
      //   (err) => console.log(err),
      //   () => console.log('done!')
      // )
      this.designData = this.router.getCurrentNavigation().extras.state;

      console.log('this.designData', this.designData);

      this.data = this.designData.productdetails.queryParams.designData;
      console.log('this.data', this.data);

      this.assignValue = this.designData.productdetails.queryParams.value;
      this.deliveryCharges = this.data.deliverycharges;

      this.newpestampRef = db.object('newpestamp');
      this.newpestamp = this.newpestampRef.valueChanges();
      this.newpestamp.subscribe(
          (res) => {
              this.newpestampscount = res.count;
              this.cdr.detectChanges();
          },
          (err) => console.log(err),
          () => console.log('done!')
      )

      this.getWattmonkadmins();
      this.getClientsadmins(this.data.creatorparentid);
  }

  ngOnInit() {
      // this.route.queryParams.subscribe(params => {
      //   if (params && params.special) {
      //     this.designData = JSON.parse(params.special);
      //     console.log(this.designData)
      //   }
      // });
      this.paypalintegration();
      this.utils.showLoading("Please wait....").then(() => {



          this.userData = this.storageService.getUser();
          this.mixpanelService.track('PESTAMP_PAYMENT_PAGE_OPEN', {
          });
          this.fetchData();
          // this.servicecharges();
          if (this.assignValue == 'assign') {
              this.getPeStampCharges();
          }
          else {
              this.getCommercialCharges();
          }
      });
      /* this.apiService.getProfileDetails().subscribe(res=>{this.user=res;
       console.log(this.user)
       this.apiService.paymentDetail(this.user.id).subscribe(res=>{
         this.count=res;
         console.log(this.count);
       })});
       this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
       this.design=params.get('designData')});
 
       console.log(this.id);
      console.log(this.design);*/
      setTimeout(() => {
          this.utils.hideLoading();
          this.isShow = true
      }, 2000);

  }
  ionViewDidEnter() {
      this.fetchData();
  }

  getPeStampCharges() {
      var searchdata;
      var bothtypepestampcharges = 0;
      if (this.data.propertytype == 'commercial' && this.data.type == 'structural') {
          searchdata = "structuralcommercialpecharges"
      }
      else if (this.data.propertytype == 'commercial' && this.data.type == 'electrical') {
          searchdata = "electricalcommercialpecharges"
      }
      // else if (this.data.type == 'electrical') {
      //   searchdata = "electricalanymountingpecharges"
      // }
      else if (this.data.type == 'electrical' && this.data.jobtype == 'pv') {
          searchdata = "electricalpvpecharges"
      }
      else if (this.data.type == 'electrical' && this.data.jobtype == 'pvbattery') {
          searchdata = "electricalpvbatterypecharges"
      }
      else if (this.data.type == 'electrical' && this.data.jobtype == 'battery') {
          searchdata = "electricalbatterypecharges"
      }
      else if (this.data.type == 'structural' && this.data.mountingtype == 'both') {
          searchdata = "structuralbothpecharges"
      }
      else if (this.data.type == 'structural' && this.data.mountingtype == 'ground') {
          searchdata = "structuralgroundmountpecharges"
      }
      else if (this.data.type == "structural" && this.data.mountingtype == 'roof') {
          searchdata = "structuralroofpecharges"
      }
      else if (this.data.type == "both") {
          //searchdata = "electricalanymountingpecharges"
          if (this.data.jobtype == 'pv') {
              searchdata = "electricalpvpecharges";
          }
          else if (this.data.jobtype == 'pvbattery') {
              searchdata = "electricalpvbatterymountcharges";
          }
          else if (this.data.jobtype == 'battery') {
              searchdata = "electricalbatterypecharges";
          }
          var structuralsearchdata;
          if (this.data.mountingtype == 'both') {
              structuralsearchdata = "structural" + this.data.mountingtype + "pecharges"
          }
          else if (this.data.mountingtype == 'ground') {
              structuralsearchdata = "structural" + this.data.mountingtype + "mountpecharges"
          }
          else if (this.data.mountingtype == 'roof') {
              structuralsearchdata = "structural" + this.data.mountingtype + "pecharges"
          }
          this.apiService.getPeStampCharges(structuralsearchdata).subscribe(
              response => {

                  bothtypepestampcharges = parseInt(response[0].settingvalue);
              }
          );
      }
      setTimeout(() => {
          this.apiService.getPeStampCharges(searchdata).subscribe((res) => {

              this.servicePrice = res;
              // this.servicePrice.forEach(element => {
              //   this.settingValue = element.settingvalue;
              // });
              if (res[0].settingname == 'commercialanymountingpecharges') {

                  this.settingValue = 0;
                  this.netPay = this.settingValue;
              }
              else {
                  this.settingValue = res[0].settingvalue + bothtypepestampcharges;
                  this.netPay = this.settingValue;

              }
          }
          )
      }, 500);
  }

  getCommercialCharges() {
      this.apiService.getPeStampCharges("commercialanymountingpecharges").subscribe((res) => {

          this.servicePrice = res;

          this.settingValue = res[0].settingvalue;
          this.serviceCharges = this.settingValue * this.data.workinghours;
          //this.netPay = this.settingValue * this.data.workinghours;
          this.getAmounttopay();
      })
  }

  getAmounttopay() {
      if (this.data.propertytype == 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
          this.amounttopay = this.serviceCharges + this.data.deliverycharges;
      }
      else if (this.data.propertytype == 'commercial' && this.data.modeofstamping == 'ecopy') {
          this.amounttopay = this.serviceCharges;
      }
      else if (this.data.propertytype == 'residential' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
          this.amounttopay = this.data.deliverycharges
      }
  }

  fetchData() {
      // this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
      // this.design=params.get('designData')});


      this.apiService.getUserData(this.userData.id).subscribe(res => {
          this.user = res;

      });


      // this.apiService.freeCharges().subscribe(res=>{
      //   this.freeDesigns=res;
      //   this.freeDesigns.forEach(element => {
      //     this.freeCharges = element.settingvalue;
      //   })
      //   console.log("daadd",this.freeCharges);

      // })


      //   console.log(this.id);
      //  console.log(this.design);


  }

  // discountAmount(){
  //   if(this.freeCharges>this.count){
  //     this.discount=this.settingValue;
  //     this.netPay=this.settingValue-this.discount;
  //   }
  //   else if(this.coupondata!=null){
  //     this.discount=this.code_discount;
  //     this.netPay=this.settingValue-this.code_discount;
  //     console.log(this.netPay)
  //   }
  //   else{
  //     this.discount=null;
  //     this.netPay=this.settingValue;
  //     console.log(this.netPay)
  //   }
  // }

  // servicecharges(){
  //   if(this.design=='prelim'){
  //     this.apiService.prelimCharges().subscribe(res=>{
  //       this.servicePrice=res;
  //       this.servicePrice.forEach(element => {
  //         this.settingValue = element.settingvalue;
  //       });
  //       console.log("ddd",this.settingValue)
  //     })}
  //     else{
  //       this.apiService.permitCharges().subscribe(res=>{
  //         this.servicePrice=res;
  //         this.servicePrice.forEach(element => {
  //           this.settingValue = element.settingvalue;
  //         });
  //         console.log("ddd",this.settingValue)
  //       })
  //     }
  //     this.discountAmount();

  // }

  confirm() {
      //if(this.data.id!=null){
      if (this.assignValue == 'clearDues') {
          const inputData = {
              paymenttype: "wallet",
              pestampid: this.data.id,
              user: this.user.id
          }
          if (this.data.propertytype == 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
              this.makeCommercialpayment(inputData);
          }
          else if (this.data.propertytype == 'commercial' && this.data.modeofstamping == 'ecopy') {
              this.makeCommercialpayment(inputData);
          }
          else if (this.data.propertytype != 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
              this.makepayment(inputData);
          }
      }
      else {
          var postData = {};
          var pestampacceptancestarttime = new Date();
          pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
          // if(this.design=='prelim'){
          // designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
          // }
          // else{
          //   designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
          // }
          postData = {
              outsourcedto: 232,
              isoutsourced: "true",
              status: "outsourced",
              pestampacceptancestarttime: pestampacceptancestarttime,
              paymenttype: "wallet"
          };
          this.utils.showLoading("Assigning").then(() => {
              this.apiService.updatePestamps(this.data.id, postData).subscribe(value => {
                  this.createChatGroup(value);
                  //     if(this.design=='prelim')
                  // {
                  //   this.newprelimsRef.update({ count: this.newprelimscount + 1});
                  //   console.log("hello",this.newprelimscount)
                  // }else{
                  //   this.newpermitsRef.update({ count: this.newpermitscount + 1});
                  this.newpestampRef.update({ count: this.newpestampscount + 1 });
                  // }
                  this.utils.hideLoading().then(() => {
                      this.utils.showSnackBar("pe stamp request has been send to WattMonk successfully")
                      //this.navController.pop();
                      //  if(this.design=='prelim'){
                      //    this.router.navigate(['/home/design'])
                      //  this.utils.setHomepageDesignRefresh(true);
                      //  }
                      //  else{
                      //   this.router.navigate(['/permit-home/permit-design'])
                      //    this.utils.setHomepagePermitRefresh(true);
                      //  }
                      this.router.navigate(['/pestamp-home/pestamp-design']);
                      this.utils.setPeStampRefresh(true);
                  })
              })
          })//}
          // else{
          //   if(this.design=='prelim'){
          //     this.utils.setPaymentMode("wallet");
          //   this.utils.setScheduleFormEvent(ScheduleFormEvent.PAY_EVENT);
          //   }
          //   else{
          //     this.utils.setPaymentMode("wallet");
          //     this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
          //   }
          // }
      }
  }

  addWallet(value) {
      if (this.assignValue == 'assign') {
          console.log("assign")
          //this.router.navigate(['/add-money',{mode:value,id:this.data.id,serviceAmount:this.netPay,design:this.design,assignValue:this.assignValue}])
          let objToSend: NavigationExtras = {
              queryParams: {
                  mode: value,
                  id: this.data.id,
                  serviceAmount: this.netPay,
                  design: this.design,
                  assignValue: this.assignValue,
                  fulldesigndata: this.data,
                  //value:'assign'
              },
              skipLocationChange: false,
              fragment: 'top'
          };


          this.router.navigate(['/add-money'], {
              state: { productdetails: objToSend }
          });
      }
      else {
          console.log("deliver")
          //this.router.navigate(['/add-money',{mode:value,id:this.data.id,serviceAmount:this.amounttopay,design:this.design,assignValue:this.assignValue,data:this.data}])
          let objToSend: NavigationExtras = {
              queryParams: {
                  mode: value,
                  id: this.data.id,
                  serviceAmount: this.amounttopay,
                  design: this.design,
                  assignValue: this.assignValue,
                  fulldesigndata: this.data,
                  //value:'assign'
              },
              skipLocationChange: false,
              fragment: 'top'
          };


          this.router.navigate(['/add-money'], {
              state: { productdetails: objToSend }
          });
      }
  }

  cancel() {

      // if(this.design ==='prelim'){
      // this.router.navigate(['/home/design'])
      // this.utils.setHomepageDesignRefresh(true);
      // }
      // else{
      //   this.router.navigate(['/permit-home/permit-design'])
      //   this.utils.setHomepagePermitRefresh(true);
      // }
      this.router.navigate(['/pestamp-home/pestamp-design']);
      this.utils.setPeStampRefresh(true);

  }
  refreshDesigns(event) {
      let showLoader = true;
      if (event !== null && event !== undefined) {
          showLoader = false;
      }
      showLoader = false;
      this.fetchData()
  }

  makepayment(inputData) {
      this.utils.showLoading("Adding").then(() => {
          this.apiService.createPestamppayment(inputData).subscribe(response => {
              console.log(response);
              this.createpayment = response;
              this.utils.hideLoading().then(() => {
                  this.utils.showSnackBar("payment successfull");
                  this.router.navigate(['pestamp-home/pestamp-design']);
                  this.utils.setPeStampRefresh(true);
              });
          },
              (error) => {
                  this.utils.hideLoading();
                  this.utils.errorSnackBar("Something went wrong");
              })
      })
  }

  makeCommercialpayment(inputData) {
      this.utils.showLoading("Adding").then(() => {
          this.apiService.createCommercialPestamppayment(inputData).subscribe(response => {
              console.log(response);
              this.createpayment = response;
              this.utils.hideLoading().then(() => {
                  // if(this.createpayment.status=='succeeded'){
                  this.utils.showSnackBar("payment successfull");
                  this.router.navigate(['pestamp-home/pestamp-design']);
                  this.utils.setPeStampRefresh(true);
              });
          },
              (error) => {
                  this.utils.hideLoading();
                  this.utils.errorSnackBar("Something went wrong");
              })
      })
  }



  confirmforPostpaid() {
      // if(this.id!=null){
      var postData = {};
      var pestampacceptancestarttime = new Date();
      pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
      // if(this.design=='prelim'){
      // designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
      // }
      // else{
      //   designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
      // }
      postData = {
          outsourcedto: 232,
          isoutsourced: "true",
          status: "outsourced",
          pestampacceptancestarttime: pestampacceptancestarttime,
          // couponid:this.utils.getCouponId().value,
          paymenttype: this.utils.getPaymentMode().value
      };
      this.utils.showLoading("Assigning").then(() => {
          this.apiService.updateDesignForm(postData, this.id).subscribe(value => {
              this.newpestampRef.update({ count: this.newpestampscount + 1 });
              this.utils.hideLoading().then(() => {
                  this.utils.showSnackBar("Pe Stamp request has been send to WattMonk successfully")
                  //this.navController.pop();
                  //  if(this.design=='prelim'){
                  //   this.router.navigate(['/home/design'])
                  //  this.utils.setHomepageDesignRefresh(true);
                  //  }
                  //  else{
                  //   this.router.navigate(['/permit-home/permit-design'])
                  //    this.utils.setHomepagePermitRefresh(true);
                  //  }
                  this.router.navigate(['/pestamp-home/pestamp-design']);
                  this.utils.setPeStampRefresh(true);
              })
          })
      })//}
      // else{
      //   if(this.design=='prelim'){
      //     this.utils.setPaymentMode("null");
      //   this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_DESIGN_FORM);
      //   }
      //   else{
      //     this.utils.setPaymentMode("null");
      //     this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
      //   }
      // }
  }

  ionViewWillLeave() {
  }

  createChatGroup(pestamp: Pestamp) {

      // if(this.design=='prelim'){
      //   var GUID = 'prelim' + "_" + new Date().getTime();
      // }else if(this.design=='permit'){
      //   var GUID = 'permit' + "_" + new Date().getTime();

      // }
      //   var GUID = 'pestamp' + "_" + new Date().getTime();
      //   //var address = design.deliveryaddress.substring(0, 60);
      //   var groupName = design.personname// + "_" + address;

      //   var groupType = CometChat.GROUP_TYPE.PASSWORD;
      //   var password = design.groupchatpassword;

      //   var group = new CometChat.Group(GUID, groupName, groupType, password);

      //   CometChat.createGroup(group).then(group=>{
      //     let membersList = [
      //       new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
      //     ];
      //     CometChat.addMembersToGroup(group.getGuid(),membersList,[]).then(response=>{
      //       this.cdr.detectChanges();
      //     })
      //   })
      const GUID = pestamp.chatid;

      const name = pestamp.personname.substring(0, 60);
      const email = pestamp.email.substring(0, 60);
      const groupName = pestamp.type + "_" + name + "_" + email;

      const groupType = CometChat.GROUP_TYPE.PASSWORD;
      const password = pestamp.groupchatpassword;

      const group = new CometChat.Group(GUID, groupName, groupType, password);
      const adminsid = [];
      this.wattmonkadmins.forEach((element) => {
          adminsid.push(element);
      });
      this.clientadmins.forEach((element) => {
          adminsid.push(element);
      });
      if (this.wattmonkadmins.length == 0) {
          adminsid.push(416);
          adminsid.push(456);
      }

      CometChat.createGroup(group).then(
          group => {
              const membersList = [
                  new CometChat.GroupMember(
                      "" + pestamp.createdby.cometchatuid,
                      CometChat.GROUP_MEMBER_SCOPE.ADMIN
                  ),
              ];
              adminsid.forEach((element) => {
                  membersList.push(
                      new CometChat.GroupMember(
                          "" + element,
                          CometChat.GROUP_MEMBER_SCOPE.ADMIN
                      )
                  );
              });

              CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
                  response => {
                      const chatgroupusers = adminsid;
                      chatgroupusers.push(pestamp.createdby.cometchatuid);
                      const inputData = {
                          title: groupName,
                          guid: GUID,
                          parentid: pestamp.createdby.parent.id,
                          chatgroupusers: chatgroupusers,
                      };
                      this.apiService.addChatGroup(inputData).subscribe(response => {
                      });
                  },
                  error => {
                  }
              );
          },
          error => {

          }
      );

  }

  getWattmonkadmins(): void {
      this.apiService.getadmins().subscribe(
          (response) => {
              this.wattmonkadmins = response;
              this.apiService.getpeadmins().subscribe((peeAdmins) => {
                  peeAdmins.forEach((element) => {
                      this.wattmonkadmins.push(element);
                  });
              });
          },
          (error) => {
              console.log(error, "Error");
          }
      );
  }
  getClientsadmins(id): void {
      this.apiService.getclientadmins(id).subscribe(
          (response) => {
              this.clientadmins = response;
          },
          (error) => {
              console.log(error, "Error");
          }
      );
  }


  // async Congratulations(){

  //    const alert = await this.alertController.create({
  //     cssClass: 'CogratulationalertClass',
  //      header: 'Congratulations!',
  //    message:'<div><img src="/assets/images/tick.png"> <span>you got discount of $'+ this.code_discount+'</span></div>',
  //     // inputs:
  //     //  [ {name:'comment',
  //     //  id:'comment',
  //     //     type:'textarea',
  //     //   placeholder:'Enter Comment'}
  //     //   ] ,
  //     // buttons: [
  //     //   {
  //     //     text: 'OK',
  //     //     role: 'cancel',
  //     //     cssClass: 'secondary',
  //     //     handler: (blah) => {
  //     //       console.log('Confirm Cancel: blah');
  //     //     }
  //     //   // }, {
  //     //   //   text: 'deliver',
  //     //   //   handler: (alertData) => {
  //     //   //     var postData= {};
  //     //   //     if(alertData.comment!=""){
  //     //   //      postData = {
  //     //   //       status: "delivered",
  //     //   //       comments: alertData.comment ,
  //     //   //        };}
  //     //   //        else{
  //     //   //         postData = {
  //     //   //           status: "delivered",
  //     //   //            };
  //     //   //        }
  //     //   //        console.log(postData);
  //     //   //       //  this.apiService.updateDesignForm(postData).subscribe((value) => {
  //     //   //       //   this.utils.hideLoading().then(()=>{
  //     //   //       //     ;
  //     //   //       //     console.log('reach ', value);
  //     //   //       //    this.utils.showSnackBar('Design request has been delivered successfully');

  //     //   //       //     this.utils.setHomepageDesignRefresh(true);
  //     //   //       //   })
  //     //   //       // }, (error) => {
  //     //   //       //   this.utils.hideLoading();
  //     //   //       //   ;
  //     //   //       // });
  //     //   //   }
  //     //   }
  //     // ]
  //   });

  //     await alert.present();
  //     setTimeout(()=>alert.dismiss(),1000);



  // }

  //   codeDiscountCalculation(data,price:number){
  //   if(data.discounttype=='percentage'){
  //     console.log(price)
  //     this.code_discount=(data.amount/100)*price;
  //   this.code_discount= this.code_discount.toFixed(2);
  //   this.discountAmount();
  //     console.log(this.code_discount)
  //     this.Congratulations();
  // }
  // else if(data.discounttype=='amount'){
  //   this.code_discount=data.amount;
  //   console.log(this.code_discount)
  //    this.discountAmount();
  //    this.Congratulations();
  // }
  //   }

  //  async openModal(){
  //   const modal = await this.modalController.create({
  //     component: CouponOffersModalPage,
  //     cssClass: 'coupon-modal-css',
  //     componentProps: {
  //    request:this.design
  //     },
  //     backdropDismiss:false
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     console.log(data);
  //     if(data.data.cancel=='cancel'){
  //     }
  //     else if(data.data.data!=null){
  //     this.coupondata=data.data.data;
  //     console.log(this.coupondata);
  //     this.utils.setCouponId(this.coupondata.id);

  //     this.codeDiscountCalculation(this.coupondata,this.settingValue);
  //     }
  // });
  //   // modal.dismiss(() => {
  //   //   ;
  //   //   this.getDesigns(null);
  //   // });
  //   return await modal.present();
  // }


  // removeCoupon(){
  //   this.coupondata=null;
  //   this.discountAmount();
  //   this.utils.setCouponId(null);
  // }
 
  private paypalintegration() {

      var overallAmount

      this.payPalConfig = {
        currency: environment.PAYPAL_CONSTANTS.CURRENCY,
        clientId: environment.PAYPAL_CONSTANTS.CLIENT_ID,
          createOrderOnClient: (data) => <ICreateOrderRequest>{
              intent: 'CAPTURE',
              purchase_units: [{

                  amount: {
                      value: overallAmount
                  }
              }]

          },

          advanced: {
              extraQueryParams: [{ name: "disable-funding", value: "credit,card" }],
              commit: 'true'
          },

          style: {
            
              color: 'silver',
              shape: 'rect',
              label: 'pay',
              tagline: false,

          },


          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then(details => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
                  //after payment approve
                  if (this.assignValue == 'clearDues') {
                      const inputData = {
                          paymenttype: "paypal",
                          pestampid: this.data.id,
                          user: this.user.id,

                      }
                      if (this.data.propertytype == 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
                          this.makeCommercialpayment(inputData);
                      }
                      else if (this.data.propertytype == 'commercial' && this.data.modeofstamping == 'ecopy') {
                          this.makeCommercialpayment(inputData);
                      }
                      else if (this.data.propertytype != 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
                          this.makepayment(inputData);
                      }
                  }
                  else {
                      var postData = {};
                      var pestampacceptancestarttime = new Date();
                      pestampacceptancestarttime.setMinutes(pestampacceptancestarttime.getMinutes() + 15);
                      // if(this.design=='prelim'){
                      // designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                      // }
                      // else{
                      //   designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                      // }
                      postData = {
                          outsourcedto: 232,
                          isoutsourced: "true",
                          status: "outsourced",
                          pestampacceptancestarttime: pestampacceptancestarttime,
                          paymenttype: "paypal",
                          paymentstatus: "succeeded"
                      };
                      this.utils.showLoading("Assigning").then(() => {
                          this.apiService.updatePestamps(this.data.id, postData).subscribe(value => {
                              this.createChatGroup(value);
                              //     if(this.design=='prelim')
                              // {
                              //   this.newprelimsRef.update({ count: this.newprelimscount + 1});
                              //   console.log("hello",this.newprelimscount)
                              // }else{
                              //   this.newpermitsRef.update({ count: this.newpermitscount + 1});
                              this.newpestampRef.update({ count: this.newpestampscount + 1 });
                              // }
                              this.utils.hideLoading().then(() => {
                                  this.utils.showSnackBar("pe stamp request has been send to WattMonk successfully")
                                  //this.navController.pop();
                                  //  if(this.design=='prelim'){
                                  //    this.router.navigate(['/home/design'])
                                  //  this.utils.setHomepageDesignRefresh(true);
                                  //  }
                                  //  else{
                                  //   this.router.navigate(['/permit-home/permit-design'])
                                  //    this.utils.setHomepagePermitRefresh(true);
                                  //  }
                                  this.router.navigate(['/pestamp-home/pestamp-design']);
                                  this.utils.setPeStampRefresh(true);
                              })
                          })
                      })//}
                      // else{
                      //   if(this.design=='prelim'){
                      //     this.utils.setPaymentMode("wallet");
                      //   this.utils.setScheduleFormEvent(ScheduleFormEvent.PAY_EVENT);
                      //   }
                      //   else{
                      //     this.utils.setPaymentMode("wallet");
                      //     this.utils.setScheduleFormEvent(ScheduleFormEvent.SEND_PERMIT_FORM);
                      //   }
                      // }
                  }

              })

          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
              // this.showSuccess = true;
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              // this.showCancel = true;

          },
          onError: err => {
              console.log('OnError', err);
              // this.showError = true;
          },
          onClick: (data, actions) => {

              if (this.netPay != null && this.assignValue != 'clearDues') {
                  overallAmount = this.netPay
              }
              else if (this.netPay == null && this.assignValue != 'clearDues') {
                  overallAmount = this.settingValue
              }
              else if (this.amounttopay != null && this.assignValue == 'clearDues') {
                  overallAmount = this.amounttopay
              }

              // this.resetStatus();
          },
      };
  }


}

