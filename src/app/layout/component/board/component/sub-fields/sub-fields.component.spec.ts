import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFieldsComponent } from './sub-fields.component';

describe('SubFieldsComponent', () => {
  let component: SubFieldsComponent;
  let fixture: ComponentFixture<SubFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
