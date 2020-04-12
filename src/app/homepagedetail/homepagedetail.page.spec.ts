import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomepagedetailPage } from './homepagedetail.page';

describe('HomepagedetailPage', () => {
  let component: HomepagedetailPage;
  let fixture: ComponentFixture<HomepagedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepagedetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepagedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
