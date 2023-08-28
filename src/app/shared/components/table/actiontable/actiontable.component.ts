import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utenti } from 'src/app/models/Utenti';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-actiontable',
  templateUrl: './actiontable.component.html',
  styleUrls: ['./actiontable.component.css']
})
export class ActiontableComponent implements OnInit {

  @Input() utenti : Utenti[] = [];

  constructor(
    private router : Router,
    private utentiService : UtentiService
    ) {}

  ngOnInit(): void {
  }

  //Funzione che permette di ricaricare l'url corrente dopo aver effettato un'operazione
  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/',{ outlets: { dashboard: ['utenti'] } }]);
    });
  }

  // Funzione che effettua il redirect alla pagina dove effettuare l'update dell'utente
  redirectToUpdateUtente(user: Utenti) : void {
    this.router.navigate(['/home/',{ outlets: { dashboard: ['updateUtente', user.id] } }]);
  }

  // Funzione che permette l'eliminazione di un utente
  deleteUtente(userId : number) : void {
    this.utentiService.deleteUtente(userId).subscribe(() => {
      this.reloadCurrentRoute();
    });
  }
}
