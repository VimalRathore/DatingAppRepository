
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_Services/alertify.service';
import {  ErrorInterceptorProvider } from './_Services/error.interceptor';
import { AuthService } from './_Services/auth.service';
import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { appRoutes} from './routs';


@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, RegisterComponent, ListsComponent, MessagesComponent, MemberListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BsDropdownModule.forRoot(), RouterModule.forRoot(appRoutes)],
  providers: [AuthService, ErrorInterceptorProvider, AlertifyService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
