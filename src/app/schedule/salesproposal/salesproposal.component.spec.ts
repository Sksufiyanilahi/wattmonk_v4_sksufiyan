import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalesproposalComponent } from './salesproposal.component';

describe('SalesproposalComponent', () => {
  let component: SalesproposalComponent;
  let fixture: ComponentFixture<SalesproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesproposalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
