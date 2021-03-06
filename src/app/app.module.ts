import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { HelpComponent } from './pages/help/help.component';

import { AccountService } from './services/account.service';
import {CourseService} from './services/course.service';
import {CategoriesService} from './services/categories.service';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import {VideosService} from './services/videos.service';
import { ErrorComponent } from './pages/error/error.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HelpComponent,
    SearchPageComponent,
    ErrorComponent
  ],
  providers: [AccountService, CookieService, CourseService, CategoriesService, VideosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
