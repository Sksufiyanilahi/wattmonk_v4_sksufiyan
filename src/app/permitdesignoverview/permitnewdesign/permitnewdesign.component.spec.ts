import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitnewdesignComponent } from './permitnewdesign.component';

describe('PermitnewdesignComponent', () => {
  let component: PermitnewdesignComponent;
  let fixture: ComponentFixture<PermitnewdesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitnewdesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitnewdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
