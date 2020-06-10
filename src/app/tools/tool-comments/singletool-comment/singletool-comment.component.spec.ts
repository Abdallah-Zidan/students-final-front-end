import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletoolCommentComponent } from './singletool-comment.component';

describe('SingletoolCommentComponent', () => {
  let component: SingletoolCommentComponent;
  let fixture: ComponentFixture<SingletoolCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingletoolCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingletoolCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
