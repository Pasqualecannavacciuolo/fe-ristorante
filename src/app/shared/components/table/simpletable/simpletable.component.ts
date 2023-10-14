import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Utenti } from 'src/app/models/Utenti';

@Component({
  selector: 'app-simpletable',
  templateUrl: './simpletable.component.html',
  styleUrls: ['./simpletable.component.css']
})
export class SimpletableComponent implements OnInit {

  //@Input() utenti : Utenti[] = [];
  @Input() utenti$: any;
  utenti : Utenti[] = [];

  constructor() {}

  ngOnInit(): void {
    this.utenti$.subscribe((res: any) => this.utenti = res)
  }

}
