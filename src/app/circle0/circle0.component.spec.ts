import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Circle0Component } from './circle0.component';

describe('Circle0Component', () => {
  let component: Circle0Component;
  let fixture: ComponentFixture<Circle0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Circle0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Circle0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
