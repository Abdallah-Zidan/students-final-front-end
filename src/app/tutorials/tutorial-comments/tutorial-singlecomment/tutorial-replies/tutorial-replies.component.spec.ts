import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialRepliesComponent } from './tutorial-replies.component';

describe('TutorialRepliesComponent', () => {
  let component: TutorialRepliesComponent;
  let fixture: ComponentFixture<TutorialRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
