import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResendpagedialogPage } from './resendpagedialog.page';

describe('ResendpagedialogPage', () => {
  let component: ResendpagedialogPage;
  let fixture: ComponentFixture<ResendpagedialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendpagedialogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResendpagedialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
