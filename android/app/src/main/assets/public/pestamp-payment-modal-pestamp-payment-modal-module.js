(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pestamp-payment-modal-pestamp-payment-modal-module"],{

/***/ "G+2u":
/*!***********************************************************************!*\
  !*** ./src/app/pestamp-payment-modal/pestamp-payment-modal.module.ts ***!
  \***********************************************************************/
/*! exports provided: PestampPaymentModalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampPaymentModalPageModule", function() { return PestampPaymentModalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _pestamp_payment_modal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pestamp-payment-modal-routing.module */ "aoXD");
/* harmony import */ var _pestamp_payment_modal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pestamp-payment-modal.page */ "nTZ1");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var ngx_paypal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-paypal */ "ejwX");









// import { PaymentModalPage } from '../payment-modal/payment-modal.page';
let PestampPaymentModalPageModule = class PestampPaymentModalPageModule {
};
PestampPaymentModalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [_pestamp_payment_modal_page__WEBPACK_IMPORTED_MODULE_6__["PestampPaymentModalPage"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _pestamp_payment_modal_routing_module__WEBPACK_IMPORTED_MODULE_5__["PestampPaymentModalPageRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            ngx_paypal__WEBPACK_IMPORTED_MODULE_8__["NgxPayPalModule"]
        ],
        declarations: [_pestamp_payment_modal_page__WEBPACK_IMPORTED_MODULE_6__["PestampPaymentModalPage"]]
    })
], PestampPaymentModalPageModule);



/***/ }),

/***/ "aoXD":
/*!*******************************************************************************!*\
  !*** ./src/app/pestamp-payment-modal/pestamp-payment-modal-routing.module.ts ***!
  \*******************************************************************************/
/*! exports provided: PestampPaymentModalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampPaymentModalPageRoutingModule", function() { return PestampPaymentModalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pestamp_payment_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pestamp-payment-modal.page */ "nTZ1");




const routes = [
    {
        path: '',
        component: _pestamp_payment_modal_page__WEBPACK_IMPORTED_MODULE_3__["PestampPaymentModalPage"]
    }
];
let PestampPaymentModalPageRoutingModule = class PestampPaymentModalPageRoutingModule {
};
PestampPaymentModalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PestampPaymentModalPageRoutingModule);



/***/ }),

/***/ "bvZ9":
/*!***********************************************************************!*\
  !*** ./src/app/pestamp-payment-modal/pestamp-payment-modal.page.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".black {\n  color: #111;\n  margin-left: 5px;\n}\n\n.error {\n  color: #df3e3e;\n  font-size: 13px;\n  padding-left: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBlc3RhbXAtcGF5bWVudC1tb2RhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxXQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFDSiIsImZpbGUiOiJwZXN0YW1wLXBheW1lbnQtbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJsYWNre1xyXG4gICAgY29sb3I6IzExMTtcclxuICAgIG1hcmdpbi1sZWZ0OjVweDtcclxufVxyXG5cclxuLmVycm9yIHtcclxuICAgIGNvbG9yOiByZ2IoMjIzLCA2MiwgNjIpO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG4gIH0iXX0= */");

/***/ }),

/***/ "nTZ1":
/*!*********************************************************************!*\
  !*** ./src/app/pestamp-payment-modal/pestamp-payment-modal.page.ts ***!
  \*********************************************************************/
/*! exports provided: PestampPaymentModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PestampPaymentModalPage", function() { return PestampPaymentModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pestamp_payment_modal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pestamp-payment-modal.page.html */ "uPcG");
/* harmony import */ var _pestamp_payment_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pestamp-payment-modal.page.scss */ "bvZ9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utilities/mixpanel.service */ "uKCw");












let PestampPaymentModalPage = class PestampPaymentModalPage {
    constructor(storageService, apiService, router, route, navController, utils, alertController, modalController, db, cdr, mixpanelService) {
        this.storageService = storageService;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.navController = navController;
        this.utils = utils;
        this.alertController = alertController;
        this.modalController = modalController;
        this.db = db;
        this.cdr = cdr;
        this.mixpanelService = mixpanelService;
        this.design = 'pestamp';
        this.servicePrice = 0;
        this.settingValue = 0;
        this.value = 50;
        this.coupondata = null;
        //counts
        this.isShow = false;
        this.newpestampscount = 0;
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
        console.log(this.router.getCurrentNavigation().extras.state);
        this.designData = this.router.getCurrentNavigation().extras.state;
        this.data = this.designData.productdetails.queryParams.designData;
        this.assignValue = this.designData.productdetails.queryParams.value;
        this.deliveryCharges = this.data.deliverycharges;
        console.log(this.assignValue);
        console.log(this.data);
        this.newpestampRef = db.object('newpestamp');
        this.newpestamp = this.newpestampRef.valueChanges();
        this.newpestamp.subscribe((res) => {
            console.log(res);
            this.newpestampscount = res.count;
            this.cdr.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
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
            console.log(this.userData);
            this.mixpanelService.track('PESTAMP_PAYMENT_PAGE_OPEN', {});
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
            this.isShow = true;
        }, 2000);
    }
    ionViewDidEnter() {
        this.fetchData();
    }
    getPeStampCharges() {
        var searchdata;
        var bothtypepestampcharges = 0;
        if (this.data.propertytype == 'commercial' && this.data.type == 'structural') {
            searchdata = "structuralcommercialpecharges";
        }
        else if (this.data.propertytype == 'commercial' && this.data.type == 'electrical') {
            searchdata = "electricalcommercialpecharges";
        }
        // else if (this.data.type == 'electrical') {
        //   searchdata = "electricalanymountingpecharges"
        // }
        else if (this.data.type == 'electrical' && this.data.jobtype == 'pv') {
            searchdata = "electricalpvpecharges";
        }
        else if (this.data.type == 'electrical' && this.data.jobtype == 'pvbattery') {
            searchdata = "electricalpvbatterypecharges";
        }
        else if (this.data.type == 'electrical' && this.data.jobtype == 'battery') {
            searchdata = "electricalbatterypecharges";
        }
        else if (this.data.type == 'structural' && this.data.mountingtype == 'both') {
            searchdata = "structuralbothpecharges";
        }
        else if (this.data.type == 'structural' && this.data.mountingtype == 'ground') {
            searchdata = "structuralgroundmountpecharges";
        }
        else if (this.data.type == "structural" && this.data.mountingtype == 'roof') {
            searchdata = "structuralroofpecharges";
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
                structuralsearchdata = "structural" + this.data.mountingtype + "pecharges";
            }
            else if (this.data.mountingtype == 'ground') {
                structuralsearchdata = "structural" + this.data.mountingtype + "mountpecharges";
            }
            else if (this.data.mountingtype == 'roof') {
                structuralsearchdata = "structural" + this.data.mountingtype + "pecharges";
            }
            this.apiService.getPeStampCharges(structuralsearchdata).subscribe(response => {
                console.log(response);
                bothtypepestampcharges = parseInt(response[0].settingvalue);
            });
        }
        setTimeout(() => {
            this.apiService.getPeStampCharges(searchdata).subscribe((res) => {
                console.log(res);
                this.servicePrice = res;
                // this.servicePrice.forEach(element => {
                //   this.settingValue = element.settingvalue;
                // });
                if (res[0].settingname == 'commercialanymountingpecharges') {
                    console.log("hello");
                    this.settingValue = 0;
                    this.netPay = this.settingValue;
                }
                else {
                    this.settingValue = res[0].settingvalue + bothtypepestampcharges;
                    this.netPay = this.settingValue;
                    console.log("hello1", this.netPay);
                }
            });
        }, 500);
    }
    getCommercialCharges() {
        this.apiService.getPeStampCharges("commercialanymountingpecharges").subscribe((res) => {
            console.log(res);
            this.servicePrice = res;
            console.log("deliver");
            this.settingValue = res[0].settingvalue;
            this.serviceCharges = this.settingValue * this.data.workinghours;
            //this.netPay = this.settingValue * this.data.workinghours;
            this.getAmounttopay();
        });
    }
    getAmounttopay() {
        if (this.data.propertytype == 'commercial' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
            this.amounttopay = this.serviceCharges + this.data.deliverycharges;
        }
        else if (this.data.propertytype == 'commercial' && this.data.modeofstamping == 'ecopy') {
            this.amounttopay = this.serviceCharges;
        }
        else if (this.data.propertytype == 'residential' && (this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping == 'both')) {
            this.amounttopay = this.data.deliverycharges;
        }
    }
    fetchData() {
        // this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
        // this.design=params.get('designData')});
        this.apiService.getUserData(this.userData.id).subscribe(res => {
            this.user = res;
            console.log(this.user);
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
            };
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
                paymenttype: this.utils.getPaymentMode().value
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
                        this.utils.showSnackBar("pe stamp request has been send to wattmonk successfully");
                        //this.navController.pop();
                        //  if(this.design=='prelim'){
                        //    this.router.navigate(['/homepage/design'])
                        //  this.utils.setHomepageDesignRefresh(true);
                        //  }
                        //  else{
                        //   this.router.navigate(['/permithomepage/permitdesign'])
                        //    this.utils.setHomepagePermitRefresh(true);
                        //  }
                        this.router.navigate(['/pestamp-homepage/pestamp-design']);
                        this.utils.setPeStampRefresh(true);
                    });
                });
            }); //}
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
            console.log("assign");
            //this.router.navigate(['/add-money',{mode:value,id:this.data.id,serviceAmount:this.netPay,design:this.design,assignValue:this.assignValue}])
            let objToSend = {
                queryParams: {
                    mode: value,
                    id: this.data.id,
                    serviceAmount: this.netPay,
                    design: this.design,
                    assignValue: this.assignValue,
                    fulldesigndata: this.data,
                },
                skipLocationChange: false,
                fragment: 'top'
            };
            this.router.navigate(['/add-money'], {
                state: { productdetails: objToSend }
            });
        }
        else {
            console.log("deliver");
            //this.router.navigate(['/add-money',{mode:value,id:this.data.id,serviceAmount:this.amounttopay,design:this.design,assignValue:this.assignValue,data:this.data}])
            let objToSend = {
                queryParams: {
                    mode: value,
                    id: this.data.id,
                    serviceAmount: this.amounttopay,
                    design: this.design,
                    assignValue: this.assignValue,
                    fulldesigndata: this.data,
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
        // this.router.navigate(['/homepage/design'])
        // this.utils.setHomepageDesignRefresh(true);
        // }
        // else{
        //   this.router.navigate(['permithomepage/permitdesign'])
        //   this.utils.setHomepagePermitRefresh(true);
        // }
        this.router.navigate(['/pestamp-homepage/pestamp-design']);
        this.utils.setPeStampRefresh(true);
    }
    refreshDesigns(event) {
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        showLoader = false;
        this.fetchData();
    }
    makepayment(inputData) {
        this.utils.showLoading("Adding").then(() => {
            this.apiService.createPestamppayment(inputData).subscribe(response => {
                console.log(response);
                this.createpayment = response;
                this.utils.hideLoading().then(() => {
                    this.utils.showSnackBar("payment successfull");
                    this.router.navigate(['pestamp-homepage/pestamp-design']);
                    this.utils.setPeStampRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
                this.utils.errorSnackBar("Something went wrong");
            });
        });
    }
    makeCommercialpayment(inputData) {
        this.utils.showLoading("Adding").then(() => {
            this.apiService.createCommercialPestamppayment(inputData).subscribe(response => {
                console.log(response);
                this.createpayment = response;
                this.utils.hideLoading().then(() => {
                    // if(this.createpayment.status=='succeeded'){
                    this.utils.showSnackBar("payment successfull");
                    this.router.navigate(['pestamp-homepage/pestamp-design']);
                    this.utils.setPeStampRefresh(true);
                });
            }, (error) => {
                this.utils.hideLoading();
                this.utils.errorSnackBar("Something went wrong");
            });
        });
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
                    this.utils.showSnackBar("Pe Stamp request has been send to wattmonk successfully");
                    //this.navController.pop();
                    //  if(this.design=='prelim'){
                    //   this.router.navigate(['/homepage/design'])
                    //  this.utils.setHomepageDesignRefresh(true);
                    //  }
                    //  else{
                    //   this.router.navigate(['/permithomepage/permitdesign'])
                    //    this.utils.setHomepagePermitRefresh(true);
                    //  }
                    this.router.navigate(['/pestamp-homepage/pestamp-design']);
                    this.utils.setPeStampRefresh(true);
                });
            });
        }); //}
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
    createChatGroup(design) {
        // if(this.design=='prelim'){
        //   var GUID = 'prelim' + "_" + new Date().getTime();
        // }else if(this.design=='permit'){
        //   var GUID = 'permit' + "_" + new Date().getTime();
        // }
        var GUID = 'pestamp' + "_" + new Date().getTime();
        //var address = design.deliveryaddress.substring(0, 60);
        var groupName = design.personname; // + "_" + address;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].createGroup(group).then(group => {
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GroupMember("" + design.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_10__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            });
        });
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
    paypalintegration() {
        var overallAmount;
        this.payPalConfig = {
            currency: 'USD',
            //for testing
            clientId: 'AV1abOj-_YOVXq_Negcy7Fkc2Esj2GtpY2dRe3nrTwPl4HSX22jbXQ6KKhyJRO7JjPxP__sr7wqi57bg',
            // for live
            //  CLIENT_ID: 'AfKOgzK6Le8LRp8bN4vefjNqC9B7qArUHJt0U_wUmed6hlDHlP-TlHYG9olpqTX85VhHHOD3T9pkfKuP',
            createOrderOnClient: (data) => ({
                intent: 'CAPTURE',
                purchase_units: [{
                        amount: {
                            value: overallAmount
                        }
                    }]
            }),
            advanced: { extraQueryParams: [{ name: "disable-funding", value: "credit,card" }],
                commit: 'true' },
            style: {
                size: 'responsive',
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
                        };
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
                                    this.utils.showSnackBar("pe stamp request has been send to wattmonk successfully");
                                    //this.navController.pop();
                                    //  if(this.design=='prelim'){
                                    //    this.router.navigate(['/homepage/design'])
                                    //  this.utils.setHomepageDesignRefresh(true);
                                    //  }
                                    //  else{
                                    //   this.router.navigate(['/permithomepage/permitdesign'])
                                    //    this.utils.setHomepagePermitRefresh(true);
                                    //  }
                                    this.router.navigate(['/pestamp-homepage/pestamp-design']);
                                    this.utils.setPeStampRefresh(true);
                                });
                            });
                        }); //}
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
                });
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
                    overallAmount = this.netPay;
                }
                else if (this.netPay == null && this.assignValue != 'clearDues') {
                    overallAmount = this.settingValue;
                }
                else if (this.amounttopay != null && this.assignValue == 'clearDues') {
                    overallAmount = this.amounttopay;
                }
                console.log('onClick', data, actions);
                // this.resetStatus();
            },
        };
    }
};
PestampPaymentModalPage.ctorParameters = () => [
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_8__["StorageService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_7__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_9__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__["AngularFireDatabase"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _utilities_mixpanel_service__WEBPACK_IMPORTED_MODULE_11__["MixpanelService"] }
];
PestampPaymentModalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pestamp-payment-modal',
        template: _raw_loader_pestamp_payment_modal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pestamp_payment_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PestampPaymentModalPage);



/***/ }),

/***/ "uPcG":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pestamp-payment-modal/pestamp-payment-modal.page.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header  class=\"ion-no-border white-bg\">\r\n  <ion-toolbar>\r\n    <ion-title></ion-title>\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n      <ion-row  >\r\n    <ion-col size=\"1\">\r\n    <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"cancel()\">\r\n        <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n    </ion-button>\r\n</ion-col>\r\n<ion-col class=\"ion-text-center\" size=\"9\" style=\"padding-left: 27px; text-align: center;\">\r\n  <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n      <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n          <span class=\"survey-name ion-text-center\" style=\"font-size:x-large; text-align: center;\" *ngIf=\"assignValue != 'clearDues'\">Confirm your order</span>\r\n          <span class=\"survey-name ion-text-center\" style=\"font-size:x-large; text-align: center;\" *ngIf=\"assignValue == 'clearDues'\">Clear Dues</span>\r\n      </ion-row>\r\n  </ion-grid>\r\n</ion-col>\r\n</ion-row><ion-row></ion-row>\r\n</ion-grid></ion-toolbar></ion-header>\r\n<ion-content *ngIf=\"isShow\"><ion-row>\r\n  <h4 style=\"font-weight: bold;margin-bottom:0px !important;padding: 10px;\"></h4>\r\n</ion-row>\r\n<ion-row *ngIf=\"assignValue != 'clearDues'\">\r\n      <h6 *ngIf=\"user?.ispaymentmodeprepay && data.propertytype != 'commercial' \" style=\"margin:10px;padding:5px;\"> Please make the payment to process your order with Wattmonk.</h6>\r\n      <h6 *ngIf=\"user?.ispaymentmodeprepay && data.propertytype == 'commercial' \" style=\"margin:10px;padding:5px;\"> Payment to be made on delivery</h6>\r\n      <h6 *ngIf=\"!user?.ispaymentmodeprepay\" style=\"margin:10px;padding:5px;\">On confirmation ,your design request purchase will be add to your monthly invoice Please find below summary of your service purchase.</h6>\r\n    </ion-row>\r\n    <ion-row *ngIf=\"assignValue == 'clearDues'\">\r\n      <h6 *ngIf=\"user?.ispaymentmodeprepay\" style=\"margin:10px;padding:5px;\"> Please make payment to clear your dues.</h6>\r\n      <!-- <h6 *ngIf=\"!user?.ispaymentmodeprepay\" style=\"margin:10px;padding:5px;\">On confirmation ,your design request purchase will be add to your monthly invoice Please find below summary of your service purchase.</h6> -->\r\n    </ion-row>\r\n    <ion-row >\r\n    <ion-card style=\"position: relative; width:100%;\" class=\"ion-padding\">\r\n      <ion-row style=\"width: 100%;\" *ngIf=\"user?.role.type!='clientadmin' && user?.ispaymentmodeprepay\">\r\n        <ion-col size=\"6\">\r\n          <ion-label style=\"font-size: medium;color:#111;font-weight: bold;float: left;\">Amount in Wallet</ion-label>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <ion-label style=\"font-size: large;color:#111;float:right;\">$ {{user?.amount}}</ion-label>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row style=\"width: 100%;\" *ngIf=\"assignValue == 'assign' || data.propertytype == 'commercial'\"><ion-col size=\"6\">\r\n      <ion-label style=\"font-size: medium;color:#111;font-weight: bold; float: left;\">Service Charges</ion-label>\r\n      </ion-col>\r\n      <ion-col size=\"6\" *ngIf=\"assignValue != 'clearDues' && data.propertytype == 'residential'\">\r\n        <ion-label style=\"font-size: large;color:#111; float:right;\"> $ {{settingValue}} </ion-label>\r\n        <!-- <ion-label style=\"font-size: large;color:#111; float:right;\"> $ 100/hr </ion-label> -->\r\n      </ion-col>\r\n      <ion-col size=\"6\" *ngIf=\"assignValue != 'clearDues' && data.propertytype == 'commercial'\">\r\n      <!-- <ion-label style=\"font-size: large;color:#111; float:right;\"> $ {{settingValue}} </ion-label> -->\r\n      <ion-label style=\"font-size: large;color:#111; float:right;\"> $ 100/hr </ion-label>\r\n    </ion-col>\r\n    <ion-col size=\"6\" *ngIf=\"assignValue == 'clearDues'\">\r\n      <ion-label style=\"font-size: large;color:#111; float:right;\"> $ {{serviceCharges}} </ion-label>\r\n    </ion-col>\r\n    </ion-row>\r\n    <ion-row style=\"width: 100%;\" *ngIf=\"assignValue == 'clearDues' && (data.modeofstamping=='hardcopy' || data.modeofstamping=='both')\"><ion-col size=\"6\">\r\n      <ion-label style=\"font-size: medium;color:#111;font-weight: bold; float: left;\">Shipping Charges</ion-label>\r\n      </ion-col>\r\n      \r\n      <ion-col size=\"6\">\r\n      <ion-label style=\"font-size: large;color:#111; float:right;\"> $ {{deliveryCharges}} </ion-label>\r\n    </ion-col>\r\n    </ion-row>\r\n    <!-- <a *ngIf=\"this.count>=this.freeCharges\" (click)='openModal()'><u>Have a Promocode</u></a> -->\r\n<!-- <ion-row ><ion-col size=\"12\"><ion-item *ngIf=\"coupondata!=null\"  >\r\n  <ion-input type=\"text\"  autocapitalize=\"words\"\r\n    class=\"ion-padding\"  disabled=\"true\">{{coupondata?.code}}</ion-input>\r\n  <ion-label class=\"clickEnableCls\" style=\"color:midnightblue;\" (click)=\"removeCoupon()\" >remove</ion-label>\r\n  </ion-item>\r\n</ion-col>\r\n   <ion-col style=\"align-self: flex-end;\"><ion-button size='small' (click)=\"Congratulations()\">Apply</ion-button> </ion-col> \r\n  </ion-row>  -->\r\n  <!-- <ion-row style=\"width: 100%;\" *ngIf=\"discount!=null\"><ion-col size=\"6\">\r\n    <ion-label style=\"font-size: medium;color:#111;font-weight: bold;float: left;\">Discount</ion-label>\r\n    </ion-col>\r\n    <ion-col size=\"6\">    <ion-label style=\"font-size: large;color:#111; float:right;\" >$ {{discount}}</ion-label>\r\n    \r\n  </ion-col>\r\n  <ion-col size=\"6\"> -->\r\n    <!-- <ion-label style=\"font-size: larger;\">Service Used</ion-label><br>\r\n    <ion-label style=\"font-size: x-large;\">{{design}} design</ion-label> -->\r\n  <!-- </ion-col>\r\n</ion-row> -->\r\n\r\n<!-- <ion-row>\r\n  <ion-col>\r\n  <ion-label style=\"font-size: larger;\">You have to pay</ion-label><br>\r\n  <ion-label *ngIf=\"count>freeCharges;else stat\" style=\"font-size: x-large;\"> $ {{settingValue}}\r\n   </ion-label>\r\n  <ng-template #stat>\r\n    <ion-label  style=\"font-size: x-large;\">$ 0</ion-label>\r\n  </ng-template>\r\n</ion-col>\r\n<ion-col size=\"6\">\r\n  <ion-label style=\"font-size: larger;\">Design Id</ion-label><br>\r\n  <ion-label style=\"font-size: x-large;\" >{{id}}</ion-label>\r\n</ion-col>\r\n</ion-row> -->\r\n<!-- <ion-row style=\"width: 100%;\" *ngIf=\"coupondata!=null\">\r\n  <ion-col size=\"10\"><ion-label style=\"font-size:small;color:#111;\">Coupon Code Discount</ion-label></ion-col>\r\n    <ion-col size=\"2\"><ion-label style=\"font-size: large;color:#111\" >{{code_discount}} </ion-label></ion-col>\r\n</ion-row>  -->\r\n    </ion-card>\r\n  </ion-row>\r\n  <!--<ion-row style=\"width: 100%;\">\r\n    <ion-col size=\"10\"><ion-label style=\"font-size:small;color:#111;\">You have to pay</ion-label></ion-col>\r\n      <ion-col size=\"2\"><ion-label style=\"font-size: large;color:#111\" >$ 35 </ion-label></ion-col>\r\n  </ion-row>-->\r\n  <ion-item><ion-row style=\"width: 100%;\" >\r\n    <!-- <ion-col size=\"9\"><ion-label style=\"font-size:medium;color:#111;font-weight: bold;\">Net Payable Amount</ion-label></ion-col> -->\r\n    <ion-col size=\"9\"><ion-label style=\"font-size:medium;color:#111;font-weight: bold;\" *ngIf=\"data.propertytype!=='commercial'\">You have to pay</ion-label></ion-col> \r\n    <ion-col size=\"3\"><ion-label style=\"font-size: large;color:#111;float:right;padding-right: 10%;\" *ngIf=\"netPay!=null && assignValue !='clearDues' && data.propertytype!=='commercial'\" >$ {{netPay}} </ion-label>\r\n      <ion-label style=\"font-size: large;color:#111; float:right; padding-right: 10%;\" *ngIf=\"netPay==null && assignValue !='clearDues'\" >$ {{settingValue}} </ion-label>\r\n      <ion-label style=\"font-size: large;color:#111; float:right; padding-right: 10%;\" *ngIf=\"amounttopay!=null && assignValue =='clearDues'\" >$ {{amounttopay}} </ion-label>\r\n   </ion-col>\r\n    </ion-row></ion-item>\r\n    <ion-row  *ngIf=\"data.modeofstamping!=='ecopy'\">\r\n      <ion-col>\r\n        <span class=\"error\">*Shipping charges to be paid on service delivery</span>\r\n    </ion-col>\r\n  </ion-row>\r\n  <ion-row class=\"ion-padding\" *ngIf=\"user?.role.type!=='clientadmin'\">\r\n    <ion-col size=\"12\" *ngIf=\"user?.ispaymentmodeprepay\" >\r\n      <!-- <ion-item *ngIf=\"user?.amount>=settingValue\" (click)=\"confirm()\" >\r\n        <ion-button  fill=\"clear\"><ion-icon name=\"checkmark-circle-outline\" style=\"color: blue;\"></ion-icon>&nbsp;<ion-label class=\"black\">Confirm</ion-label></ion-button>\r\n      </ion-item> -->\r\n      <ion-item (click)=\"addWallet('wallet')\" *ngIf=\"netPay>user?.amount || amounttopay > user?.amount\" >\r\n        <ion-button  fill=\"clear\" ><ion-icon name=\"cash-outline\" style=\"color:green;font-size:25px\"></ion-icon>&nbsp;<ion-label class=\"black\">Add Money</ion-label></ion-button>\r\n      </ion-item>\r\n       <!-- <ion-item (click)=\"addWallet('card')\" *ngIf=\"netPay>user?.amount || amounttopay > user?.amount\">\r\n        <ion-button  fill=\"clear\"  ><ion-icon name=\"card-outline\" style=\"color:brown;font-size:25px\"></ion-icon>&nbsp;<ion-label class=\"black\">Pay via card </ion-label></ion-button>\r\n      </ion-item> -->\r\n      <ion-col size=\"12\" *ngIf=\"netPay>user?.amount || amounttopay > user?.amount\">\r\n        <ngx-paypal class=\"paypal-button\" [config]=\"payPalConfig\"></ngx-paypal></ion-col>\r\n      </ion-col>\r\n   \r\n    <ion-col size=\"12\" *ngIf=\"!user?.ispaymentmodeprepay\" >\r\n      <!-- <ion-item  (click)=\"confirmforPostpaid()\" >\r\n        <ion-button  fill=\"clear\"><ion-icon name=\"checkmark-circle-outline\" style=\"color: blue;\"></ion-icon>&nbsp;<ion-label class=\"black\">Confirm</ion-label></ion-button>\r\n      </ion-item> -->\r\n      \r\n    </ion-col>\r\n    </ion-row>\r\n    </ion-content>\r\n    <div *ngIf=\"isShow\">\r\n    <ion-footer *ngIf=\"user?.ispaymentmodeprepay && (user?.parent.amount>=netPay || user?.parent.amount>=amounttopay) && (user?.role.type == 'clientsuperadmin' || user?.role.type =='clientadmin')\" (click)=\"confirm()\"  class=\"ion-padding\" style=\"text-align: center;background: blue;color:#fff\">\r\n      Confirm\r\n       </ion-footer>\r\n    <ion-footer *ngIf=\"!user?.ispaymentmodeprepay\" (click)=\"confirmforPostpaid()\" class=\"ion-padding\" style=\"text-align: center;background: blue;color:#fff\">Confirm</ion-footer>\r\n    <ion-footer *ngIf=\"(netPay > user?.parent.amount || amounttopay > user?.parent.amount) && user?.role.type=='clientadmin'\" class=\"ion-padding\" style=\"text-align: center;color:red\" class=\"ion-padding\">Insufficient Amount</ion-footer>\r\n  </div>\r\n  ");

/***/ })

}]);
//# sourceMappingURL=pestamp-payment-modal-pestamp-payment-modal-module.js.map