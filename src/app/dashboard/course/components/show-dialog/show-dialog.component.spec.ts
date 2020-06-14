import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDialogComponent } from './show-dialog.component';

describe('ShowDialogComponent', () => {
  let component: ShowDialogComponent;
  let fixture: ComponentFixture<ShowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
