import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSinglereplyComponent } from './course-singlereply.component';

describe('CourseSinglereplyComponent', () => {
  let component: CourseSinglereplyComponent;
  let fixture: ComponentFixture<CourseSinglereplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSinglereplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSinglereplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
