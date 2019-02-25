import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { TestService } from './services/test.service.client';
import {AppRoutingModule} from './app-routing.module';
// Components
import {AppComponent} from './app.component';
import {LoginComponent} from './views/user/login/login.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';
import {WebsiteEditComponent} from './views/website/website-edit/website-edit.component';
import {WebsiteNewComponent} from './views/website/website-new/website-new.component';
import {WebsiteListComponent} from './views/website/website-list/website-list.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {WidgetChooserComponent} from './views/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './views/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {WidgetImageComponent} from './views/widget/widget-edit/widget-image/widget-image.component';
import {WidgetYoutubeComponent} from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import {WidgetHeaderComponent} from './views/widget/widget-edit/widget-header/widget-header.component';
import {FormsModule} from '@angular/forms';
import { Routing } from './app-routing.module';
// Client services
import {UserService} from './services/user.service.client';
import {WebsiteService} from './services/website.service.client';
import {PageService} from './services/page.service.client';
import {WidgetService} from './services/widget.service.client';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteEditComponent,
    WebsiteNewComponent,
    WebsiteListComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetHeaderComponent
    // Routing
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // HttpModule,
    // Routing
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
