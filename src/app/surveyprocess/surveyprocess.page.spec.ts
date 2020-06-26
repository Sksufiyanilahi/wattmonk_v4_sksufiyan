import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyprocessPage } from './surveyprocess.page';

describe('SurveyprocessPage', () => {
  let component: SurveyprocessPage;
  let fixture: ComponentFixture<SurveyprocessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyprocessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyprocessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
