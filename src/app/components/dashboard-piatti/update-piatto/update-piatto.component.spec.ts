import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePiattoComponent } from './update-piatto.component';

describe('UpdatePiattoComponent', () => {
  let component: UpdatePiattoComponent;
  let fixture: ComponentFixture<UpdatePiattoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePiattoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePiattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
