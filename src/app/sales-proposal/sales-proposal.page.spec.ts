import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalesProposalPage } from './sales-proposal.page';

describe('SalesProposalPage', () => {
  let component: SalesProposalPage;
  let fixture: ComponentFixture<SalesProposalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesProposalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesProposalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
