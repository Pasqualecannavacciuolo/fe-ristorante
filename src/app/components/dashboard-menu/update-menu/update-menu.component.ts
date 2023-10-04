import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  menuObj : any = {};
  updatedMenuObj : any = {};

  updateMenuForm! : FormGroup;

  constructor(
    private menuService: MenuService,
    private piattiService : PiattiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Creo il FORM
    this.updateMenuForm = this.formBuilder.group({
      nome_menu: ['', Validators.required],
      attivo: ['', Validators.required],
      seleziona_piatti: ['',]
    });

    // Ottengo l'ID contenuto nell'URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.menuId = parseInt(this.id);

    // Ottengo il piatto in base all'ID contenuto nell'URL
    this.menuService.getMenu(this.menuId).subscribe(data => {
      this.menuObj = data;
      // Inizializzo il form con i valori presi dal database
      this.updateMenuForm.patchValue({nome_menu : this.menuObj.nome});
      this.updateMenuForm.patchValue({attivo : this.menuObj.attivo});
      this.updateMenuForm.patchValue({seleziona_piatti : this.menuObj.seleziona_piatti});

      console.log(this.menuObj)
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

    this.updatedMenuObj = this.menuObj;

    this.updatedMenuObj.nome_menu = passedData.nome_menu;
    this.updatedMenuObj.attivo = passedData.attivo;
    this.updatedMenuObj.seleziona_piatti = passedData.seleziona_piatti;

    this.menuService.updateMenu(this.updatedMenuObj.nome_menu, this.updatedMenuObj.attivo, this.menuId).subscribe(res => {
      // Operazioni da effettuare dopo l'invio del form
      console.log(res)
    });
  }

}
