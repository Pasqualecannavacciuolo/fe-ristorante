import { Component, Input, OnInit } from '@angular/core';
import { Utenti } from 'src/app/models/Utenti';

@Component({
  selector: 'app-simpletable',
  templateUrl: './simpletable.component.html',
  styleUrls: ['./simpletable.component.css']
})
export class SimpletableComponent implements OnInit {

  @Input() utenti : Utenti[] = [];

  constructor() { }

  ngOnInit(): void { }

}
