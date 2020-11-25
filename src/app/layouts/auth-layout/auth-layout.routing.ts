import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import {HelpComponent} from '../../pages/help/help.component';
import {RecoverPasswordComponent} from '../../pages/recover-password/recover-password.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'recover-password',       component: RecoverPasswordComponent },
];
