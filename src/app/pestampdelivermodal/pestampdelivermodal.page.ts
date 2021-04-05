import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ApiService } from '../api.service';
import { FIELD_REQUIRED, INVALID_AMOUNT } from '../model/constants';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-pestampdelivermodal',
  templateUrl: './pestampdelivermodal.page.html',
  styleUrls: ['./pestampdelivermodal.page.scss'],
})
export class PestampdelivermodalPage implements OnInit {

  deliverForm:FormGroup

  id:number;
  data:any;
  loggedInUser:any;

  amountError='Please enter an amount less than $5000'
  //minAmountError = 'Please enter an amount greater than $0'
  fieldRequired = "Delivery Charges should be minimum $1";
  chargesError:string=null;

  options: LaunchNavigatorOptions = {
    start: '',
    app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  constructor(private formBuilder:FormBuilder,
              private nav : NavParams,
              private utils : UtilitiesService,
              private apiService : ApiService,
              private navController:NavController,
              private modalCtrl:ModalController,
              private launchNavigator: LaunchNavigator,
              private storage:StorageService) {
    this.deliverForm = formBuilder.group({
      delivercharges : new FormControl("",[ Validators.min(1),
        Validators.max(5000)]),
      comments : new FormControl("")
    })
  }

  ngOnInit() {
    this.loggedInUser = this.storage.getUser();
    this.id= this.nav.get('id');
    this.data=this.nav.get('designData');

  }

  deliver()
  {


    var deliverycharges;
    if(this.data.modeofstamping == 'hardcopy' || this.data.modeofstamping =='both' ){

      if(this.deliverForm.get('delivercharges').value ==='undefined' || this.deliverForm.get('delivercharges').value ==='' || this.deliverForm.get('delivercharges').value === null || this.deliverForm.get('delivercharges').invalid){

        //alertData.deliverycharges.setValidators([Validators.required]);
        //this.chargesError = "Please Enter Delivery Charges";
        this.utils.errorSnackBar("Please Enter Valid Delivery Charges");
        return;
      }
      deliverycharges = this.deliverForm.get('delivercharges').value;
    } else {
      deliverycharges = 0;
    // }
  }
  //if(this.deliverForm.status=='VALID'){
  var postData={};
  // if(this.deliverForm.get("comments").value!=""){
  //            postData = {
  //             status: "delivered",
  //             deliverycharges: deliverycharges,
  //             comments: this.deliverForm.get("comments").value,
  //              };
  //             }
  //              else{
  //               postData = {
  //                 status: "delivered",
  //                 deliverycharges: deliverycharges,
  //                 comments:""
  //                  };
  //              }
              if (this.data.type == 'both') {
                if (this.loggedInUser.peengineertype == "electrical") {
                  postData = {
                    status: "delivered",
                    comments: this.deliverForm.get("comments").value,
                    deliverycharges: deliverycharges,
                    electricalpestampdelivered: true
                  };
                }
                else if (this.loggedInUser.peengineertype == "structural") {
                  postData = {
                    status: "delivered",
                    comments: this.deliverForm.get("comments").value,
                    deliverycharges: deliverycharges,
                    structuralpestampdelivered: true
                  };
                }
              }
              else {
                postData = {
                  status: "delivered",
                  comments: this.deliverForm.get("comments").value,
                  deliverycharges: deliverycharges,
                };
              }

               this.apiService.updatePestamps(this.id,postData).subscribe((value) => {
                this.utils.hideLoading().then(()=>{
                  ;

                 this.utils.showSnackBar('Pe Stamp request has been delivered successfully');
                 this.modalCtrl.dismiss({
                  'dismissed': true
                });
                 // this.utils.setPeStampRefresh(true);
                })
              }, (error) => {
                this.utils.hideLoading().then(()=>{
                  // this.modalCtrl.dismiss({
                  //   'dismissed': true
                  // });
                  this.utils.errorSnackBar("Error");
                });
                ;
              });
}

goBack() {
  this.modalCtrl.dismiss({
    'dismissed': true,
    cancel:'cancel'
  });

 }

 openAddressOnMap(address: string) {
  this.launchNavigator.navigate(address, this.options);
}

// checkValidations(){
//   this.chargesError = null;
// }
}

