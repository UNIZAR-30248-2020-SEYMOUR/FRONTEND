import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { RatingComponent } from './rating/rating.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        FormsModule
    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    RatingComponent
  ],
    exports: [
        FooterComponent,
        NavbarComponent,
        RatingComponent
    ]
})
export class ComponentsModule { }
