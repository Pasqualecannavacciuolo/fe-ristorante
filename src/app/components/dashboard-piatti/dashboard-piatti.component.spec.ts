import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPiattiComponent } from './dashboard-piatti.component';

describe('DashboardPiattiComponent', () => {
  let component: DashboardPiattiComponent;
  let fixture: ComponentFixture<DashboardPiattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPiattiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPiattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
