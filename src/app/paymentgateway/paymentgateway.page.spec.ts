import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentgatewayPage } from './paymentgateway.page';

describe('PaymentgatewayPage', () => {
  let component: PaymentgatewayPage;
  let fixture: ComponentFixture<PaymentgatewayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentgatewayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentgatewayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
