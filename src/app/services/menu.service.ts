import { Injectable } from '@angular/core';
import { Menu } from '../models/Menu';
import { HttpClient } from '@angular/common/http';
import { AccessService } from './access.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu?: Menu[];

  constructor(
    private http : HttpClient,
    private accessService : AccessService
    ) { }

    getAllMenu(): Observable<Menu[]> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token }
      const url = environment.apiUrl+"management/menu/";
      return this.http.get<Menu[]>(url, {headers});
    }

    getMenu(id: number): Observable<Menu> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token }
      const url = environment.apiUrl+"management/menu/"+id;
      return this.http.get<Menu>(url, {headers});
    }

    createMenu(menuObj: any): Observable<Menu> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token };
      const url = environment.apiUrl+"management/menu/";
      return this.http.post<Menu>(url, menuObj, {headers});
    }

    addPiatti(menuObj: any, id: number): Observable<Menu> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token };
      const url = environment.apiUrl+"management/menu/addPiatti/"+id;
      return this.http.post<Menu>(url, menuObj, {headers});
    }

    updateMenu(newNomeMenu : string, newAttivo : boolean, id: number): Observable<Menu> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token };
      const url = environment.apiUrl+"management/menu/"+id;
      let requestBodyParameters = {newNomeMenu, newAttivo};
      return this.http.put<Menu>(url, requestBodyParameters, {headers});
    }

    deleteMenu(id: number): Observable<Menu> {
      let token = this.accessService.getToken();
      const headers = { 'Authorization': 'Bearer '+token };
      const url = environment.apiUrl+"management/menu/"+id;
      return this.http.delete<Menu>(url, {headers});
    }
}
