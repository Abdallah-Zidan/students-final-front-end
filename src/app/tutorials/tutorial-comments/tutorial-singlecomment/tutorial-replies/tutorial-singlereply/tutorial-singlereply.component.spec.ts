import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSinglereplyComponent } from './tutorial-singlereply.component';

describe('TutorialSinglereplyComponent', () => {
  let component: TutorialSinglereplyComponent;
  let fixture: ComponentFixture<TutorialSinglereplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialSinglereplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialSinglereplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
