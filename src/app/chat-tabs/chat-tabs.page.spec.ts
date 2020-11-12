import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatTabsPage } from './chat-tabs.page';

describe('ChatTabsPage', () => {
  let component: ChatTabsPage;
  let fixture: ComponentFixture<ChatTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
