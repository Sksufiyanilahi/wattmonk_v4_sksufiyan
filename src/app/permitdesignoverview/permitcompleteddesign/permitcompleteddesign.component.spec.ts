import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitcompleteddesignComponent } from './permitcompleteddesign.component';

describe('PermitcompleteddesignComponent', () => {
  let component: PermitcompleteddesignComponent;
  let fixture: ComponentFixture<PermitcompleteddesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitcompleteddesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitcompleteddesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
