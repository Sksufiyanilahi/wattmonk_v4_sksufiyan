import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailModelPage } from './email-model.page';

describe('EmailModelPage', () => {
  let component: EmailModelPage;
  let fixture: ComponentFixture<EmailModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
