import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingForAcceptancePage } from './waiting-for-acceptance.page';

describe('WaitingForAcceptancePage', () => {
  let component: WaitingForAcceptancePage;
  let fixture: ComponentFixture<WaitingForAcceptancePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingForAcceptancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingForAcceptancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
