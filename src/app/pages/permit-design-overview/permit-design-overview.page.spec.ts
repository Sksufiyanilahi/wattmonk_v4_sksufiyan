import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitDesignOverviewPage } from './permit-design-overview.page';

describe('PermitDesignOverviewPage', () => {
  let component: PermitDesignOverviewPage;
  let fixture: ComponentFixture<PermitDesignOverviewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitDesignOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitDesignOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
