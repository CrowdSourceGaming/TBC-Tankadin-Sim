import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGearComponent } from './new-gear.component';

describe('NewGearComponent', () => {
  let component: NewGearComponent;
  let fixture: ComponentFixture<NewGearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
