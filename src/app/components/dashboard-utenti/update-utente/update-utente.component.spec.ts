import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUtenteComponent } from './update-utente.component';

describe('UpdateUtenteComponent', () => {
  let component: UpdateUtenteComponent;
  let fixture: ComponentFixture<UpdateUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
