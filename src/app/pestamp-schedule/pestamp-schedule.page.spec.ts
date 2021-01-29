import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PestampSchedulePage } from './pestamp-schedule.page';

describe('PestampSchedulePage', () => {
  let component: PestampSchedulePage;
  let fixture: ComponentFixture<PestampSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PestampSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PestampSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
