import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGemsComponent } from './current-gems.component';

describe('CurrentGemsComponent', () => {
  let component: CurrentGemsComponent;
  let fixture: ComponentFixture<CurrentGemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentGemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentGemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
