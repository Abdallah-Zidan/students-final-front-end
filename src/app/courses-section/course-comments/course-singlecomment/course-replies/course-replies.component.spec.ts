import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRepliesComponent } from './course-replies.component';

describe('CourseRepliesComponent', () => {
  let component: CourseRepliesComponent;
  let fixture: ComponentFixture<CourseRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
