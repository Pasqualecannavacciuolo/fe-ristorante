import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/enums/Role';
import { UtentiService } from 'src/app/services/utenti.service';
import jwt_decode from 'jwt-decode';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-create-utente',
  templateUrl: './create-utente.component.html',
  styleUrls: ['./create-utente.component.css']
})
export class CreateUtenteComponent implements OnInit {

  constructor(
    private accessService: AccessService,
    private utentiService: UtentiService,
    private formBuilder: FormBuilder
  ) { }

  adminRole = Role[Role.ADMIN];
  managerRole = Role[Role.MANAGER];
  userRole = Role[Role.USER];

  userObj : any = {};

  createUserForm! : FormGroup;

  ngOnInit(): void {

    // Creo il FORM
    this.createUserForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      //modificato_da: ['', Validators.required],
      //creato_da: ['', Validators.required],
      ruolo: ['', Validators.required]
    });
  }

  /** METODI GETTER */
  get nome() {
    return this.createUserForm.get('nome');
  }
  get cognome() {
    return this.createUserForm.get('cognome');
  }
  get email() {
    return this.createUserForm.get('email');
  }
  get password() {
    return this.createUserForm.get('password');
  }
  /*get modificato_da() {
    return this.createUserForm.get('modificato_da');
  }
  get creato_da() {
    return this.createUserForm.get('creato_da');
  }*/
  get ruolo() {
    return this.createUserForm.get('ruolo');
  }

  /**
   * Metodo helper per decodificare il token di accesso
   * @param token -> In ingresso prende il token di accesso
   * @returns -> Restituisce le informazioni salvate nel token
   */
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  /**
   * Metodo che viene chiamato all'invio del FORM
   */
  onSubmit(): void {
    // Ottengo il token
    const token = this.accessService.getToken();
    // Decodifico il token
    const tokenInfo = this.getDecodedAccessToken(token!);
    // Ottengo le informazioni (ci serve l'ID) di chi ha creato l'utente
    this.utentiService.getUtenteByEmail(tokenInfo['sub']).subscribe( (res) => {
      // Ottengo l'ID dell'owner
      const getOwner = res.id!
      // Ottengo i dati dal form
      const passedData = {
        nome: this.nome?.value,
        cognome: this.cognome?.value,
        email: this.email?.value,
        password: this.password?.value,
        modificato_da: getOwner,
        creato_da: getOwner,
        ruolo: this.ruolo?.value
      };

      // Creo l'oggetto utente con i valori
      this.userObj.nome = passedData.nome;
      this.userObj.cognome = passedData.cognome;
      this.userObj.email = passedData.email;
      this.userObj.password = passedData.password;

      this.userObj.modificato_da = passedData.modificato_da;
      this.userObj.creato_da = passedData.creato_da;
      if(passedData.ruolo == 1) {
        this.userObj.role = Role[Role.ADMIN];
      } else if(passedData.ruolo == 2) {
        this.userObj.role = Role[Role.MANAGER];
      } else {
        this.userObj.role = Role[Role.USER];
      }

      // Rimuovo la proprieta'  "authorities" dall'oggetto "userObj"
      delete this.userObj['authorities'];

      this.utentiService.createUtente(this.userObj).subscribe(res => {
        // Operazioni da effettuare dopo l'invio del form
        console.log(res)
      });
    });


  }

}
