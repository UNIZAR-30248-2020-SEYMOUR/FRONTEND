import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ViewCourseComponent} from '../../pages/view-course/view-course.component';
import {ViewCourseNoOwnerComponent} from '../../pages/view-course-no-owner/view-course-no-owner.component';
import {UserProfileNoOwnerComponent} from '../../pages/user-profile-no-owner/user-profile-no-owner.component';
import {ViewVideoComponent} from '../../pages/view-video/view-video.component';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    UserProfileComponent,
    ViewCourseComponent,
    ViewCourseNoOwnerComponent,
    UserProfileNoOwnerComponent,
    ViewVideoComponent
  ]
})

export class AdminLayoutModule {}
