import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyoroverviewPage } from './surveyoroverview.page';

describe('SurveyoroverviewPage', () => {
  let component: SurveyoroverviewPage;
  let fixture: ComponentFixture<SurveyoroverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyoroverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyoroverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
