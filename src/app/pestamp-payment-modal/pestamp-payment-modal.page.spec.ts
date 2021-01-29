import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PestampPaymentModalPage } from './pestamp-payment-modal.page';

describe('PestampPaymentModalPage', () => {
  let component: PestampPaymentModalPage;
  let fixture: ComponentFixture<PestampPaymentModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PestampPaymentModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PestampPaymentModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
