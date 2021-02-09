import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PestampdelivermodalPage } from './pestampdelivermodal.page';

describe('PestampdelivermodalPage', () => {
  let component: PestampdelivermodalPage;
  let fixture: ComponentFixture<PestampdelivermodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PestampdelivermodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PestampdelivermodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
