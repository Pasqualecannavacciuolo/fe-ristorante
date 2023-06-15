import { Component, OnInit } from '@angular/core';
import { Utenti } from 'src/app/models/Utenti';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-dashboard-utenti',
  templateUrl: './dashboard-utenti.component.html',
  styleUrls: ['./dashboard-utenti.component.css']
})
export class DashboardUtentiComponent implements OnInit{


  constructor(
    private utentiService: UtentiService
  ) { }

  utenti : Utenti[] = [];

  ngOnInit(): void {
    this.onSubmit()
  }

  onSubmit() {
    const loader = document.getElementById('loader');
    loader!.classList.remove('invisible');
    loader!.classList.add('visible');
    this.utentiService.getAllUtenti().subscribe(data => {
      setTimeout(() => {
        this.utentiService.utenti = data;
        this.utenti = data;
        console.log(this.utentiService.utenti);
        loader!.classList.remove('visible');
        loader!.classList.add('invisible');
        const table = document.getElementById('table');
        table!.classList.remove('invisible');
        table!.classList.add('visible');
      }, 2000);
    });
  }

}
