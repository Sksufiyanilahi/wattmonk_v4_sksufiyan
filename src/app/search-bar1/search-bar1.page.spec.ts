import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchBar1Page } from './search-bar1.page';

describe('SearchBar1Page', () => {
  let component: SearchBar1Page;
  let fixture: ComponentFixture<SearchBar1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBar1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
