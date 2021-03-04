import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeamschedulePage } from './teamschedule.page';

describe('TeamschedulePage', () => {
  let component: TeamschedulePage;
  let fixture: ComponentFixture<TeamschedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamschedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamschedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
