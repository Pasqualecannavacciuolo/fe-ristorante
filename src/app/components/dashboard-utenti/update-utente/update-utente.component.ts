import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/enums/Role';
import { Utenti } from 'src/app/models/Utenti';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-update-utente',
  templateUrl: './update-utente.component.html',
  styleUrls: ['./update-utente.component.css']
})
export class UpdateUtenteComponent implements OnInit {

  id : any = 0;
  userId! : number;
  userObj : any = {};
  updatedUserObj : any = {};

  /*adminRole = Role[Role.ADMIN];
  managerRole = Role[Role.MANAGER];
  userRole = Role[Role.USER];*/

  updateUserForm! : FormGroup;

  constructor(
    private utentiService: UtentiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    // Inizializzo i valori del FORM
    this.updateUserForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      //ruolo: ['', Validators.required],
    });

    // Ottengo l'ID contenuto nell'URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.userId = parseInt(this.id);

    // Ottengo l'utente in base all'ID contenuto nell'URL
    this.utentiService.getUtente(this.userId).subscribe(data => {
      this.userObj = data;
    });
  }

  /** METODI GETTER */
  get nome() {
    return this.updateUserForm.get('nome');
  }
  get cognome() {
    return this.updateUserForm.get('cognome');
  }
  get email() {
    return this.updateUserForm.get('email');
  }
  get ruolo() {
    return this.updateUserForm.get('ruolo');
  }

  /**
   * Metodo che viene chiamato all'invio del FORM
   */
  onSubmit(): void {
    const passedData = {
      nome: this.nome?.value,
      cognome: this.cognome?.value,
      email: this.email?.value,
      //ruolo: this.ruolo?.value
    };

    this.updatedUserObj = this.userObj;

    this.updatedUserObj.nome = passedData.nome;
    this.updatedUserObj.cognome = passedData.cognome;
    this.updatedUserObj.email = passedData.email;
    /*if(passedData.ruolo == 1) {
      this.updatedUserObj.role = Role[Role.ADMIN];
    } else if(passedData.ruolo == 2) {
      this.updatedUserObj.role = Role[Role.MANAGER];
    } else {
      this.updatedUserObj.role = Role[Role.USER];
    }*/

    delete this.updatedUserObj['authorities'];
    console.log(this.updatedUserObj)

    this.utentiService.updateUtente(this.updatedUserObj, this.userId).subscribe(res => {
      console.log(res)
    });
  }

}
