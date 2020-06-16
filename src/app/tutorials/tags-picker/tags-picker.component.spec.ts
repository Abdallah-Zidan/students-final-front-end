import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPickerComponent } from './tags-picker.component';

describe('TagsPickerComponent', () => {
  let component: TagsPickerComponent;
  let fixture: ComponentFixture<TagsPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
