import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrelimComponent } from './prelim.component';

describe('PrelimComponent', () => {
  let component: PrelimComponent;
  let fixture: ComponentFixture<PrelimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrelimComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrelimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
