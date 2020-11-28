import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitDeliverDesignComponent } from './permit-deliver-design.component';

describe('PermitDeliverDesignComponent', () => {
  let component: PermitDeliverDesignComponent;
  let fixture: ComponentFixture<PermitDeliverDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitDeliverDesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitDeliverDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
