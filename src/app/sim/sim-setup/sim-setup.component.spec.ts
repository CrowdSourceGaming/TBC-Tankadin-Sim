import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimSetupComponent } from './sim-setup.component';

describe('SimSetupComponent', () => {
  let component: SimSetupComponent;
  let fixture: ComponentFixture<SimSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
