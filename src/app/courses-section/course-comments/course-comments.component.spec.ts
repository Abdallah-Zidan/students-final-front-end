import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCommentsComponent } from './course-comments.component';

describe('CourseCommentsComponent', () => {
  let component: CourseCommentsComponent;
  let fixture: ComponentFixture<CourseCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
