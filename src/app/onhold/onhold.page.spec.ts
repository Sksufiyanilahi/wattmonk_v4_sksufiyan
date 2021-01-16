import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnholdPage } from './onhold.page';

describe('OnholdPage', () => {
  let component: OnholdPage;
  let fixture: ComponentFixture<OnholdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnholdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnholdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
