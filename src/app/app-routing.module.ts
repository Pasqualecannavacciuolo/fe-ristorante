import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardUtentiComponent } from './components/dashboard-utenti/dashboard-utenti.component';
import { UpdateUtenteComponent } from './components/dashboard-utenti/update-utente/update-utente.component';
import { DashboardPiattiComponent } from './components/dashboard-piatti/dashboard-piatti.component';
import { CreateUtenteComponent } from './components/dashboard-utenti/create-utente/create-utente.component';
import { CreatePiattoComponent } from './components/dashboard-piatti/create-piatto/create-piatto.component';
import { UpdatePiattoComponent } from './components/dashboard-piatti/update-piatto/update-piatto.component';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { CreateMenuComponent } from './components/dashboard-menu/create-menu/create-menu.component';
import { UpdateMenuComponent } from './components/dashboard-menu/update-menu/update-menu.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'home',
    component: DashboardSidebarComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
        outlet: 'dashboard'
      },
      {
        path: 'utenti',
        component: DashboardUtentiComponent,
        outlet: 'dashboard'
      },
      {
        path: 'createUtente',
        component: CreateUtenteComponent,
        outlet: 'dashboard'
      },
      {
        path: 'updateUtente/:id',
        component: UpdateUtenteComponent,
        outlet: 'dashboard'
      },
      {
        path: 'piatti',
        component: DashboardPiattiComponent,
        outlet: 'dashboard'
      },
      {
        path: 'createPiatto',
        component: CreatePiattoComponent,
        outlet: 'dashboard'
      },
      {
        path: 'updatePiatto/:id',
        component: UpdatePiattoComponent,
        outlet: 'dashboard'
      },
      {
        path: 'menu',
        component: DashboardMenuComponent,
        outlet: 'dashboard'
      },
      {
        path: 'createMenu',
        component: CreateMenuComponent,
        outlet: 'dashboard'
      },
      {
        path: 'updateMenu/:id',
        component: UpdateMenuComponent,
        outlet: 'dashboard'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
