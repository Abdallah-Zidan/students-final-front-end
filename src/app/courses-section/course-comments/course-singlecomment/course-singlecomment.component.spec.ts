import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSinglecommentComponent } from './course-singlecomment.component';

describe('CourseSinglecommentComponent', () => {
  let component: CourseSinglecommentComponent;
  let fixture: ComponentFixture<CourseSinglecommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSinglecommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSinglecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
