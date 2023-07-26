import { Component, Input, OnInit } from '@angular/core';
import { Utenti } from 'src/app/models/Utenti';

@Component({
  selector: 'app-actiontable',
  templateUrl: './actiontable.component.html',
  styleUrls: ['./actiontable.component.css']
})
export class ActiontableComponent implements OnInit {

  @Input() utenti : Utenti[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
