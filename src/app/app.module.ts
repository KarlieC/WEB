import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import {UserService} from './services/user.service.client';
import {WebsiteService} from './services/website.service.client';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
// import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
// import { WidgetTextComponent } from './views/widget/widget-edit/widget-text/widget-text.component';
import {HttpClientModule} from '@angular/common/http';
import {WidgetService} from './services/widget.service.client';
import {PageService} from './services/page.service.client';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
// import {SharedService} from './services/shared.service';
import { SortableDirective } from './views/widget/widget-list/sortable.directive';
// import {OrderByPipe} from './views/widget/widget-list/order-by-pipe.pipe';
import {SafePipe} from './views/widget/widget-list/safe-pipe.pipe';
import { QuillEditorModule } from 'ngx-quill-editor';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
import { WidgetTextComponent } from './views/widget/widget-edit/widget-text/widget-text.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageListComponent,
    PageNewComponent,
    PageEditComponent,
    WidgetListComponent,
    WidgetChooserComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    // WidgetHtmlComponent,
    // WidgetTextComponent,
    WidgetEditComponent,
    SortableDirective,
    // OrderByPipe,
    SafePipe,
    WidgetHtmlComponent,
    WidgetTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QuillEditorModule,
    AppRoutingModule
  ],
  providers: [UserService, WebsiteService, WidgetService, PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
