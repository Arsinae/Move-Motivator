import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalBarComponent } from './goal-bar.component';

describe('GoalBarComponent', () => {
  let component: GoalBarComponent;
  let fixture: ComponentFixture<GoalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
