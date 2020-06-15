import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachDialogComponent } from './attach-dialog.component';

describe('AttachDialogComponent', () => {
  let component: AttachDialogComponent;
  let fixture: ComponentFixture<AttachDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
