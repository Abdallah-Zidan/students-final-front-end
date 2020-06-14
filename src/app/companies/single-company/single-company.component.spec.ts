import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCompanyComponent } from './single-company.component';

describe('SingleCompanyComponent', () => {
  let component: SingleCompanyComponent;
  let fixture: ComponentFixture<SingleCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
