import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InverterSelectionPage } from './inverter-selection.page';

describe('InverterSelectionPage', () => {
  let component: InverterSelectionPage;
  let fixture: ComponentFixture<InverterSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverterSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InverterSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
