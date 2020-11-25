import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermithomepagePage } from './permithomepage.page';

describe('PermithomepagePage', () => {
  let component: PermithomepagePage;
  let fixture: ComponentFixture<PermithomepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermithomepagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermithomepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
