import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnchantComponent } from './new-enchant.component';

describe('NewEnchantComponent', () => {
  let component: NewEnchantComponent;
  let fixture: ComponentFixture<NewEnchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEnchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
