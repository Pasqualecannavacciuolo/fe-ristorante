import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardUtentiComponent } from './components/dashboard-utenti/dashboard-utenti.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardHomeComponent,
    LoginComponent,
    DashboardSidebarComponent,
    DashboardUtentiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
