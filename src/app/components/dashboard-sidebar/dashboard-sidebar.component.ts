import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent {

  constructor(private router: Router) {}

  is_hovered: boolean = false;

  // Toggle della classe che indica quale voce del menu e' attiva
  onClick(id: string, img_id: string) {
    let menu_items = Array.from(document.getElementsByClassName('menu-item'));
    let element_to_toggle = document.getElementById(id);
    let icons = Array.from(document.getElementsByClassName('is_hovered_img'));


    // Tolgo a tutti gli elementi l'hover
    menu_items.forEach((element) => {
      element.classList.remove("is-hovered");
      icons.forEach((icon) => {
        let stringa : string = icon.getAttribute('src')!;
        if(stringa.includes('green')) {
          let new_stringa = stringa.replace(/green/, 'black');
          icon.setAttribute('src', new_stringa);
        }
      });
    });

    // Aggiungo la classe per l'hover
    element_to_toggle?.classList.add('is-hovered');
    // Modifico l'icona da nera a verde che indica che e' stata cliccata
    let image_to_turn_green = document.getElementById(img_id)!;
    let stringa = image_to_turn_green?.getAttribute('src')!;
    let new_stringa = stringa.replace(/black/, 'green');
    image_to_turn_green.setAttribute('src', new_stringa);
  }

}
