import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUtenteComponent } from './create-utente.component';

describe('CreateUtenteComponent', () => {
  let component: CreateUtenteComponent;
  let fixture: ComponentFixture<CreateUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
