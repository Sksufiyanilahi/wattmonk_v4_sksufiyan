import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DelievereddesignComponent } from './delievereddesign.component';

describe('DelievereddesignComponent', () => {
  let component: DelievereddesignComponent;
  let fixture: ComponentFixture<DelievereddesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelievereddesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DelievereddesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
