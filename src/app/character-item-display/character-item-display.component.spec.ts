import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterItemDisplayComponent } from './character-item-display.component';

describe('CharacterItemDisplayComponent', () => {
  let component: CharacterItemDisplayComponent;
  let fixture: ComponentFixture<CharacterItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
