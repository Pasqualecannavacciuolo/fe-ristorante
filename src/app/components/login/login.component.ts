import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/Role';
import { Utenti } from 'src/app/models/Utenti';
import { AccessService } from 'src/app/services/access.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  userObj : Utenti = {
    nome_utente: '',
    salt: '',
    password: '',
    modificato_da: 0,
    modificato_il: '',
    creato_il: '',
    creato_da: 0,
    ultima_modifica_password: '',
    nome: '',
    cognome: '',
    email: '',
    cambio_password: false,
    ultimo_accesso: '',
    role: Role.USER
  };

  constructor(
    private fb: FormBuilder,
    private accessService: AccessService,
    private utentiService: UtentiService,
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

        // Controllo che sia il primo accesso
        // Ottengo il token
        const token = this.accessService.getToken();
        // Decodifico il token
        const tokenInfo = this.accessService.getDecodedAccessToken(token!);
        this.utentiService.getUtenteByEmail(tokenInfo['sub']).subscribe( (res) => {
          this.userObj.id = res.id;
          if(res.cambio_password == false) {
            this.router.navigate(['changePassword']);
            /*this.utentiService.updateCambioPassword(true, this.userObj.id!).subscribe((res)=> {
              // Se non ho cambiato la password al primo accesso faccio redirect a pagina per cambio password

            });*/
          }
          // Se risulta che ho gia' modificato la password al primo accesso
          else {
            // Redirect alla homepage della Dashboard
            this.router.navigate(['home']);
          }
        });


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
