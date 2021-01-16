import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnassignedPage } from './unassigned.page';

describe('UnassignedPage', () => {
  let component: UnassignedPage;
  let fixture: ComponentFixture<UnassignedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnassignedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
