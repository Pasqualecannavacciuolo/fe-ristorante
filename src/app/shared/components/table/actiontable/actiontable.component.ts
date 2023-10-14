import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/Menu';
import { Piatti } from 'src/app/models/Piatti';
import { Utenti } from 'src/app/models/Utenti';
import { MenuService } from 'src/app/services/menu.service';
import { PiattiService } from 'src/app/services/piatti.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-actiontable',
  templateUrl: './actiontable.component.html',
  styleUrls: ['./actiontable.component.css']
})
export class ActiontableComponent implements OnInit, OnDestroy {

  //@Input() utenti : Utenti[] = [];
  @Input() utenti$?: any;
  utenti : Utenti[] = [];
  utentiSubscription: Subscription = new Subscription;
  //@Input() piatti : Piatti[] = [];
  @Input() piatti$?: any;
  piatti : Piatti[] = [];
  piattiSubscription: Subscription = new Subscription;
  //@Input() menu : Menu[] = [];
  @Input() menu$?: any;
  menu : Menu[] = [];
  menuSubscription: Subscription = new Subscription;
  @Input() context = '';

  constructor(
    private router : Router,
    private utentiService : UtentiService,
    private piattiService: PiattiService,
    private menuService: MenuService
    ) {}


  ngOnInit(): void {
    if(this.utenti$) {
      this.utentiSubscription = this.utenti$.subscribe((res: any) => this.utenti = res);
    }
    if(this.piatti$) {
      this.piattiSubscription = this.piatti$.subscribe((res: any) => this.piatti = res);
    }
    if(this.menu$) {
      this.menuSubscription = this.menu$.subscribe((res: any) => this.menu = res);
    }
  }

  ngOnDestroy(): void {
    this.utentiSubscription.unsubscribe();
    this.piattiSubscription.unsubscribe();
    this.menuSubscription.unsubscribe();
  }


  /**
   * Funzione che permette di ricaricare l'url corrente dopo aver effettato un'operazione
   * @param context -> ci serve per capire a quale component fare riferimento
   */
  reloadCurrentRoute(context: string) {
    if(context === 'utenti') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/',{ outlets: { dashboard: ['utenti'] } }]);
      });
    } else if(context === 'piatti') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/',{ outlets: { dashboard: ['piatti'] } }]);
      });
    } else if(context === 'menu') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/',{ outlets: { dashboard: ['menu'] } }]);
      });
    }
  }


  /**
   * Funzione che effettua il redirect alla pagina dove effettuare l'update
   * @param context -> ci serve per capire a quale component fare riferimento
   * @param obj -> e' l'oggetto da cui estrarre le proprieta' per effettuare i redirect
   */
  redirectToUpdate(context: string, obj?: any) : void {
    if(context === 'utenti') {
      this.router.navigate(['/home/',{ outlets: { dashboard: ['updateUtente', obj?.id] } }]);
    } else if(context === 'piatti') {
      this.router.navigate(['/home/',{ outlets: { dashboard: ['updatePiatto', obj?.id] } }]);
    } else if(context === 'menu') {
      this.router.navigate(['/home/',{ outlets: { dashboard: ['updateMenu', obj?.id] } }]);
    }
  }


  /**
   * Funzione che permette l'eliminazione
   * @param context  -> ci serve per capire a quale component fare riferimento
   * @param userId -> ID dell'utente da eliminare
   * @param piattoId  -> ID del piatto da eliminare
   * @param menuId  -> ID del menu da eliminare
   */
  deleteObj(context?: string, userId? : number, piattoId? : number, menuId? : number) : void {
    if(context === 'utenti') {
      this.utentiSubscription = this.utentiService.deleteUtente(userId!).subscribe(() => {
        this.reloadCurrentRoute(context);
      });
    } else if(context === 'piatti') {
      this.piattiSubscription = this.piattiService.deletePiatto(piattoId!).subscribe(() => {
        this.reloadCurrentRoute(context);
      });
    } else if(context === 'menu') {
      this.menuSubscription = this.menuService.deleteMenu(menuId!).subscribe(() => {
        this.reloadCurrentRoute(context);
      });
    }
  }
}
