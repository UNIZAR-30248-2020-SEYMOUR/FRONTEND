import {Component, NgModule, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthLayoutRoutes} from '../../layouts/auth-layout/auth-layout.routing';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})

export class HelpComponent implements OnInit {


  ngOnInit() {
  }
}
