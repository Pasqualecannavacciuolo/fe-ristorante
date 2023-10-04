// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardUtentiComponent } from './components/dashboard-utenti/dashboard-utenti.component';
import { UpdateUtenteComponent } from './components/dashboard-utenti/update-utente/update-utente.component';
import { SharedModule } from './shared/shared.module';

// CHARTS
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardPiattiComponent } from './components/dashboard-piatti/dashboard-piatti.component';
import { CreateUtenteComponent } from './components/dashboard-utenti/create-utente/create-utente.component';
import { CreatePiattoComponent } from './components/dashboard-piatti/create-piatto/create-piatto.component';
import { UpdatePiattoComponent } from './components/dashboard-piatti/update-piatto/update-piatto.component';
import { ChangePasswordComponent } from './components/login/change-password/change-password.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { CreateMenuComponent } from './components/dashboard-menu/create-menu/create-menu.component';
import { UpdateMenuComponent } from './components/dashboard-menu/update-menu/update-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardHomeComponent,
    LoginComponent,
    DashboardSidebarComponent,
    DashboardUtentiComponent,
    UpdateUtenteComponent,
    DashboardPiattiComponent,
    CreateUtenteComponent,
    CreatePiattoComponent,
    UpdatePiattoComponent,
    ChangePasswordComponent,
    DashboardMenuComponent,
    CreateMenuComponent,
    UpdateMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    SharedModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
