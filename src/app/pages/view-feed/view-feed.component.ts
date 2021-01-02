import { Component, OnInit } from '@angular/core';
import {SelfProfile, VideoFeed} from '../../interfaces';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {manageGenericError} from '../error/error.component';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.scss']
})
export class ViewFeedComponent implements OnInit {
  NUM_GET_FEED = 10;

  user: SelfProfile;
  moreFeed: boolean;
  feed: Array<VideoFeed>;

  constructor(private accountService: AccountService, private router: Router,
              private route: Router, private cookie: CookieService) {
    this.moreFeed = true;
    this.feed = [];
    this.user = {
      uuid: '',
      username: 'No válido',
      email: 'noValido@ld.com',
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      password: '',
      courses: [],
      rate: 0};

    this.getUserData();
    this.getFeed();
  }

  ngOnInit() {
  }

  /**
   * This method get the information of the user.
   * @private
   */
  private getUserData() {
    const observer = this.accountService.getUserData();
    observer.subscribe(
      data => {
        this.user.username = data.username;
        this.user.description = data.description;
        this.user.email = data.email;
        this.user.rate = data.rate;
        this.cookie.set('username', this.user.username);
      },
      error => {console.log(error.status + 'getUserData');
        manageGenericError(error, this.router);
      }
    );
  }

  /**
   * This method get videos of the feed that is showing
   */
   getFeed() {
    const observer = this.accountService.getFeed(this.cookie.get('uuid'),
      this.feed.length,
      (this.feed.length + this.NUM_GET_FEED));
    observer.subscribe(
      data => {
        this.showFeed(data);
      },
      error => {
        console.log(error.status);
        manageGenericError(error, this.router);
      });
  }

  /**
   * Add new videos to show in the GUI
   * @param videos: list of videos to add
   * @private
   */
  private showFeed(videos: Array<VideoFeed>) {
    this.moreFeed = videos.length >= this.NUM_GET_FEED;
    videos.forEach(video => this.feed.push(video));
  }
}
