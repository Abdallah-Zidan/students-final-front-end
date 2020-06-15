import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSectionComponent } from './courses-section.component';

describe('CoursesSectionComponent', () => {
  let component: CoursesSectionComponent;
  let fixture: ComponentFixture<CoursesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
