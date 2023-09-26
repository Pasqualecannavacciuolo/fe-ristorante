import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PiattiService } from 'src/app/services/piatti.service';

@Component({
  selector: 'app-update-piatto',
  templateUrl: './update-piatto.component.html',
  styleUrls: ['./update-piatto.component.css']
})
export class UpdatePiattoComponent implements OnInit {

  id : any = 0;
  piattoId! : number;
  piattoObj : any = {};
  updatedPiattoObj : any = {};

  updatePiattoForm! : FormGroup;

  constructor(
    private piattiService: PiattiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Creo il FORM
    this.updatePiattoForm = this.formBuilder.group({
      nome_piatto: ['', Validators.required],
      costo: ['', Validators.required],
      descrizione: ['', [Validators.required]]
    });

    // Ottengo l'ID contenuto nell'URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.piattoId = parseInt(this.id);

    // Ottengo il piatto in base all'ID contenuto nell'URL
    this.piattiService.getPiatto(this.piattoId).subscribe(data => {
      this.piattoObj = data;
      // Inizializzo il form con i valori presi dal database
      this.updatePiattoForm.patchValue({nome_piatto : this.piattoObj.nome});
      this.updatePiattoForm.patchValue({costo : this.piattoObj.costo});
      this.updatePiattoForm.patchValue({descrizione : this.piattoObj.descrizione});
    });
  }

  /** METODI GETTER */
  get nome() {
    return this.updatePiattoForm.get('nome_piatto');
  }
  get costo() {
    return this.updatePiattoForm.get('costo');
  }
  get descrizione() {
    return this.updatePiattoForm.get('descrizione');
  }

  /**
   * Metodo che viene chiamato all'invio del FORM
   */
  onSubmit(): void {
    const passedData = {
      nome: this.nome?.value,
      costo: this.costo?.value,
      descrizione: this.descrizione?.value
    };

    this.updatedPiattoObj = this.piattoObj;

    this.updatedPiattoObj.nome = passedData.nome;
    this.updatedPiattoObj.costo = passedData.costo;
    this.updatedPiattoObj.descrizione = passedData.descrizione;

    this.piattiService.updatePiatto(this.updatedPiattoObj, this.piattoId).subscribe(res => {
      // Operazioni da effettuare dopo l'invio del form
      console.log(res)
    });
  }

}
