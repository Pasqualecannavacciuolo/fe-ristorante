import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(
      private http : HttpClient,
      private router : Router
  ) { }

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

  logout() {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem('accessToken');
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? sessionStorage.getItem('accessToken') : null;
  }
}
