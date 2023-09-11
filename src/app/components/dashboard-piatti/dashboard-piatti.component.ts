import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Piatti } from 'src/app/models/Piatti';
import { PiattiService } from 'src/app/services/piatti.service';

@Component({
  selector: 'app-dashboard-piatti',
  templateUrl: './dashboard-piatti.component.html',
  styleUrls: ['./dashboard-piatti.component.css']
})
export class DashboardPiattiComponent implements OnInit {

  piatti : Piatti[] = [
    {
      id: 1,
      nome: 'Pasta al sugo',
      costo: 13,
      descrizione: 'Una pasta al sugo essicata lentamente e trafilata al bronzo condita con un sugo di pomodoro fresco.'
    },
    {
      id: 2,
      nome: 'Pasta al sugo',
      costo: 13,
      descrizione: 'Una pasta al sugo essicata lentamente e trafilata al bronzo condita con un sugo di pomodoro fresco.'
    },
    {
      id: 3,
      nome: 'Pasta al sugo',
      costo: 13,
      descrizione: 'Una pasta al sugo essicata lentamente e trafilata al bronzo condita con un sugo di pomodoro fresco.'
    }
  ];

  constructor(
    private piattiService: PiattiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.piattiService.getAllPiatti().subscribe(data => {
      this.piattiService.piatti = data;
      this.piatti = data;
    });
  }

}
