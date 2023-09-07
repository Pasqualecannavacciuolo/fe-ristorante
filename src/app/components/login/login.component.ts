import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accessService: AccessService,
    private router: Router
    )
    {
      this.createForm();
    }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    let login_information = {
      email: this.email?.value,
      password: this.password?.value
    };

    this.accessService.authenticate(login_information.email, login_information.password)
    .subscribe((response) => {
      if(response.status == 200) {
        // Converto il body della risposta in formato JSON
        let risposta = this.bodyToJSON(response);
        // Salvo il token nel sessionStorage
        sessionStorage.setItem('accessToken', risposta.token);
        // Redirect alla homepage della Dashboard
        this.router.navigate(['home']);
      }
    });
  }

  onTouch() {
    this.onSubmit();
  }


  /**
   * Funzione helper che converte il body da stringa a JSON permettendo
   * l'estrazione dei parametri al suo interno
   * @param res Response come parametro di input
   * @returns Il body della response in formato JSON
   */
  private bodyToJSON(res: any) {
    let body;
    try {
      body = JSON.parse(res.body);
    } catch (err: any) {
      console.error(err.message);
    }
    return body || {};
  }

}
