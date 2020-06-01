import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReplyComponent } from './single-reply.component';

describe('SingleReplyComponent', () => {
  let component: SingleReplyComponent;
  let fixture: ComponentFixture<SingleReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
