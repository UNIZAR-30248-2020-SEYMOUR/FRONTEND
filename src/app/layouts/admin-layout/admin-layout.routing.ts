import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import {SearchPageComponent} from '../../pages/search-page/search-page.component';
import {ViewCourseComponent} from '../../pages/view-course/view-course.component';
import {ViewCourseNoOwnerComponent} from '../../pages/view-course-no-owner/view-course-no-owner.component';
import {UserProfileNoOwnerComponent} from '../../pages/user-profile-no-owner/user-profile-no-owner.component';
import {ViewVideoComponent} from '../../pages/view-video/view-video.component';
import {ViewFeedComponent} from '../../pages/view-feed/view-feed.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'feed',   component: ViewFeedComponent },
    { path: 'search-page/:text', component: SearchPageComponent },
    { path: 'search-page/:text', component: SearchPageComponent },
    { path: 'user-profile-no-owner/:username', component: UserProfileNoOwnerComponent},
    { path: 'view-course/:courseId', component: ViewCourseComponent },
    { path: 'view-course-no-owner/:courseId', component: ViewCourseNoOwnerComponent },
    { path: 'view-video/:courseId/:videoId', component: ViewVideoComponent }
];
