import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearAlterationComponent } from './gear-alteration.component';

describe('GearAlterationComponent', () => {
  let component: GearAlterationComponent;
  let fixture: ComponentFixture<GearAlterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GearAlterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GearAlterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
