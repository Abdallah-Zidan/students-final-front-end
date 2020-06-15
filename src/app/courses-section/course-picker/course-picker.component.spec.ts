import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePickerComponent } from './course-picker.component';

describe('CoursePickerComponent', () => {
  let component: CoursePickerComponent;
  let fixture: ComponentFixture<CoursePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
