import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversListComponent } from './receivers-list.component';

describe('ReceiversListComponent', () => {
  let component: ReceiversListComponent;
  let fixture: ComponentFixture<ReceiversListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiversListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiversListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
