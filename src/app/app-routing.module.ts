import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardUtentiComponent } from './components/dashboard-utenti/dashboard-utenti.component';
import { UpdateUtenteComponent } from './components/dashboard-utenti/update-utente/update-utente.component';

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
        path: 'updateUtente/:id',
        component: UpdateUtenteComponent,
        outlet: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
