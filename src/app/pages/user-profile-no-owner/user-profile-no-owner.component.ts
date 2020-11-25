import { Component, OnInit } from '@angular/core';
import {Category, Course, SelfProfile, UsersProfile} from '../../interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {CourseService} from '../../services/course.service';
import {CategoriesService} from '../../services/categories.service';



@Component({
  selector: 'app-user-profile-no-owner',
  templateUrl: './user-profile-no-owner.component.html',
  styleUrls: ['./user-profile-no-owner.component.scss']
})

/**
 * This class contains de logic of the user-profile.
 */
export class UserProfileNoOwnerComponent implements OnInit {
  user: UsersProfile;

  constructor(private accountService: AccountService, private courseService: CourseService, private categoriesService: CategoriesService,
              private pageRoute: ActivatedRoute, private route: Router, private cookie: CookieService) {

    this.user = {
      username: 'No válido',
      email: 'noValido@ld.com',
      rate: 5,
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      courses: []
    };

    this.pageRoute.params.subscribe(params => {
      this.getUserData(params.username);
      this.user.username = params.username;
    });
    this.getUserData(this.user.username);
  }

  ngOnInit() {
  }


  /**
   * This method get the information of the user with his courses.
   * @private
   */
  private getUserData(username: string) {
    const observer = this.accountService.getUserNoOwnerData(username);
    observer.subscribe(
      data => {
        this.user.description = data.description;
        this.user.email = data.email;
        this.user.courses = data.courses;
        this.user.rate = data.rate;
      },
      (error: HttpErrorResponse) => {console.log(error.status);  this.dealNotUser(error.error); }
    );
  }

  /**
   * This method handles the errors from the backend requests
   * @param error: error message received from the backend
   * @private
   */
  private dealNotUser(error: JSON) {
    if (error['error'] === 'User does not exist') {
      this.route.navigate(['/login']);
    }
  }

}
