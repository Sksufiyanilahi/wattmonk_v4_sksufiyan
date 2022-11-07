import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PestampDeliverModalPage } from './pestamp-deliver-modal.page';

describe('PestampDeliverModalPage', () => {
  let component: PestampDeliverModalPage;
  let fixture: ComponentFixture<PestampDeliverModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PestampDeliverModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PestampDeliverModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
