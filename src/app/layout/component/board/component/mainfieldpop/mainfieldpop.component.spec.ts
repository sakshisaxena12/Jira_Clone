import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainfieldpopComponent } from './mainfieldpop.component';

describe('MainfieldpopComponent', () => {
  let component: MainfieldpopComponent;
  let fixture: ComponentFixture<MainfieldpopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainfieldpopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainfieldpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
