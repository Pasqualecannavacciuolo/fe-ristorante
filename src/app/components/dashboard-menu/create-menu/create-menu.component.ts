import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/models/Menu';
import { Piatti } from 'src/app/models/Piatti';
import { MenuService } from 'src/app/services/menu.service';
import { PiattiService } from 'src/app/services/piatti.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {

  createMenuForm! : FormGroup;
  piattiControl = new FormControl();

  totalOfPiatti : Piatti[] = [];
  piatti_selezionati: Piatti[] = [];

  constructor(
    private menuService: MenuService,
    private piattiService : PiattiService,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    // Creo il FORM
    this.createMenuForm = this.formBuilder.group({
      nome_menu: ['', Validators.required],
      attivo: [false, Validators.required],
      seleziona_piatti: []
    });

    // Ottengo tutti i piatti
    this.piattiService.getAllPiatti().subscribe(piattiTotali => {
      piattiTotali.forEach(piattoInTotal => {
        if (piattoInTotal.checked == null) {
          piattoInTotal.checked = false;
        }
      });

      // Ottengo tutti i piatti
      this.totalOfPiatti = piattiTotali;

      // Per ogni piatto presente nel menu creo una checkbox con il suo valore flaggto
      for (let i = 0; i < this.totalOfPiatti.length; i++) {
        let fg = new FormGroup({});
        fg.addControl(this.totalOfPiatti[i].nome, new FormControl(this.totalOfPiatti[i].checked));
        this.createMenuForm.addControl(this.totalOfPiatti[i].nome.toString(), new FormControl(this.totalOfPiatti[i].checked))
      }
    });


  }


  /** METODI GETTER */
  get nome_menu() {
    return this.createMenuForm.get('nome_menu');
  }
  get attivo() {
    return this.createMenuForm.get('attivo');
  }
  get seleziona_piatti() {
    return this.createMenuForm.get('seleziona_piatti');
  }


  /**
   * Metodo che viene chiamato all'invio del FORM
   */
  onSubmit(): void {

    const passedData : Menu = {
      nome: this.nome_menu?.value,
      attivo: this.attivo?.value,
      seleziona_piatti: this.piatti_selezionati
    };

    console.log(passedData)

    this.menuService.createMenu(passedData).subscribe(res => {
      // Operazioni da effettuare dopo l'invio del form
      this.menuService.addPiatti(passedData.seleziona_piatti, res.id!).subscribe(res => {
        console.log(res)
      });
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
    this.piatti_selezionati = this.piatti_selezionati.filter(piatto => piatto.id != objPiatto.id);
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
      this.piatti_selezionati.push(piatto);
      // Aggiorno il Frontend
      this.changeDetection.detectChanges();
      console.log(this.piatti_selezionati)
    // Se la checkbox risulta deselezionata rimuovo il piatto dalla lista
    } else if(event.target.checked == false) {
      this.removeFromMenu(piatto);
    }
  }

}
