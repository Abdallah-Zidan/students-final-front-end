import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolReplyComponent } from './tool-reply.component';

describe('ToolReplyComponent', () => {
  let component: ToolReplyComponent;
  let fixture: ComponentFixture<ToolReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
