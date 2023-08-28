import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utenti } from 'src/app/models/Utenti';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-actiontable',
  templateUrl: './actiontable.component.html',
  styleUrls: ['./actiontable.component.css']
})
export class ActiontableComponent implements OnInit {

  @Input() utenti : Utenti[] = [];

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private utentiService : UtentiService
    ) {}

  ngOnInit(): void {
  }

  redirectToUpdateUtente(user: Utenti) : void {
    this.router.navigate(['/home/',{ outlets: { dashboard: ['updateUtente', user.id] } }]);
  }

  deleteUtente(userId : number) : void {
    this.utentiService.deleteUtente(userId).subscribe(res => {
      console.log(JSON.stringify(res))
    });
  }
}
