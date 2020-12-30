import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {HelpComponent} from './pages/help/help.component';
import {ErrorComponent} from "./pages/error/error.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      },
      { path: 'help',
        component: HelpComponent,
        }
    ]
  },{
    path: 'error/:code/:message',
    component: ErrorComponent
  }, {
    path: '**',
    redirectTo: 'login'
  },


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'ignore',          //
      anchorScrolling: 'enabled',              // Alows us to scroll links ( localhost:4200/#/help/#section-one )
      scrollPositionRestoration: 'enabled'    //
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
