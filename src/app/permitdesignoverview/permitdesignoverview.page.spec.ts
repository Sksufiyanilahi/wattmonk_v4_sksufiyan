import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermitdesignoverviewPage } from './permitdesignoverview.page';

describe('PermitdesignoverviewPage', () => {
  let component: PermitdesignoverviewPage;
  let fixture: ComponentFixture<PermitdesignoverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitdesignoverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermitdesignoverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
