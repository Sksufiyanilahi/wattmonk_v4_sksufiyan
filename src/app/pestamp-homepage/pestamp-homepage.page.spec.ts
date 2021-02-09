import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PestampHomepagePage } from './pestamp-homepage.page';

describe('PestampHomepagePage', () => {
  let component: PestampHomepagePage;
  let fixture: ComponentFixture<PestampHomepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PestampHomepagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PestampHomepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
