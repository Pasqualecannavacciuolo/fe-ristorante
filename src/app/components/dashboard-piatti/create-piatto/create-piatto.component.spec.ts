import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePiattoComponent } from './create-piatto.component';

describe('CreatePiattoComponent', () => {
  let component: CreatePiattoComponent;
  let fixture: ComponentFixture<CreatePiattoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePiattoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePiattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
