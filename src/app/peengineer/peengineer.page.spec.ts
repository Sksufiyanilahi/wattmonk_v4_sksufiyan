import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PEengineerPage } from './peengineer.page';

describe('PEengineerPage', () => {
  let component: PEengineerPage;
  let fixture: ComponentFixture<PEengineerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PEengineerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PEengineerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
