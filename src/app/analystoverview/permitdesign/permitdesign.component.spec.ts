import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitdesignComponent } from './permitdesign.component';

describe('PermitdesignComponent', () => {
  let component: PermitdesignComponent;
  let fixture: ComponentFixture<PermitdesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitdesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
