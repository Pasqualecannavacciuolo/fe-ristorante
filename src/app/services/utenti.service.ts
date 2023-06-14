import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utenti } from '../models/Utenti';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  utenti?: Utenti;

  constructor(private http : HttpClient) { }

  getAllUtenti(): Observable<Utenti[]> {
    const url = "http://localhost:8081/ristorante/management/utenti";
    return this.http.get<Utenti[]>(url);
  }
}
