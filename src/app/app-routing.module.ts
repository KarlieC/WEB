import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
// import {FlickrImageSearchComponent} from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {AuthGuard} from './services/auth-guard.service';

const APP_ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website', component: WebsiteListComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/new', component: WebsiteNewComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/:wid', component: WebsiteEditComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/:wid/page', component: PageListComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/:wid/page/new', component: PageNewComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/:wid/page/:pid', component: PageEditComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/:wid/page/:pid/widget', component: WidgetListComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/:wid/page/:pid/widget/new', component: WidgetChooserComponent, canActivate: [AuthGuard]},
  {path: 'user/:uid/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent, canActivate: [AuthGuard]},
  // {path: 'user/:uid/website/:wid/page/:pid/widget/:wgid/flickr', component: FlickrImageSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const Routing = RouterModule.forRoot(APP_ROUTES, {useHash: true});

// export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES, {useHash: true});

