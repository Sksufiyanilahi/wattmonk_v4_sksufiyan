import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CouponOffersModalPage } from './coupon-offers-modal.page';

describe('CouponOffersModalPage', () => {
  let component: CouponOffersModalPage;
  let fixture: ComponentFixture<CouponOffersModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponOffersModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CouponOffersModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
