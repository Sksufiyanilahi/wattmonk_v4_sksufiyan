import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ProfileHistoryComponent } from '../profile/profile-history/profile-history.component';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.page.html',
  styleUrls: ['./add-money.page.scss'],
})
export class AddMoneyPage implements OnInit {
 token:any;
 userData:User
  
  constructor(private stripe:Stripe,
    private apiService:ApiService,
    private storageService:StorageService
    ) { }

  ngOnInit() {
    this.userData = this.storageService.getUser();
  }

  addMoney(form: NgForm)
  {var data={};
    console.log(form.value.cardNo);
    this.stripe.setPublishableKey('pk_test_51HQ4SfBlSfQmxsSfuw13DnL4B9BprtM135rSSoPnKNW7ncjYaIuNLLIajGtILpysRPYX3BvKoIDpxO2pP2SEXnqL00K7GpIR6Z');
    let card:any= {
      number : form.value.cardNo,
      
      expYear : form.value.expYear,
      expMonth : form.value.expMonth,
      cvc : form.value.cvc,
      amount : form.value.amount,
      
    }
    console.log(card);

    this.stripe.createCardToken(card).then(token => {
      alert(token.id);
      this.token=token.id}).catch(error => alert(error));
  data={
    amount:form.value.amount,
    email:this.userData.email,
    paymenttype: "wallet",
    token: this.token,
    user:this.userData.id
  }
  console.log(data);
    this.apiService.createPayment(data).subscribe()

  }

}
