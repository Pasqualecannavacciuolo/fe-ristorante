import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardUtentiComponent } from './components/dashboard-utenti/dashboard-utenti.component';
import { UpdateUtenteComponent } from './components/dashboard-utenti/update-utente/update-utente.component';
import { DashboardPiattiComponent } from './components/dashboard-piatti/dashboard-piatti.component';
import { CreateUtenteComponent } from './components/dashboard-utenti/create-utente/create-utente.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
