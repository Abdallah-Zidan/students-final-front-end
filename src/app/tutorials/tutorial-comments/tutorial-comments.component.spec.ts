import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCommentsComponent } from './tutorial-comments.component';

describe('TutorialCommentsComponent', () => {
  let component: TutorialCommentsComponent;
  let fixture: ComponentFixture<TutorialCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
