import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTagsComponent } from './question-tags.component';

describe('QuestionTagsComponent', () => {
  let component: QuestionTagsComponent;
  let fixture: ComponentFixture<QuestionTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
