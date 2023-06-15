import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from './services/access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private router : Router,
    private accessService : AccessService
  ) { }



  ngOnInit(): void {
    let token : any = this.accessService.getToken();
    if (this.tokenExpired(token)) {
      // token expired
      console.log("Il token e' scaduto");
      this.accessService.logout();
    } else {
      // token valid
      console.log("Il token e' valido");
    }
  }


  title = 'fe-ristorante';


  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
