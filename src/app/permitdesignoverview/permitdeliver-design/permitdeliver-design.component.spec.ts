import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitdeliverDesignComponent } from './permitdeliver-design.component';

describe('PermitdeliverDesignComponent', () => {
  let component: PermitdeliverDesignComponent;
  let fixture: ComponentFixture<PermitdeliverDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitdeliverDesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitdeliverDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
