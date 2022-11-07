import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { peengineerFilterpagePage } from './peengineerfilterpage.page';

describe('peengineerFilterpagePage', () => {
  let component: peengineerFilterpagePage;
  let fixture: ComponentFixture<peengineerFilterpagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ peengineerFilterpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(peengineerFilterpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
