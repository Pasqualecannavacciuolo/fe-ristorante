import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  //menu : Menu[] = [];
  menu$ : Observable<Menu[]>;

  constructor(
    private menuService: MenuService,
    private router: Router
  )
  {
    this.menu$ = this.menuService.getAllMenu();
  }

  ngOnInit(): void {
    /*this.menuService.getAllMenu().subscribe(data => {
      this.menuService.menu = data;
      this.menu = data;
    });*/
  }

}
