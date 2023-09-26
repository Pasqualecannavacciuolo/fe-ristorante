import { Injectable } from '@angular/core';
import { Piatti } from '../models/Piatti';
import { HttpClient } from '@angular/common/http';
import { AccessService } from './access.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PiattiService {

  piatti?: Piatti[];

  constructor(
    private http : HttpClient,
    private accessService : AccessService
    ) { }

    getAllPiatti(): Observable<Piatti[]> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token }
      const url = environment.apiUrl+"management/piatti/";
      return this.http.get<Piatti[]>(url, {headers});
    }

    getPiatto(id: number): Observable<Piatti> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token }
      const url = environment.apiUrl+"management/piatti/"+id;
      return this.http.get<Piatti>(url, {headers});
    }

    createPiatto(piattoObj: any): Observable<Piatti> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token };
      const url = environment.apiUrl+"management/piatti/";
      return this.http.post<Piatti>(url, piattoObj, {headers});
    }

    updatePiatto(piattoObj : Piatti, id: number): Observable<Piatti> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token };
      const url = environment.apiUrl+"management/piatti/"+id;
      return this.http.put<Piatti>(url, piattoObj, {headers});
    }

    deletePiatto(id: number): Observable<Piatti> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token };
      const url = environment.apiUrl+"management/piatti/"+id;
      return this.http.delete<Piatti>(url, {headers});
    }
}
