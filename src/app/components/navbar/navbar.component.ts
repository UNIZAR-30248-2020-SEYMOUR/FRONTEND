import { Component, OnInit, ElementRef } from '@angular/core';
import { Location} from '@angular/common';
import { Router } from '@angular/router';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;

  public location: Location;
  private searchText: string;
  private username: string;
  private logged: boolean;

  constructor(location: Location, private cookie: CookieService, private element: ElementRef, private router: Router) {
    this.location = location;

  }

  ngOnInit() {
    this.username = this.cookie.get("username");
    this.logged = this.username != '';
  }

  search() {
    this.router.navigate(['search-page', this.searchText]);
  }
  logout(){
    this.username = '';
    this.logged = false;
    this.cookie.deleteAll();
    this.router.navigate(['login']);
  }
}
