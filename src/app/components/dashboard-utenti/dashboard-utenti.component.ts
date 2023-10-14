import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Utenti } from 'src/app/models/Utenti';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-dashboard-utenti',
  templateUrl: './dashboard-utenti.component.html',
  styleUrls: ['./dashboard-utenti.component.css']
})
export class DashboardUtentiComponent implements OnInit, OnDestroy{

  utenti$ : Observable<Utenti[]>;
  utenti : Utenti[] = [];
  utentiSubscription: Subscription = new Subscription;

  constructor(
    private utentiService: UtentiService,
    private router: Router
  )
  {
    this.utenti$ = this.utentiService.getAllUtenti();
  }

  //utenti : Utenti[] = [];

  //presenza : string[] = ['presente', 'assente', 'timbrato in ritardo'];

  ngOnInit(): void {
    /*
    this.utentiService.getAllUtenti().subscribe(data => {

      this.utentiService.utenti = data;
      this.utenti = data;
      this.utenti.forEach(utente => {
        utente.presenza = this.presenza[(Math.floor(Math.random() * this.presenza.length))];
      });


    });
    */
    if(this.utenti$) {
      this.utentiSubscription = this.utenti$.subscribe((res: any) => this.utenti = res);
    }
  }


  ngOnDestroy(): void {
    this.utentiSubscription.unsubscribe();
  }


  /**
   * Funzione che permette di ricaricare l'url corrente dopo aver effettato un'operazione
   */
  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/', { outlets: { dashboard: ['utenti'] } }]);
    });
  }


  /**
   * Funzione che effettua il redirect alla pagina dove effettuare l'update
   * @param obj -> e' l'oggetto da cui estrarre le proprieta' per effettuare i redirect
   */
  redirectToUpdate(obj?: any) : void {
    this.router.navigate(['/home/',{ outlets: { dashboard: ['updateUtente', obj?.id] } }]);
  }


  /**
   * Funzione che permette l'eliminazione
   * @param userId -> ID dell'utente da eliminare
   */
  deleteObj(userId? : number,) : void {
    this.utentiSubscription = this.utentiService.deleteUtente(userId!).subscribe(() => {
      this.reloadCurrentRoute();
    });
  }

}
