(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1"],{

/***/ "XSze":
/*!*****************************************************!*\
  !*** ./src/app/payment-modal/payment-modal.page.ts ***!
  \*****************************************************/
/*! exports provided: PaymentModalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentModalPage", function() { return PaymentModalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_payment_modal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./payment-modal.page.html */ "y6lC");
/* harmony import */ var _payment_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payment-modal.page.scss */ "Yvn2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../storage.service */ "qkCY");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api.service */ "yTNM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _utilities_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities.service */ "oTnF");
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../model/constants */ "Kp5Z");
/* harmony import */ var _coupon_offers_modal_coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../coupon-offers-modal/coupon-offers-modal.page */ "Ofye");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @cometchat-pro/cordova-ionic-chat */ "ujHh");
/* harmony import */ var _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__);













let PaymentModalPage = class PaymentModalPage {
    constructor(storageService, apiService, router, route, navController, utils, alertController, modalController, db, cdr) {
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
        this.servicePrice = 0;
        this.settingValue = 0;
        this.value = 50;
        this.coupondata = null;
        //counts
        this.isShow = false;
        this.isradiodisable = false;
        this.newpermitscount = 0;
        //newprelimsRef:any;
        this.newprelimscount = 0;
        // this.designData = this.router.getCurrentNavigation().extras.state;
        // console.log(this.designData)
        // this.id = this.designData.productdetails.queryParams.id;
        // this.design = this.designData.productdetails.queryParams.designData;
        // console.log(this.id);
        // console.log(this.design);
        //For Counts
        this.designData = this.router.getCurrentNavigation().extras.state;
        this.id = this.designData.productdetails.queryParams.id;
        this.design = this.designData.productdetails.queryParams.designData;
        this.fulldesigndata = this.designData.productdetails.queryParams.fulldesigndata;
        this.designType = this.designData.productdetails.queryParams.designType;
        console.log(this.fulldesigndata);
        this.newpermitsRef = db.object('newpermitdesigns');
        this.newpermits = this.newpermitsRef.valueChanges();
        this.newpermits.subscribe((res) => {
            console.log(res);
            this.newpermitscount = res.count;
            this.cdr.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        //counts
        this.newprelimsRef = db.object('newprelimdesigns');
        this.newprelims = this.newprelimsRef.valueChanges();
        this.newprelims.subscribe((res) => {
            console.log(res);
            this.newprelimscount = res.count;
            this.cdr.detectChanges();
        }, (err) => console.log(err), () => console.log('done!'));
        this.paypalintegration();
    }
    ngOnInit() {
        this.utils.showLoading("Please wait....").then(() => {
            this.userData = this.storageService.getUser();
            console.log(this.userData);
            this.fetchData();
            this.servicecharges();
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
    ionViewDidLeave() {
        this.utils.setCouponId(null);
    }
    fetchData() {
        // this.route.paramMap.subscribe( params =>{ this.id=params.get('id');
        // this.design=params.get('designData')});
        // const navigation = this.router.getCurrentNavigation()
        // console.log(navigation)
        // console.log(this.router.getCurrentNavigation().extras.state)
        this.isradiodisable = false;
        this.apiService.getUserData(this.userData.id).subscribe(res => {
            this.user = res;
            console.log(this.user);
            this.delivertime = this.user.slabname;
            this.apiService.paymentDetail(this.user.parent.id).subscribe(res => {
                this.count = res;
                console.log(this.count);
                this.servicecharges();
            });
        });
        this.apiService.freeCharges().subscribe(res => {
            this.freeDesigns = res;
            this.freeDesigns.forEach(element => {
                this.freeCharges = element.settingvalue;
            });
            console.log(this.freeCharges);
        });
        console.log(this.id);
        console.log(this.design);
    }
    discountAmount() {
        if (this.freeCharges > this.count) {
            this.discount = this.settingValue;
            this.netPay = this.settingValue - this.discount;
        }
        else if (this.coupondata != null) {
            if (this.design == 'prelim') {
                this.discount = this.code_discount;
                this.netPay = (this.settingValue - this.code_discount).toFixed(2);
                console.log(this.netPay);
            }
            if (this.design == 'permit') {
                this.discount = this.code_discount;
                this.netPay = (this.netPay - this.discount).toFixed(2);
            }
        }
        else {
            if (this.design == 'prelim') {
                this.discount = null;
                this.netPay = this.settingValue;
                console.log(this.netPay);
            }
            if (this.design == 'permit') {
                this.netPay = this.servicePrice.paymentamount;
                this.discount = this.servicePrice.slabdiscount;
            }
        }
    }
    servicecharges() {
        console.log(this.fulldesigndata, this.design);
        if (this.design == 'prelim' && this.fulldesigndata.requirementtype == "assessment") {
            this.apiService.prelimCharges().subscribe(res => {
                this.servicePrice = res;
                this.servicePrice.forEach(element => {
                    this.settingValue = element.settingvalue;
                });
                console.log("ddd", this.settingValue);
                this.discountAmount();
            });
        }
        else if (this.design == 'prelim' && this.fulldesigndata.requirementtype == "proposal") {
            this.apiService.prelimSalesCharges().subscribe(res => {
                this.servicePrice = res;
                this.servicePrice.forEach(element => {
                    this.settingValue = element.settingvalue;
                });
            });
        }
        else {
            var postData = {
                userparentid: this.user.parent.id,
                timeslab: this.delivertime
            };
            this.apiService.permitCharges(postData).subscribe(res => {
                this.servicePrice = res;
                this.settingValue = this.servicePrice.servicecharge;
                console.log("ddd", this.settingValue);
                if (this.servicePrice.freedesign == true) {
                    this.delivertime = "24-48";
                    this.discount = this.servicePrice.slabdiscount;
                    this.netPay = 0;
                    this.isradiodisable = true;
                }
                else {
                    this.delivertime = this.servicePrice.slabname;
                    this.netPay = this.servicePrice.paymentamount;
                    this.discount = this.servicePrice.slabdiscount;
                    this.isradiodisable = false;
                }
            });
        }
    }
    confirm() {
        if (this.id != null) {
            var postData = {};
            var designacceptancestarttime = new Date();
            if (this.design == 'prelim') {
                designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                postData = {
                    outsourcedto: 232,
                    isoutsourced: "true",
                    status: "outsourced",
                    couponid: this.utils.getCouponId().value,
                    designacceptancestarttime: designacceptancestarttime,
                    paymenttype: "wallet",
                    amount: parseInt(this.netPay),
                    serviceamount: this.settingValue,
                    paymentstatus: null
                };
            }
            else {
                designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                postData = {
                    outsourcedto: 232,
                    isoutsourced: "true",
                    status: "outsourced",
                    couponid: this.utils.getCouponId().value,
                    designacceptancestarttime: designacceptancestarttime,
                    slabname: this.delivertime,
                    slabdiscount: this.servicePrice.slabdiscount,
                    serviceamount: this.servicePrice.paymentamount,
                    amount: parseInt(this.netPay),
                    paymenttype: "wallet",
                    paymentstatus: null
                };
            }
            this.utils.showLoading("Assigning").then(() => {
                this.apiService.updateDesignForm(postData, this.id).subscribe(value => {
                    if (this.design == 'prelim') {
                        this.createChatGroup(value);
                        this.newprelimsRef.update({ count: this.newprelimscount + 1 });
                        console.log("hello", this.newprelimscount);
                    }
                    else {
                        this.createChatGroup(value);
                        this.newpermitsRef.update({ count: this.newpermitscount + 1 });
                    }
                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar("Design request has been send to wattmonk successfully");
                        //this.navController.pop();
                        if (this.design == 'prelim') {
                            this.router.navigate(['/homepage/design']);
                            this.utils.setHomepageDesignRefresh(true);
                        }
                        else {
                            this.router.navigate(['/permithomepage/permitdesign']);
                            this.utils.setHomepagePermitRefresh(true);
                        }
                    });
                });
            });
        }
        else {
            if (this.design == 'prelim') {
                this.utils.setPaymentMode("wallet");
                this.utils.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_9__["ScheduleFormEvent"].PAY_EVENT);
            }
            else {
                this.utils.setPaymentMode("wallet");
                this.utils.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_9__["ScheduleFormEvent"].SEND_PERMIT_FORM);
            }
        }
    }
    addWallet(value) {
        //this.router.navigate(['/add-money',{mode:value,id:this.id,serviceAmount:this.netPay,design:this.design}])
        let objToSend = {
            queryParams: {
                mode: value,
                id: this.id,
                serviceAmount: this.netPay,
                design: this.design,
                fulldesigndata: this.fulldesigndata,
                slabname: this.delivertime,
                slabdiscount: this.servicePrice.slabdiscount,
                serviceinitialamount: this.servicePrice.paymentamount
            },
            skipLocationChange: false,
            fragment: 'top'
        };
        this.router.navigate(['/add-money'], {
            state: { productdetails: objToSend }
        });
    }
    cancel() {
        if (this.design === 'prelim') {
            this.router.navigate(['/homepage/design']);
            // this.utils.setHomepageDesignRefresh(true);
        }
        else {
            this.router.navigate(['permithomepage/permitdesign']);
            // this.utils.setHomepagePermitRefresh(true);
        }
    }
    refreshDesigns(event) {
        let showLoader = true;
        if (event !== null && event !== undefined) {
            showLoader = false;
        }
        showLoader = false;
        this.fetchData();
    }
    confirmforPostpaid() {
        if (this.id != null) {
            var postData = {};
            var designacceptancestarttime = new Date();
            if (this.design == 'prelim') {
                designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                postData = {
                    outsourcedto: 232,
                    isoutsourced: "true",
                    status: "outsourced",
                    designacceptancestarttime: designacceptancestarttime,
                    couponid: this.utils.getCouponId().value,
                    paymenttype: null,
                };
            }
            else {
                designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                postData = {
                    outsourcedto: 232,
                    isoutsourced: "true",
                    status: "outsourced",
                    designacceptancestarttime: designacceptancestarttime,
                    couponid: this.utils.getCouponId().value,
                    paymenttype: null,
                    slabname: this.delivertime,
                    slabdiscount: this.servicePrice.slabdiscount,
                    serviceamount: this.servicePrice.paymentamount,
                    amount: this.netPay
                };
            }
            this.utils.showLoading("Assigning").then(() => {
                this.apiService.updateDesignForm(postData, this.id).subscribe(value => {
                    this.utils.hideLoading().then(() => {
                        this.utils.showSnackBar("Design request has been send to wattmonk successfully");
                        this.navController.pop();
                        if (this.design == 'prelim') {
                            this.createChatGroup(this.design);
                            this.router.navigate(['/homepage/design']);
                            this.utils.setHomepageDesignRefresh(true);
                        }
                        else {
                            this.createChatGroup(this.design);
                            this.router.navigate(['/permithomepage/permitdesign']);
                            this.utils.setHomepagePermitRefresh(true);
                        }
                    });
                });
            });
        }
        else {
            if (this.design == 'prelim') {
                this.utils.setPaymentMode("null");
                this.utils.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_9__["ScheduleFormEvent"].SEND_DESIGN_FORM);
            }
            else {
                this.utils.setPaymentMode("null");
                this.utils.setScheduleFormEvent(_model_constants__WEBPACK_IMPORTED_MODULE_9__["ScheduleFormEvent"].SEND_PERMIT_FORM);
            }
        }
    }
    ionViewWillLeave() {
    }
    Congratulations() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'CogratulationalertClass',
                header: 'Congratulations!',
                message: '<div><img src="/assets/images/tick.png"> <span>you got discount of $' + this.code_discount + '</span></div>',
            });
            yield alert.present();
            setTimeout(() => alert.dismiss(), 1000);
        });
    }
    codeDiscountCalculation(data, price) {
        if (data.discounttype == 'percentage') {
            console.log(price);
            this.code_discount = (data.amount / 100) * this.netPay;
            // this.code_discount= this.code_discount.toFixed(2);
            this.discountAmount();
            console.log(this.code_discount);
            this.Congratulations();
        }
        else if (data.discounttype == 'amount') {
            this.code_discount = data.amount;
            console.log(this.code_discount);
            this.discountAmount();
            this.Congratulations();
        }
    }
    openModal() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _coupon_offers_modal_coupon_offers_modal_page__WEBPACK_IMPORTED_MODULE_10__["CouponOffersModalPage"],
                cssClass: 'coupon-modal-css',
                componentProps: {
                    request: this.design
                },
                backdropDismiss: false
            });
            modal.onDidDismiss().then((data) => {
                console.log(data);
                if (data.data.cancel == 'cancel') {
                }
                else if (data.data.data != null) {
                    this.coupondata = data.data.data;
                    console.log(this.coupondata);
                    this.utils.setCouponId(this.coupondata.id);
                    this.codeDiscountCalculation(this.coupondata, this.settingValue);
                }
            });
            // modal.dismiss(() => {
            //   ;
            //   this.getDesigns(null);
            // });
            return yield modal.present();
        });
    }
    removeCoupon() {
        this.coupondata = null;
        this.discountAmount();
        this.utils.setCouponId(null);
    }
    createChatGroup(design) {
        if (this.design == 'prelim') {
            var GUID = 'prelim' + "_" + new Date().getTime();
        }
        else if (this.design == 'permit') {
            var GUID = 'permit' + "_" + new Date().getTime();
        }
        var address = this.fulldesigndata.address.substring(0, 60);
        var groupName = this.fulldesigndata.name + "_" + address;
        var groupType = _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GROUP_TYPE.PRIVATE;
        var password = "";
        var group = new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].Group(GUID, groupName, groupType, password);
        _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].createGroup(group).then(group => {
            let membersList = [
                new _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GroupMember("" + this.fulldesigndata.createdby.id, _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].GROUP_MEMBER_SCOPE.ADMIN)
            ];
            _cometchat_pro_cordova_ionic_chat__WEBPACK_IMPORTED_MODULE_12__["CometChat"].addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            });
        });
    }
    checkboxClicking(event) {
        console.log(this.delivertime);
        this.servicecharges();
        this.removeCoupon();
    }
    paypalintegration() {
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
                            value: this.netPay
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
                    var postData = {};
                    var designacceptancestarttime = new Date();
                    if (this.design == 'prelim') {
                        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
                        postData = {
                            outsourcedto: 232,
                            isoutsourced: "true",
                            status: "outsourced",
                            couponid: this.utils.getCouponId().value,
                            designacceptancestarttime: designacceptancestarttime,
                            paymenttype: "paypal",
                            paymentstatus: "succeeded"
                        };
                    }
                    else {
                        designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                        postData = {
                            outsourcedto: 232,
                            isoutsourced: "true",
                            status: "outsourced",
                            couponid: this.utils.getCouponId().value,
                            designacceptancestarttime: designacceptancestarttime,
                            slabname: this.delivertime,
                            slabdiscount: this.servicePrice.slabdiscount,
                            serviceamount: this.servicePrice.servicecharge,
                            amount: this.netPay,
                            paymenttype: "paypal",
                            paymentstatus: "succeeded"
                        };
                    }
                    this.utils.showLoading("Assigning").then(() => {
                        this.apiService.updateDesignForm(postData, this.id).subscribe(value => {
                            if (this.design == 'prelim') {
                                this.createChatGroup(value);
                                this.newprelimsRef.update({ count: this.newprelimscount + 1 });
                                console.log("hello", this.newprelimscount);
                            }
                            else {
                                this.createChatGroup(value);
                                this.newpermitsRef.update({ count: this.newpermitscount + 1 });
                            }
                            this.utils.hideLoading().then(() => {
                                this.utils.showSnackBar("Design request has been send to wattmonk successfully");
                                //this.navController.pop();
                                if (this.design == 'prelim') {
                                    this.router.navigate(['/homepage/design']);
                                    this.utils.setHomepageDesignRefresh(true);
                                }
                                else {
                                    this.router.navigate(['/permithomepage/permitdesign']);
                                    this.utils.setHomepagePermitRefresh(true);
                                }
                            });
                        });
                    });
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
                console.log('onClick', data, actions);
                // this.resetStatus();
            },
        };
    }
};
PaymentModalPage.ctorParameters = () => [
    { type: _storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"] },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _utilities_service__WEBPACK_IMPORTED_MODULE_8__["UtilitiesService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_11__["AngularFireDatabase"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] }
];
PaymentModalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-payment-modal',
        template: _raw_loader_payment_modal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_payment_modal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PaymentModalPage);



/***/ }),

/***/ "Yvn2":
/*!*******************************************************!*\
  !*** ./src/app/payment-modal/payment-modal.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".black {\n  color: #111;\n  margin-left: 5px;\n}\n\n.CogratulationalertClass {\n  background-color: lightsteelblue;\n  text-align: center;\n}\n\n.clickEnableCls {\n  pointer-events: visible !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBheW1lbnQtbW9kYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUNBLGdCQUFBO0FBQ0o7O0FBQ0E7RUFDSSxnQ0FBQTtFQUNBLGtCQUFBO0FBRUo7O0FBRUE7RUFDSSxrQ0FBQTtBQUNKIiwiZmlsZSI6InBheW1lbnQtbW9kYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJsYWNre1xyXG4gICAgY29sb3I6IzExMTtcclxuICAgIG1hcmdpbi1sZWZ0OjVweDtcclxufVxyXG4uQ29ncmF0dWxhdGlvbmFsZXJ0Q2xhc3N7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodHN0ZWVsYmx1ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIFxyXG5cclxufVxyXG4uY2xpY2tFbmFibGVDbHN7XHJcbiAgICBwb2ludGVyLWV2ZW50czogdmlzaWJsZSAhaW1wb3J0YW50O1xyXG4gfVxyXG5cclxuXHJcbiBcclxuIl19 */");

/***/ }),

/***/ "y6lC":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/payment-modal/payment-modal.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header  class=\"ion-no-border white-bg\">\r\n  <ion-toolbar>\r\n    <ion-title></ion-title>\r\n    <ion-grid class=\"ion-padding-top ion-padding-start ion-padding-end header-bg\">\r\n      <ion-row  >\r\n    <ion-col size=\"1\">\r\n    <ion-button fill=\"clear\" size=\"small\" class=\"ion-no-padding\" (click)=\"cancel()\">\r\n        <ion-img src=\"/assets/images/back.svg\" class=\"action-icon\"></ion-img>\r\n    </ion-button>\r\n</ion-col>\r\n<ion-col class=\"ion-text-center\" size=\"9\" style=\"padding-left: 27px; text-align: center;\">\r\n  <ion-grid class=\"ion-align-items-center ion-justify-content-center\">\r\n      <ion-row class=\"ion-align-items-center ion-justify-content-center\">\r\n          <span class=\"survey-name ion-text-center\" style=\"font-size:x-large; text-align: center;\">Confirm your order</span>\r\n      </ion-row>\r\n  </ion-grid>\r\n</ion-col>\r\n</ion-row><ion-row></ion-row>\r\n</ion-grid></ion-toolbar></ion-header>\r\n<ion-content *ngIf=\"isShow\"><ion-row>\r\n  <h4 style=\"font-weight: bold;margin-bottom:0px !important;padding: 10px;\"></h4>\r\n</ion-row>\r\n<ion-row>\r\n      <h6 *ngIf=\"user?.ispaymentmodeprepay\" style=\"margin:10px;padding:5px;\"> Please make the payment to process your order with Wattmonk.</h6>\r\n      <h6 *ngIf=\"!user?.ispaymentmodeprepay\" style=\"margin:10px;padding:5px;\">On confirmation ,your design request purchase will be add to your monthly invoice Please find below summary of your service purchase.</h6>\r\n    </ion-row>\r\n    <ion-row >\r\n    <ion-card style=\"position: relative; width:100%;\" class=\"ion-padding\">\r\n      <ion-row style=\"width: 100%;\" *ngIf=\"design=='permit'\">\r\n       \r\n        <ion-col size=\"12\">\r\n          <ion-label style=\"font-size: medium;color:#111;font-weight: bold;float: left;\">Choose your delivery time</ion-label>\r\n        </ion-col >\r\n      \r\n        \r\n        <!-- <ion-col size=\"3\" >\r\n     <ion-checkbox value=\"6\" id=\"1\" name=\"box1\" (ionChange)=\"checkboxClicking($event)\"> </ion-checkbox>\r\n      <span style=\"font-size: larger; margin-left: 12%;  position: absolute;\">0-6</span>\r\n     </ion-col>\r\n    \r\n    <ion-col size=\"3\">\r\n    <ion-checkbox value=\"6\" id=\"2\" name=\"box2\" (ionChange)=\"checkboxClicking($event,)\"> </ion-checkbox>\r\n      <ion-label style=\"font-size: larger; margin-left: 12%;  position: absolute;\">6-12</ion-label>\r\n    </ion-col>\r\n\r\n    <ion-col size=\"3\">\r\n    <ion-checkbox value=\"6\" (ionChange)=\"checkboxClicking($event)\"> </ion-checkbox>\r\n      <ion-label style=\"font-size: larger; margin-left: 12%;  position: absolute;\">12-24</ion-label>\r\n    </ion-col>\r\n\r\n    <ion-col size=\"3\">\r\n    <ion-checkbox   (ionChange)=\"checkboxClicking($event)\"> </ion-checkbox>\r\n      <ion-label style=\"font-size: larger; margin-left: 12%;  position: absolute;\">24-48</ion-label>\r\n   </ion-col>\r\n     -->\r\n    <ion-radio-group style=\"width:100% \" (ionChange)=\"checkboxClicking($event)\"  value=\"delivertime\" [(ngModel)]=\"delivertime\" >\r\n      <ion-row style=\"height:35%\" >\r\n        <ion-col size=\"6\">\r\n      <ion-item lines=\"none\">\r\n      <ion-radio style=\"margin-right: 0px;\" slot=\"start\" value=\"4-6\" [disabled]=isradiodisable></ion-radio>\r\n     <ion-label style=\"font-size: medium; margin-left: 12%;  position: absolute;color: dimgrey;\">4-6 hrs</ion-label>\r\n      </ion-item>\r\n    </ion-col>\r\n\r\n    <ion-col size=\"6\">\r\n      <ion-item lines=\"none\">\r\n         <ion-radio style=\"margin-right: 0px;\" slot=\"start\" value=\"6-12\" [disabled]=isradiodisable ></ion-radio>\r\n         <ion-label style=\"font-size: medium; margin-left: 12%;  position: absolute;color: dimgrey;\">6-12 hrs</ion-label>\r\n        </ion-item>\r\n    </ion-col>\r\n      </ion-row>\r\n\r\n      <ion-row style=\"height:35%\">\r\n    <ion-col size=\"6\">\r\n      <ion-item lines=\"none\">\r\n      \r\n        <ion-radio  style=\"margin-right: 0px;\" slot=\"start\" value=\"12-24\" [disabled]=isradiodisable ></ion-radio>\r\n        <ion-label style=\"font-size: medium; margin-left: 12%;  position: absolute;color: dimgrey;\">12-24 hrs</ion-label>\r\n      </ion-item>\r\n    </ion-col>\r\n    <ion-col size=\"6\">\r\n      <ion-item lines=\"none\">\r\n       \r\n        <ion-radio style=\"margin-right: 0px;\" slot=\"start\"  value=\"24-48\" ></ion-radio>\r\n        <ion-label style=\"font-size: medium; margin-left: 12%;  position: absolute;color: dimgrey;\">24-48 hrs</ion-label>\r\n      </ion-item>\r\n    </ion-col>\r\n    </ion-row>\r\n    </ion-radio-group>\r\n      </ion-row>\r\n\r\n      <ion-row style=\"width: 100%;\" *ngIf=\"user?.role.type!='clientadmin' && user?.ispaymentmodeprepay\">\r\n        <ion-col size=\"6\">\r\n          <ion-label style=\"font-size: medium;color:#111;font-weight: bold;float: left;\">Amount in Wallet</ion-label>\r\n        </ion-col>\r\n        <ion-col size=\"6\">\r\n          <ion-label style=\"font-size: large;color:#111;float:right;\">$ {{user?.amount}}</ion-label>\r\n        </ion-col>\r\n      </ion-row>\r\n      <ion-row style=\"width: 100%;\"><ion-col size=\"6\">\r\n      <ion-label style=\"font-size: medium;color:#111;font-weight: bold; float: left;\">Service Charges</ion-label>\r\n      </ion-col>\r\n      <ion-col size=\"6\">\r\n      <ion-label style=\"font-size: large;color:#111; float:right;\"> $ {{settingValue}} </ion-label>\r\n    </ion-col>\r\n    </ion-row>\r\n    <a *ngIf=\"this.count>=this.freeCharges\" (click)='openModal()'><u>Have a Promocode</u></a>\r\n<ion-row ><ion-col size=\"12\"><ion-item *ngIf=\"coupondata!=null\"  >\r\n  <ion-input type=\"text\"  autocapitalize=\"words\"\r\n    class=\"ion-padding\"  disabled=\"true\">{{coupondata?.code}}</ion-input>\r\n  <ion-label class=\"clickEnableCls\" style=\"color:midnightblue;\" (click)=\"removeCoupon()\" >remove</ion-label>\r\n  </ion-item>\r\n</ion-col>\r\n   <!-- <ion-col style=\"align-self: flex-end;\"><ion-button size='small' (click)=\"Congratulations()\">Apply</ion-button> </ion-col> -->\r\n  </ion-row> \r\n  <!-- <ion-row style=\"width: 100%;\" *ngIf=\"discount!=null\"><ion-col size=\"6\">\r\n    <ion-label style=\"font-size: medium;color:#111;font-weight: bold;float: left;\">Discount</ion-label>\r\n    </ion-col>\r\n    <ion-col size=\"6\">    <ion-label style=\"font-size: large;color:#111; float:right;\" >$ {{discount}}</ion-label>\r\n    \r\n  </ion-col> -->\r\n  <!-- <ion-col size=\"6\"> -->\r\n    <!-- <ion-label style=\"font-size: larger;\">Service Used</ion-label><br>\r\n    <ion-label style=\"font-size: x-large;\">{{design}} design</ion-label> -->\r\n  <!-- </ion-col>\r\n</ion-row> -->\r\n\r\n<!-- <ion-row>\r\n  <ion-col>\r\n  <ion-label style=\"font-size: larger;\">You have to pay</ion-label><br>\r\n  <ion-label *ngIf=\"count>freeCharges;else stat\" style=\"font-size: x-large;\"> $ {{settingValue}}\r\n   </ion-label>\r\n  <ng-template #stat>\r\n    <ion-label  style=\"font-size: x-large;\">$ 0</ion-label>\r\n  </ng-template>\r\n</ion-col>\r\n<ion-col size=\"6\">\r\n  <ion-label style=\"font-size: larger;\">Design Id</ion-label><br>\r\n  <ion-label style=\"font-size: x-large;\" >{{id}}</ion-label>\r\n</ion-col>\r\n</ion-row> -->\r\n<!-- <ion-row style=\"width: 100%;\" *ngIf=\"coupondata!=null\">\r\n  <ion-col size=\"10\"><ion-label style=\"font-size:small;color:#111;\">Coupon Code Discount</ion-label></ion-col>\r\n    <ion-col size=\"2\"><ion-label style=\"font-size: large;color:#111\" >{{code_discount}} </ion-label></ion-col>\r\n</ion-row>  -->\r\n    </ion-card>\r\n  </ion-row>\r\n  <!--<ion-row style=\"width: 100%;\">\r\n    <ion-col size=\"10\"><ion-label style=\"font-size:small;color:#111;\">You have to pay</ion-label></ion-col>\r\n      <ion-col size=\"2\"><ion-label style=\"font-size: large;color:#111\" >$ 35 </ion-label></ion-col>\r\n  </ion-row>-->\r\n  <ion-item><ion-row style=\"width: 100%;\" >\r\n    <!-- <ion-col size=\"9\"><ion-label style=\"font-size:medium;color:#111;font-weight: bold;\">Net Payable Amount</ion-label></ion-col> -->\r\n    <ion-col size=\"9\"><ion-label style=\"font-size:medium;color:#111;font-weight: bold;\">You have to pay</ion-label></ion-col>\r\n      <ion-col size=\"3\"><ion-label style=\"font-size: large;color:#111;float:right;padding-right: 10%;\" *ngIf=\"netPay!=null\" >$ {{netPay}} </ion-label>\r\n      <ion-label style=\"font-size: large;color:#111; float:right; padding-right: 10%;\" *ngIf=\"netPay==null\" >$ {{settingValue}} </ion-label>\r\n   </ion-col>\r\n    </ion-row></ion-item>\r\n  <ion-row class=\"ion-padding\" *ngIf=\"user?.role.type!=='clientadmin'\">\r\n    <ion-col size=\"12\" *ngIf=\"user?.ispaymentmodeprepay\" >\r\n      <!-- <ion-item *ngIf=\"user?.amount>=settingValue\" (click)=\"confirm()\" >\r\n        <ion-button  fill=\"clear\"><ion-icon name=\"checkmark-circle-outline\" style=\"color: blue;\"></ion-icon>&nbsp;<ion-label class=\"black\">Confirm</ion-label></ion-button>\r\n      </ion-item> -->\r\n      <ion-item (click)=\"addWallet('wallet')\" *ngIf=\"netPay>user?.amount\">\r\n        <ion-button  fill=\"clear\" ><ion-icon name=\"cash-outline\" style=\"color:green;font-size:25px\"></ion-icon>&nbsp;<ion-label class=\"black\">Add Money</ion-label></ion-button>\r\n      </ion-item>\r\n       <!-- <ion-item (click)=\"addWallet('card')\"*ngIf=\"netPay>user?.amount\" >\r\n        <ion-button  fill=\"clear\"  ><ion-icon name=\"card-outline\" style=\"color:brown;font-size:25px\"></ion-icon>&nbsp;<ion-label class=\"black\">Pay via card </ion-label></ion-button>\r\n      </ion-item> -->\r\n      <!-- <ion-item>\r\n        <div id=\"paypal-button-container\"></div>\r\n      </ion-item> -->\r\n     <ion-col sizze=\"12\" *ngIf=\"netPay>user?.amount\">\r\n      <ngx-paypal class=\"paypal-button\" [config]=\"payPalConfig\"></ngx-paypal></ion-col>\r\n    </ion-col>\r\n    <ion-col size=\"12\" *ngIf=\"!user?.ispaymentmodeprepay\" >\r\n      <!-- <ion-item  (click)=\"confirmforPostpaid()\" >\r\n        <ion-button  fill=\"clear\"><ion-icon name=\"checkmark-circle-outline\" style=\"color: blue;\"></ion-icon>&nbsp;<ion-label class=\"black\">Confirm</ion-label></ion-button>\r\n      </ion-item> -->\r\n      \r\n    </ion-col>\r\n    </ion-row>\r\n    \r\n    </ion-content>\r\n    <div *ngIf=\"isShow\">\r\n    <ion-footer *ngIf=\"user?.ispaymentmodeprepay && user?.parent.amount>=netPay && (user.role.type == 'clientsuperadmin' || user.role.type =='clientadmin')\" (click)=\"confirm()\"  class=\"ion-padding\" style=\"text-align: center;background: blue;color:#fff\">\r\n      Confirm\r\n       </ion-footer>\r\n    <ion-footer *ngIf=\"!user?.ispaymentmodeprepay\" (click)=\"confirmforPostpaid()\" class=\"ion-padding\" style=\"text-align: center;background: blue;color:#fff\">Confirm</ion-footer>\r\n    <ion-footer *ngIf=\"netPay > user?.parent.amount && user.role.type=='clientadmin'\" class=\"ion-padding\" style=\"text-align: center;color:red\" class=\"ion-padding\">Insufficient Amount</ion-footer>\r\n  </div>\r\n");

/***/ })

}]);
//# sourceMappingURL=default~designoverview-designoverview-module~homepage-homepage-module~onhold-onhold-module~payment-m~b2fa51b1.js.map