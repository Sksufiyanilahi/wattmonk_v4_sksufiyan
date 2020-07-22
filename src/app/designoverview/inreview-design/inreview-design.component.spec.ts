import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InreviewDesignComponent } from './inreview-design.component';

describe('InreviewDesignComponent', () => {
  let component: InreviewDesignComponent;
  let fixture: ComponentFixture<InreviewDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InreviewDesignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InreviewDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
