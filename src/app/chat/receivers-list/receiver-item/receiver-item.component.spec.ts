import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverItemComponent } from './receiver-item.component';

describe('ReceiverItemComponent', () => {
  let component: ReceiverItemComponent;
  let fixture: ComponentFixture<ReceiverItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiverItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
