import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http : HttpClient) { }

  authenticate(email: string, password: string): Observable<any> {
    const url = environment.apiUrl+"auth/authenticate";
    return this.http.post(url, {
      email: email,
      password: password
    },
    {
      responseType: 'text',
      observe: 'response'
    },
    );
  }
}
