import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicComponentComponent } from './public-component.component';

describe('PublicComponentComponent', () => {
  let component: PublicComponentComponent;
  let fixture: ComponentFixture<PublicComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
