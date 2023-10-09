import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { Piatti } from 'src/app/models/Piatti';
import { MenuService } from 'src/app/services/menu.service';
import { PiattiService } from 'src/app/services/piatti.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  id : any = 0;
  menuId! : number;
  updateMenuForm! : FormGroup;
  selectedOption: any;
  piattiControl = new FormControl();

  totalOfPiatti : Piatti[] = [];
  alreadyPresentPiatti : Piatti[] = [];
  piatti_selezionati: never[] = [];

  constructor(
    private menuService: MenuService,
    private piattiService : PiattiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    // Creo il FORM
    this.updateMenuForm = this.formBuilder.group({
      nome_menu: ['', Validators.required],
      attivo: ['', Validators.required],
      seleziona_piatti: []
    });

    // Ottengo l'ID contenuto nell'URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.menuId = parseInt(this.id);

    // Ottengo il piatto in base all'ID contenuto nell'URL
    this.menuService.getMenu(this.menuId).subscribe(data => {
      // Inizializzo il form con i valori presi dal database
      this.updateMenuForm.patchValue({ nome_menu: data.nome });
      this.updateMenuForm.patchValue({ attivo: data.attivo });
    });

    // FORKJOIN mi consente di effettuare in parallelo piu' chiamate al DB
    forkJoin([this.piattiService.getAllPiatti(), this.piattiService.getPiattiByMenuID(this.menuId)]).subscribe(([piattiTotali, piattiGiaPresenti]) => {
      // Confronto i piatti totali ed i piatti presenti nel menu
      piattiTotali.forEach(piattoInTotal => {
        piattiGiaPresenti.forEach(piattoAlreadySelected => {
          // Se trovo un riscontro flaggo a true nei piatti totali i piatti gia presenti in questo menu
          if(piattoInTotal.id == piattoAlreadySelected.id) {
            piattoInTotal.checked = true;
          } else if(piattoInTotal.checked == null){
            piattoInTotal.checked = false;
          }
        });
      });

      // Ottengo tutti i piatti
      this.totalOfPiatti = piattiTotali;
      // Ottengo i piatti presenti nel menu
      this.alreadyPresentPiatti = piattiGiaPresenti;

      // Per ogni piatto presente nel menu creo una checkbox con il suo valore flaggto
      for (let i = 0; i < this.totalOfPiatti.length; i++) {
        let fg = new FormGroup({});
        fg.addControl(this.totalOfPiatti[i].nome, new FormControl(this.totalOfPiatti[i].checked));
        this.updateMenuForm.addControl(this.totalOfPiatti[i].nome.toString(), new FormControl(this.totalOfPiatti[i].checked))
      }
    });

  }


  /** METODI GETTER */
  get nome_menu() {
    return this.updateMenuForm.get('nome_menu');
  }
  get attivo() {
    return this.updateMenuForm.get('attivo');
  }
  get seleziona_piatti() {
    return this.updateMenuForm.get('seleziona_piatti');
  }


  /**
   * Metodo che viene chiamato all'invio del FORM
   */
  onSubmit(): void {

    const passedData = {
      nome_menu: this.nome_menu?.value,
      attivo: this.attivo?.value,
      seleziona_piatti: this.alreadyPresentPiatti
    };

    this.menuService.updateMenu(passedData.nome_menu, passedData.attivo, this.menuId).subscribe(res => {
      // Operazioni da effettuare dopo l'invio del form
    });
  }


  /**
   * Funzione che permette di eliminare un piatto dalla lista dei piatti da aggiungere ad uno specifico menu
   * @param event --> prende in input l'evento di click sulla checkbox
   * @param piatto --> prende in input il piatto da eliminare dalla lista
   */
  removeFromMenu(piatto : Piatti) {
    // Converto la stringa JSON in Object utilizzabile
    let jsonPiattoString = JSON.stringify(piatto);
    let objPiatto : Piatti = JSON.parse(jsonPiattoString);
    // Rimuovo il piatto dalla lista dei piatti da aggiungere al menu
    this.alreadyPresentPiatti = this.alreadyPresentPiatti.filter(piatto => piatto.id != objPiatto.id);
    // Aggiorno il Frontend
    this.changeDetection.detectChanges();


  }


  /**
   * Funzione che permette di aggiungere un piatto dalla lista dei piatti da aggiungere ad uno specifico menu
   * @param event --> prende in input l'evento di click sulla checkbox
   * @param piatto --> prende in input il piatto da eliminare dalla lista
   */
  addToMenu(event: any, piatto : Piatti) {
    // Se ho cliccato sulla checkbox ed ora e' selezionata allora aggiungo il piatto
    if(event.target.checked == true) {
      this.alreadyPresentPiatti.push(piatto);
      // Aggiorno il Frontend
      this.changeDetection.detectChanges();
      console.log(this.alreadyPresentPiatti)
    // Se la checkbox risulta deselezionata rimuovo il piatto dalla lista
    } else if(event.target.checked == false) {
      this.removeFromMenu(piatto);
    }
  }

}
