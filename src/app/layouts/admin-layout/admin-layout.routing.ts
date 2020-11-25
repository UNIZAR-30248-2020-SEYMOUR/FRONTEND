import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {ProfileSearchComponent} from '../../pages/profile-search/profile-search.component';
import {ViewCourseComponent} from '../../pages/view-course/view-course.component';
import {ViewCourseNoOwnerComponent} from '../../pages/view-course-no-owner/view-course-no-owner.component';
import {UserProfileNoOwnerComponent} from '../../pages/user-profile-no-owner/user-profile-no-owner.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'search-profile/:text', component: ProfileSearchComponent },
    { path: 'search-profile/:text', component: ProfileSearchComponent },
    { path: 'user-profile-no-owner/:username', component: UserProfileNoOwnerComponent},
    { path: 'view-course/:courseId', component: ViewCourseComponent },
    { path: 'view-course-no-owner/:courseId', component: ViewCourseNoOwnerComponent }
];
