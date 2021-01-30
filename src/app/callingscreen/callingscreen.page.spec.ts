import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallingscreenPage } from './callingscreen.page';

describe('CallingscreenPage', () => {
  let component: CallingscreenPage;
  let fixture: ComponentFixture<CallingscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CallingscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
