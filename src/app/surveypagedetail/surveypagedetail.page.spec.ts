import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveypagedetailPage } from './surveypagedetail.page';

describe('SurveypagedetailPage', () => {
  let component: SurveypagedetailPage;
  let fixture: ComponentFixture<SurveypagedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveypagedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveypagedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
