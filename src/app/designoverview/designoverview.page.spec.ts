import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesignoverviewPage } from './designoverview.page';

describe('DesignoverviewPage', () => {
  let component: DesignoverviewPage;
  let fixture: ComponentFixture<DesignoverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignoverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesignoverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
