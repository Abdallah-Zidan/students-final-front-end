import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTutorialComponent } from './single-tutorial.component';

describe('SingleTutorialComponent', () => {
  let component: SingleTutorialComponent;
  let fixture: ComponentFixture<SingleTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
