import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitInreviewDesignComponent } from './permit-inreview-design.component';

describe('PermitInreviewDesignComponent', () => {
  let component: PermitInreviewDesignComponent;
  let fixture: ComponentFixture<PermitInreviewDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitInreviewDesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitInreviewDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
