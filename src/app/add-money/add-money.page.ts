import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.page.html',
  styleUrls: ['./add-money.page.scss'],
})
export class AddMoneyPage implements OnInit {

  constructor(private stripe:Stripe) { }

  ngOnInit() {
  }

  addMoney(form: NgForm)
  {console.log(form.value.cardNo);
    this.stripe.setPublishableKey('pk_test_51HQ4SfBlSfQmxsSfuw13DnL4B9BprtM135rSSoPnKNW7ncjYaIuNLLIajGtILpysRPYX3BvKoIDpxO2pP2SEXnqL00K7GpIR6Z');
    let card:any= {
      number : form.value.cardNo,
      
      expYear : form.value.expYear,
      expMonth : form.value.expMonth,
      cvc : form.value.cvc,
      amount : form.value.amount,
      
    }
    console.log(card);

    this.stripe.createCardToken(card).then(token => alert(token.id)).catch(error => alert(error));
  }

}
