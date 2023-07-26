import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utenti } from '../models/Utenti';
import { Observable } from 'rxjs';
import { AccessService } from './access.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  utenti?: Utenti[];

  constructor(
    private http : HttpClient,
    private accessService : AccessService
    ) { }

  getAllUtenti(): Observable<Utenti[]> {
    let token = this.accessService.getToken();
    const headers = { 'Authorization': 'Bearer '+token }
    const url = environment.apiUrl+"management/utenti/";
    return this.http.get<Utenti[]>(url, {headers});
  }
}
