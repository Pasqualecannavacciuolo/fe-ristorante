import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpletableComponent } from './simpletable.component';

describe('SimpletableComponent', () => {
  let component: SimpletableComponent;
  let fixture: ComponentFixture<SimpletableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpletableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpletableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
