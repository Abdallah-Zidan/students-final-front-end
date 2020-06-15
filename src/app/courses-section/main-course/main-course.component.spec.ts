import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCourseComponent } from './main-course.component';

describe('MainCourseComponent', () => {
  let component: MainCourseComponent;
  let fixture: ComponentFixture<MainCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
