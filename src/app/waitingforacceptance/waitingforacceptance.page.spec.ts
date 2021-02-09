import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitingforacceptancePage } from './waitingforacceptance.page';

describe('WaitingforacceptancePage', () => {
  let component: WaitingforacceptancePage;
  let fixture: ComponentFixture<WaitingforacceptancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingforacceptancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitingforacceptancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
