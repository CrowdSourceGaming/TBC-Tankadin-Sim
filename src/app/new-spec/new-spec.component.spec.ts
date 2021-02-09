import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpecComponent } from './new-spec.component';

describe('NewSpecComponent', () => {
  let component: NewSpecComponent;
  let fixture: ComponentFixture<NewSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
