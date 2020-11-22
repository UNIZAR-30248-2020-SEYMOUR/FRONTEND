import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpErrorResponse} from '@angular/common/http';
import {UsersProfile} from '../../interfaces';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss']
})

/**
 * This class manages the profile-search page.
 * It needs a searchText param which contains the string to search.
 */
export class ProfileSearchComponent implements OnInit {


  profiles: UsersProfile[];
  searchText: string;
  constructor(private accountService: AccountService, private cookie: CookieService, private route: ActivatedRoute) {
    this.profiles = [];

  }

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.searchText = params.text;
      this.loadProfiles(this.searchText);
      console.log(params.text);
    });
  }

  /**
   * Search the profiles wich contains the search string.
   * @param search String to search.
   * @private
   */
  private loadProfiles(search: String) {
    const observer = this.accountService.getProfiles(search);
    observer.subscribe(
      data => { this.profiles = data; },
      (error: HttpErrorResponse) => {console.log(error.status); }
    );
  }

}
