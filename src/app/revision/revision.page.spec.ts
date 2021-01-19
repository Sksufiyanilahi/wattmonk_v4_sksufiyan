import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RevisionPage } from './revision.page';

describe('RevisionPage', () => {
  let component: RevisionPage;
  let fixture: ComponentFixture<RevisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RevisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
