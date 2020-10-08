import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalystoverviewPage } from './analystoverview.page';

describe('AnalystoverviewPage', () => {
  let component: AnalystoverviewPage;
  let fixture: ComponentFixture<AnalystoverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystoverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalystoverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
