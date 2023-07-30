import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utenti } from 'src/app/models/Utenti';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-dashboard-utenti',
  templateUrl: './dashboard-utenti.component.html',
  styleUrls: ['./dashboard-utenti.component.css']
})
export class DashboardUtentiComponent implements OnInit{


  constructor(
    private utentiService: UtentiService,
    private router: Router
  ) { }

  utenti : Utenti[] = [];
  presenza : string[] = ['presente', 'assente', 'timbrato in ritardo'];

  ngOnInit(): void {
    this.utentiService.getAllUtenti().subscribe(data => {

      this.utentiService.utenti = data;
      this.utenti = data;
      this.utenti.forEach(utente => {
        utente.presenza = this.presenza[(Math.floor(Math.random() * this.presenza.length))];
      });
      //console.log(this.utentiService.utenti);

    });
  }

  onSubmit() {

  }

}
