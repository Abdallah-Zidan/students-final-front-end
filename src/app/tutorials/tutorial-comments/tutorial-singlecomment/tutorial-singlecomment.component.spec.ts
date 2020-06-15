import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSinglecommentComponent } from './tutorial-singlecomment.component';

describe('TutorialSinglecommentComponent', () => {
  let component: TutorialSinglecommentComponent;
  let fixture: ComponentFixture<TutorialSinglecommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialSinglecommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialSinglecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
