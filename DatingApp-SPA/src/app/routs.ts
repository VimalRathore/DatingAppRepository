import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.gaurd';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes, CanDeactivate } from '@angular/router';
import { MessageBundle } from '@angular/compiler';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { ListResolver } from './_resolvers/list.resolver';

export const appRoutes: Routes = [

    {path: '',  component: HomeComponent},
    {path: 'home',  component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members',  component: MemberListComponent, resolve: {users: MemberListResolver}},
            {path: 'members/:id',  component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent,
            resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages',  component: MessagesComponent},
            {path: 'lists',  component: ListsComponent, resolve: {users:ListResolver}},
        ]
    },

    {path: '**',  redirectTo: 'home', pathMatch: 'full'}
];
