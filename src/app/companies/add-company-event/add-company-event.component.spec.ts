import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyEventComponent } from './add-company-event.component';

describe('AddCompanyEventComponent', () => {
  let component: AddCompanyEventComponent;
  let fixture: ComponentFixture<AddCompanyEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
