import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Role } from 'src/app/enums/Role';
import { Utenti } from 'src/app/models/Utenti';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-update-utente',
  templateUrl: './update-utente.component.html',
  styleUrls: ['./update-utente.component.css']
})
export class UpdateUtenteComponent implements OnInit, OnDestroy {

  id : any = 0;
  userId! : number;
  //userObj : any = {};
  userObj$ : Observable<Utenti>;
  userObj : any = {};
  utentiSubscription: Subscription = new Subscription;
  updatedUserObj : any = {};

  /*adminRole = Role[Role.ADMIN];
  managerRole = Role[Role.MANAGER];
  userRole = Role[Role.USER];*/

  updateUserForm! : FormGroup;

  constructor(
    private utentiService: UtentiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  )
  {
    // Ottengo l'ID contenuto nell'URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.userId = parseInt(this.id);

    this.userObj$ = this.utentiService.getUtente(this.userId);
  }


  ngOnInit(): void {

    // Creo il FORM
    this.updateUserForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      //ruolo: ['', Validators.required],
    });

    if(this.userObj$) {
      this.utentiSubscription = this.userObj$.subscribe((res: any) => {
        this.userObj = res;
        this.updateUserForm.patchValue({nome : this.userObj.nome});
        this.updateUserForm.patchValue({cognome : this.userObj.cognome});
        this.updateUserForm.patchValue({email : this.userObj.email});
      });
    }

    // Ottengo l'ID contenuto nell'URL
    /*this.id = this.route.snapshot.paramMap.get('id');
    this.userId = parseInt(this.id);*/

    // Ottengo l'utente in base all'ID contenuto nell'URL
    /*this.utentiService.getUtente(this.userId).subscribe(data => {
      this.userObj = data;
      // Inizializzo il form con i valori presi dal database
      this.updateUserForm.patchValue({nome : this.userObj.nome});
      this.updateUserForm.patchValue({cognome : this.userObj.cognome});
      this.updateUserForm.patchValue({email : this.userObj.email});
    });
    // Inizializzo il form con i valori presi dal database
    this.updateUserForm.patchValue({nome : this.userObj.nome});
    this.updateUserForm.patchValue({cognome : this.userObj.cognome});
    this.updateUserForm.patchValue({email : this.userObj.email});*/
  }


  ngOnDestroy(): void {
    this.utentiSubscription.unsubscribe();
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

    // Rimuovo la proprieta'  "authorities" dall'oggetto "updatedUserObj"
    delete this.updatedUserObj['authorities'];

    this.utentiSubscription = this.utentiService.updateUtente(this.updatedUserObj, this.userId).subscribe(res => {
      // Operazioni da effettuare dopo l'invio del form
      console.log(res)
    });
  }

}
