import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCommentsComponent } from './tool-comments.component';

describe('ToolCommentsComponent', () => {
  let component: ToolCommentsComponent;
  let fixture: ComponentFixture<ToolCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
