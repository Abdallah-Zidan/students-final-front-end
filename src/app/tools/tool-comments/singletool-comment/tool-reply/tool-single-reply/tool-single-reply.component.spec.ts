import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSingleReplyComponent } from './tool-single-reply.component';

describe('ToolSingleReplyComponent', () => {
  let component: ToolSingleReplyComponent;
  let fixture: ComponentFixture<ToolSingleReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSingleReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSingleReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
