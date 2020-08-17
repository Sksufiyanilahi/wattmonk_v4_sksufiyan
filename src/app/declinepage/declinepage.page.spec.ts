import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeclinepagePage } from './declinepage.page';

describe('DeclinepagePage', () => {
  let component: DeclinepagePage;
  let fixture: ComponentFixture<DeclinepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclinepagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeclinepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
