import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthStatComponent } from './month-stat.component';

describe('MonthStatComponent', () => {
  let component: MonthStatComponent;
  let fixture: ComponentFixture<MonthStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
