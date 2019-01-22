import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { UserService } from './_Services/user.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from 'ngx-gallery';

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
import { MemberListComponent } from './members/member-list/member-list.component';
import { appRoutes} from './routs';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.gaurd';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

// tslint:disable-next-line:no-unused-expression
export function tokenGetter() {
 return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, RegisterComponent,
    MemberDetailComponent, ListsComponent, PhotoEditorComponent, MessagesComponent, MemberEditComponent, MemberListComponent,
     MemberCardComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, FileUploadModule, HttpClientModule,
    FormsModule, NgxGalleryModule, TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
     JwtModule.forRoot(
       {
         config:
         {
           tokenGetter: tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
       }
     ), BsDropdownModule.forRoot(), RouterModule.forRoot(appRoutes)],
  providers: [AuthService, ErrorInterceptorProvider, AlertifyService, MemberEditResolver,
     AuthGuard, UserService, MemberDetailResolver, MemberListResolver, PreventUnsavedChanges],
  bootstrap: [AppComponent],
})
export class AppModule {}
