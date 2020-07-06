import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsurveysComponent } from './newsurveys.component';

describe('NewsurveysComponent', () => {
  let component: NewsurveysComponent;
  let fixture: ComponentFixture<NewsurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsurveysComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
