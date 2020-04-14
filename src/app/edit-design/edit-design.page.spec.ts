import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDesignPage } from './edit-design.page';

describe('EditDesignPage', () => {
  let component: EditDesignPage;
  let fixture: ComponentFixture<EditDesignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDesignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDesignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
