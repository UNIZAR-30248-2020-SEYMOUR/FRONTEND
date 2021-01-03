import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpErrorResponse} from '@angular/common/http';
import {Category, Course, UsersProfile} from '../../interfaces';
import {CourseService} from '../../services/course.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';
import {manageGenericError} from '../error/error.component';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})

/**
 * This class manages the search-page page.
 * It needs a searchText param which contains the string to search.
 */
export class SearchPageComponent implements OnInit {


  profiles: UsersProfile[];
  courses: Course[];
  searchText: string;
  searchForm: FormGroup;
  categories: Category[];
  isCourse: boolean;

  constructor(private accountService: AccountService, private router: Router, private categoriesService: CategoriesService,
              private courseService: CourseService, private cookie: CookieService, private route: ActivatedRoute) {
    this.profiles = [];
    this.courses = [];
    this.loadCategories();
    this.isCourse = false;


  }

  ngOnInit() {
    const sub = this.route.params.subscribe(params => {
      this.searchForm = new FormGroup({
        'textToSearch': new FormControl('', [Validators.required]),
        'comboType': new FormControl(''),
        'courseCategory': new FormControl('')
      });

      this.searchForm.get('comboType').setValue('profile');
      this.searchText = params.text;
      this.loadProfiles(this.searchText);

      console.log(params.text);
    });
  }

  /**
   * Search the profiles which contains the search string.
   * @param search String to search.
   * @private
   */
  private loadProfiles(search: string) {
    const observer = this.accountService.getProfiles(search);
    observer.subscribe(
      data => { this.profiles = data; },
      (error: HttpErrorResponse) => {
        manageGenericError(error, this.router);
      }
    );
  }

  /**
   * Gets all the courses which coincides with the text and category parameters.
   * @param search Course name to search.
   * @param category to filter.
   */
  private loadCourses(search: string, category: string) {
    const observer = this.courseService.getCourses(search, category);
    observer.subscribe(
      data => {
        this.courses = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);
        manageGenericError(error, this.router);
      }
    );
  }

  /**
   * This method get the categories information from the backend server.
   * @private
   */
  private loadCategories() {
    const observer = this.categoriesService.getCategories();
    observer.subscribe(
      data => { this.categories = data; },
      (error: HttpErrorResponse) => {
        console.log(error.status);
        manageGenericError(error, this.router);
      }
    );
  }

  /**
   * This method handles the errors from the backend requests
   * @param error: error message received from the backend
   * @private
   */
  private dealNotUser(error: JSON) {
    if (error['error'] === 'User does not exist') {
    }
  }

  /**
   * Do the search of the course or the profile.
   * @private
   */
  private search() {
    const comboType = (<HTMLSelectElement>document.getElementById('combo-type'));
    const type = comboType.options[comboType.selectedIndex].value;
    if (type === 'profile') {
      this.loadProfiles(this.searchForm.get('textToSearch').value);
      this.courses = [];
    } else if (type === 'course') {
      const comboCategories = (<HTMLSelectElement>document.getElementById('combo-categories'));
      const category = comboCategories.options[comboCategories.selectedIndex].value;

      this.loadCourses(this.searchForm.get('textToSearch').value, category);
      this.profiles = [];
    }
  }


  typeChanged() {
    const comboType = (<HTMLSelectElement>document.getElementById('combo-type'));
    const type = comboType.options[comboType.selectedIndex].value;
    this.isCourse = type === 'course';
  }
}
