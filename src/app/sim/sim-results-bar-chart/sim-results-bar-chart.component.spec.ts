import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimResultsBarChartComponent } from './sim-results-bar-chart.component';

describe('SimResultsBarChartComponent', () => {
  let component: SimResultsBarChartComponent;
  let fixture: ComponentFixture<SimResultsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimResultsBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimResultsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
