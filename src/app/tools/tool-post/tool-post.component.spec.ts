import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPostComponent } from './tool-post.component';

describe('ToolPostComponent', () => {
  let component: ToolPostComponent;
  let fixture: ComponentFixture<ToolPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
