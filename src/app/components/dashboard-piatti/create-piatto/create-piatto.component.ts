import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PiattiService } from 'src/app/services/piatti.service';

@Component({
  selector: 'app-create-piatto',
  templateUrl: './create-piatto.component.html',
  styleUrls: ['./create-piatto.component.css']
})
export class CreatePiattoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private piattiService : PiattiService
  ) { }

  piattoObj : any = {};
  createPiattoForm! : FormGroup;

  ngOnInit(): void {
    // Creo il FORM
    this.createPiattoForm = this.formBuilder.group({
      nome_piatto: ['', Validators.required],
      costo: ['', Validators.required],
      descrizione: ['', [Validators.required, Validators.email]],
    });
  }

  /** METODI GETTER */
  get nome_piatto() {
    return this.createPiattoForm.get('nome_piatto');
  }
  get costo() {
    return this.createPiattoForm.get('costo');
  }
  get descrizione() {
    return this.createPiattoForm.get('descrizione');
  }

  /**
   * Metodo che viene chiamato all'invio del FORM
   */
  onSubmit(): void {
    // Ottengo i dati dal form
    const passedData = {
      nome_piatto: this.nome_piatto?.value,
      costo: this.costo?.value,
      descrizione: this.descrizione?.value
    };

    // Creo l'oggetto piatto con i valori
    this.piattoObj.nome = passedData.nome_piatto;
    this.piattoObj.costo = passedData.costo;
    this.piattoObj.descrizione = passedData.descrizione;

    this.piattiService.createPiatto(this.piattoObj).subscribe(res => {
      // Operazioni da effettuare dopo l'invio del form
      console.log(res)
    });


  }

}
