import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiontableComponent } from './actiontable.component';

describe('ActiontableComponent', () => {
  let component: ActiontableComponent;
  let fixture: ComponentFixture<ActiontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiontableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
