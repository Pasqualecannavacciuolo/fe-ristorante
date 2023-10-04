import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
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

  /*piatti : Piatti[] = [
    {
      "id": 3,
      "nome": "Penne al pomodoro",
      "costo": 11,
      "descrizione": "Descrizione di penne al pomodoro",
      "menu": {
          "id": 1,
          "nome": "Menu estivo 2",
          "attivo": true
      }
  },
  {
      "id": 5,
      "nome": "Fagioli con le cozze",
      "costo": 17,
      "descrizione": "Descrizione di fagioli con le cozze",
      "menu": {
          "id": 1,
          "nome": "Menu estivo 2",
          "attivo": true
      }
  }
  ];*/

  piatti : Piatti[] = [];

  constructor(
    private menuService: MenuService,
    private piattiService : PiattiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  searchedOptions : any = [];

  onSeachDropdownValue($event : any) {
  const value = $event.target.value;
  this.searchedOptions = this.piatti.filter(piatto=> piatto.nome.includes(value));
  }

  ngOnInit(): void {
    // Creo il FORM
    this.updateMenuForm = this.formBuilder.group({
      nome_menu: ['', Validators.required],
      attivo: ['', Validators.required],
      seleziona_piatti: ['']
    });

    // Ottengo l'ID contenuto nell'URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.menuId = parseInt(this.id);

    // Ottengo tutti i piatti
    this.piattiService.getAllPiatti().subscribe(data => {
      this.piatti = data;
      this.selectedOption = this.piatti[0];
      // Ottengo il piatto in base all'ID contenuto nell'URL
      this.menuService.getMenu(this.menuId).subscribe(data => {
        // Inizializzo il form con i valori presi dal database
        this.updateMenuForm.patchValue({nome_menu : data.nome});
        this.updateMenuForm.patchValue({attivo : data.attivo});
        //@ts-ignore
        $('#select_picker').selectpicker('refresh');
        //@ts-ignore
        //$('#select_picker').selectpicker('val', 'Penne al pomodoro');
        //@ts-ignore
        //$('.selectpicker').selectpicker('render');
      });
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
      seleziona_piatti: this.seleziona_piatti?.value
    };

    console.log(passedData)

    /*this.updatedMenuObj = this.menuObj;

    this.updatedMenuObj.nome_menu = passedData.nome_menu;
    this.updatedMenuObj.attivo = passedData.attivo;
    this.updatedMenuObj.seleziona_piatti = passedData.seleziona_piatti;*/

    this.menuService.updateMenu(passedData.nome_menu, passedData.attivo, this.menuId).subscribe(res => {
      // Operazioni da effettuare dopo l'invio del form
      console.log(res)
    });
  }

}
