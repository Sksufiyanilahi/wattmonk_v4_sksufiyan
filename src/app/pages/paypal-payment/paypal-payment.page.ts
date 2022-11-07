import { Component, Inject, Input, OnInit } from "@angular/core";

import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import { environment } from "../../../environments/environment";
import { User } from 'src/app/models/user.model';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { UtilitiesService } from "src/app/services/utilities/utilities.service";
import { ApiService } from "src/app/services/api/api.service";

export interface PaymentData {
    isdatamodified: boolean;
    user: User;
    paymentBy;
    paymenttitle: string;
    isdirectpayment: boolean;
    amounttopay;
    isAlreadyPaid: boolean;
    wireTransferPay: boolean;
}

@Component({
    selector: 'app-paypal-payment',
    templateUrl: './paypal-payment.page.html',
    styleUrls: ['./paypal-payment.page.scss'],
})
export class PaypalPaymentPage implements OnInit {
    showSuccess: boolean = false;
    notifyService: any;

    public payPalConfig?: IPayPalConfig;
    public serviceAmount: any = '';
    public serviceDiscount: any = '';
    public serviceFinalAmount: any = '';
    // public showPaypal: boolean = false;
    public serviceCharges: AngularFireObject<any>;
    public serviceChargeData: Observable<any>;
    public getId: any;

    constructor(
        public modalCtrl: ModalController,
        private db: AngularFireDatabase,
        private utils: UtilitiesService,
        private apiService: ApiService,
        private nav: NavParams,
    ) {
        this.initConfig();
        this.getId = this.nav.get('id');
        console.log('this.getId', this.getId);
        
        this.serviceCharges = db.object("service_charges");
        console.log('this.serviceCharges', this.serviceCharges);

        this.serviceChargeData = this.serviceCharges.valueChanges();
        console.log('let serviceChargeData', this.serviceChargeData);
        this.serviceChargeData.subscribe(
            (res) => {
                console.log('res', res);
                if (res.survey_download) {
                    this.serviceAmount = res.survey_download.price;
                    this.serviceDiscount = res.survey_download.discount ? res.survey_download.discount : 0; // 0
                    this.serviceFinalAmount = this.serviceAmount - this.serviceDiscount; // 
                }
            });
    }

    ngOnInit() {
    }

    private initConfig(): void {
        console.log('initConfig');
        this.payPalConfig = {
            currency: environment.PAYPAL_CONSTANTS.CURRENCY,
            clientId: environment.PAYPAL_CONSTANTS.CLIENT_ID,
            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: environment.PAYPAL_CONSTANTS.CURRENCY,
                            value: this.serviceFinalAmount,
                            breakdown: {
                                item_total: {
                                    currency_code: environment.PAYPAL_CONSTANTS.CURRENCY,
                                    value: this.serviceFinalAmount
                                }
                            }
                        },
                        items: [
                            {
                                name: 'Wattmonk Survey Service',
                                quantity: '1',
                                category: 'DIGITAL_GOODS',
                                unit_amount: {
                                    currency_code: environment.PAYPAL_CONSTANTS.CURRENCY,
                                    value: this.serviceFinalAmount,
                                },
                            }
                        ]
                    }
                ]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                if (data.status == "COMPLETED") {
                    let postData: any = {
                        "surveypdf_payment": true
                    }
                    this.apiService.updateSurveyForm(postData, this.getId).subscribe((success) => {
                        console.log('updateSurveyForm success', success);
                    }, (error) => {
                    });

                    this.showSuccess = true;
                    this.utils.showSnackBar("Payment has been successfully");
                    this.dismiss(true);
                } else {
                    this.showSuccess = false;
                    this.dismiss(false);
                }
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: (error) => {
                console.log('OnError', error);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            },
        };
    }

    onCloseClick(): void {
        console.log('onCloseClick');
    }

    // paytopaypal() {
    //     // this.showPaypal = true;
    // }

    dismiss(paymentSuccess = false) {
        this.modalCtrl.dismiss({
            // success: true,
            success: paymentSuccess,
        });
    }
}
