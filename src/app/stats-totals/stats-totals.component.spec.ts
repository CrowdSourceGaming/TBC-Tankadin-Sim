import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTotalsComponent } from './stats-totals.component';

describe('StatsTotalsComponent', () => {
  let component: StatsTotalsComponent;
  let fixture: ComponentFixture<StatsTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsTotalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
