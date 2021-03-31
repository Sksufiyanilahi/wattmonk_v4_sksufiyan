import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { UtilitiesService } from '../utilities.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StorageService } from '../storage.service';
import { MixpanelService } from '../utilities/mixpanel.service';

@Component({
  selector: 'app-coupon-offers-modal',
  templateUrl: './coupon-offers-modal.page.html',
  styleUrls: ['./coupon-offers-modal.page.scss'],
})
export class CouponOffersModalPage implements OnInit {

  couponForm:FormGroup
  Coupons:any;
  selectedCoupon:any;
  selecteduserId=null;
  user:any
 error:any
  requesttype:any

  constructor(
    private apiservice:ApiService,
    private modalctrl:ModalController,
    private utils:UtilitiesService,
    private formBuilder : FormBuilder,
    private storageService:StorageService,
    private nav:NavParams,
    private mixpanelService:MixpanelService
  ) {
    this.couponForm = this.formBuilder.group({
      couponInput : new FormControl('')
    })
  }

  ngOnInit() {
    this.requesttype= this.nav.get('request');
    this.apiservice.getCoupons(this.requesttype).subscribe((res)=>{
      this.Coupons=res;

    },
    (error)=>{

    })
    this.user=this.storageService.getUser();
    this.mixpanelService.track("COUPON_OFFER_PAGE_OPEN", {
    });
  }

  selectCoupon(coupondata:any) {


    // this.assigneeData.emit(assignee);
    this.Coupons.forEach((item) => {
      item.selected = false;

    });

    if (coupondata.id === this.selecteduserId) {
      this.selecteduserId = null;
      this.selectedCoupon=null;
      this.couponForm.patchValue({
        couponInput:""
      })


    } else {
      coupondata.selected = true;

      this.selectedCoupon=coupondata
      this.couponForm.patchValue({
        couponInput:coupondata.code
      })
      this.selecteduserId = coupondata.id;
      this.error=null;


    }
  }

  changeInput(){
    this.error=null;
  }

  applycode(){

    if(this.couponForm.get('couponInput').value !=''){
      this.utils.showLoading("Applying").then(()=>{
        const postData={
          couponcode:this.couponForm.get('couponInput').value,
          userid:this.user.parent.id,
          requesttype:this.requesttype
      }
      this.apiservice.sendCoupon(postData).subscribe((res)=>{

        this.selectedCoupon=res;
        if(this.selectedCoupon.error){
        this.error=this.selectedCoupon.message;
        this.selectedCoupon=null
        }
        else{
        this.modalctrl.dismiss({
          'dismissed':true,
          data:this.selectedCoupon
        })
      }},
     (error)=>{this.utils.errorSnackBar("Invalid Coupon Code")})

        this.utils.hideLoading();
        }
        )

    }
    else if(this.selectedCoupon!=null){
   this.utils.showLoading("Applying").then(()=>{

    this.modalctrl.dismiss({
    'dismissed':true,
    data:this.selectedCoupon
   })
  this.utils.hideLoading();
}
)}
else{
  this.utils.errorSnackBar("Please select or enter a promo code");
}
  }


  cancel(){
    this.modalctrl.dismiss({
      'dismissed': true,
      cancel:'cancel'
    });
  }
}
