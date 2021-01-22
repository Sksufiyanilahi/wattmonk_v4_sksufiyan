import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PEengineerdesignComponent } from './peengineerdesign.component';

describe('PEengineerdesignComponent', () => {
  let component: PEengineerdesignComponent;
  let fixture: ComponentFixture<PEengineerdesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PEengineerdesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PEengineerdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
