import { Component } from '@angular/core';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-dashboard-utenti',
  templateUrl: './dashboard-utenti.component.html',
  styleUrls: ['./dashboard-utenti.component.css']
})
export class DashboardUtentiComponent {


  constructor(
    private utentiService: UtentiService
  ) { }

  onSubmit() {
    const button = document.getElementById('button');
    button!.classList.remove('visible');
    button!.classList.add('invisible');
    const loader = document.getElementById('loader');
    loader!.classList.remove('invisible');
    loader!.classList.add('visible');
    this.utentiService.getAllUtenti().subscribe(data => {
      setTimeout(() => {
        this.utentiService.utenti = data;
        console.log(this.utentiService.utenti);
        loader!.classList.remove('visible');
        loader!.classList.add('invisible');
      }, 2000);
    })
  }

}
