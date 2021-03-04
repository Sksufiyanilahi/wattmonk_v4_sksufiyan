import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeammodulePage } from './teammodule.page';

describe('TeammodulePage', () => {
  let component: TeammodulePage;
  let fixture: ComponentFixture<TeammodulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeammodulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeammodulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
