import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatsoverviewdetailsPage } from './statsoverviewdetails.page';

describe('StatsoverviewdetailsPage', () => {
  let component: StatsoverviewdetailsPage;
  let fixture: ComponentFixture<StatsoverviewdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsoverviewdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsoverviewdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
