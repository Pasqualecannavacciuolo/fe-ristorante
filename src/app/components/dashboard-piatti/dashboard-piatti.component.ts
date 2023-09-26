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

  piatti : Piatti[] = [];

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
