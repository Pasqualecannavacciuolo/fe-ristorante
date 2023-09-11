import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Piatti } from 'src/app/models/Piatti';
import { Utenti } from 'src/app/models/Utenti';
import { PiattiService } from 'src/app/services/piatti.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-actiontable',
  templateUrl: './actiontable.component.html',
  styleUrls: ['./actiontable.component.css']
})
export class ActiontableComponent implements OnInit {

  @Input() utenti : Utenti[] = [];
  @Input() piatti : Piatti[] = [];
  @Input() context = '';

  constructor(
    private router : Router,
    private utentiService : UtentiService,
    private piattiService: PiattiService
    ) {}

  ngOnInit(): void {
  }

  //Funzione che permette di ricaricare l'url corrente dopo aver effettato un'operazione
  reloadCurrentRoute(context: string) {
    if(context === 'utenti') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/',{ outlets: { dashboard: ['utenti'] } }]);
      });
    } else if(context === 'piatti') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/',{ outlets: { dashboard: ['piatti'] } }]);
      });
    }
  }

  // Funzione che effettua il redirect alla pagina dove effettuare l'update dell'utente
  redirectToUpdate(context: string, obj?: any) : void {
    if(context === 'utenti') {
      this.router.navigate(['/home/',{ outlets: { dashboard: ['updateUtente', obj?.id] } }]);
    } else if(context === 'piatti') {
      this.router.navigate(['/home/',{ outlets: { dashboard: ['updatePiatto', obj?.id] } }]);
    }
  }

  // Funzione che permette l'eliminazione di un utente
  deleteObj(context?: string, userId? : number, piattoId? : number) : void {
    if(context === 'utenti') {
      this.utentiService.deleteUtente(userId!).subscribe(() => {
        this.reloadCurrentRoute(context);
      });
    } else if(context === 'piatti') {
      this.piattiService.deletePiatto(piattoId!).subscribe(() => {
        this.reloadCurrentRoute(context);
      });
    }
  }
}
