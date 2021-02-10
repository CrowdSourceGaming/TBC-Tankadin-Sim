import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterConfigComponent } from './character-config.component';

describe('CharacterConfigComponent', () => {
  let component: CharacterConfigComponent;
  let fixture: ComponentFixture<CharacterConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
