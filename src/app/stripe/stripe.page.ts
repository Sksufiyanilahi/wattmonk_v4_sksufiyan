import { Component, OnInit } from '@angular/core';
// import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
  card:{
    number:'',
    expMonth:0,
    expYear:0,
    cvc:''
  }

  constructor() { }

  ngOnInit() {
  }

  stripepayment(){
    // this.stripe.setPublishableKey("pk_test_51HUoT7EmzMn44Mbmtqd3Sfx1knRySaWxgTuOAbVlsGFmS0zVpfLnkpzDL32sZcV116MCpI3vKA2E3Zw9WEopsnFu00pyCDs0sq");

        let card = {
        number: '4242424242424242',
        expMonth: 12,
        expYear: 2020,
        cvc: '220'
        }

// this.stripe.createCardToken(this.card)
//    .then(token => console.log(token.id))
//    .catch(error => console.error(error));
  }

}
