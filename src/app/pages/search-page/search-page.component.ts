import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpErrorResponse} from '@angular/common/http';
import {Category, Course, UsersProfile} from '../../interfaces';
import {CourseService} from "../../services/course.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../services/categories.service";

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

  constructor(private accountService: AccountService, private categoriesService: CategoriesService,
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
   * Search the profiles wich contains the search string.
   * @param search String to search.
   * @private
   */
  private loadProfiles(search: string) {
    const observer = this.accountService.getProfiles(search);
    observer.subscribe(
      data => { this.profiles = data; },
      (error: HttpErrorResponse) => {console.log(error.status); }
    );
  }

  private loadCourses(search: string, category: string) {
    this.courses = [{"id":2,"coursename":"course2","description":"course2","category":{"name":"Desarrollo personal","imageUrl":"assets/img/categories/desarrolloPersonal.jpg"}},
      {"id":1,"coursename":"course1","description":"course1","category":{"name":"Música","imageUrl":"assets/img/categories/musica.jpg"}}]
    const observer = this.courseService.getCourses(search, category);
    observer.subscribe(
      data => {
        this.courses = data;
      },
      (error: HttpErrorResponse) => {console.log(error.status); }
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
      (error: HttpErrorResponse) => {console.log(error.status); this.dealNotUser(error.error); }
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

  private search() {
    const comboType = (<HTMLSelectElement>document.getElementById('combo-type'));
    const type = comboType.options[comboType.selectedIndex].value;
    if (type === 'profile'){
      this.loadProfiles(this.searchForm.get('textToSearch').value);
      this.courses = [];
    }else if (type === 'course'){
      const comboCategories = (<HTMLSelectElement>document.getElementById('combo-categories'));
      const category = comboCategories.options[comboCategories.selectedIndex].value;

      this.loadCourses(this.searchForm.get('textToSearch').value, category);
      this.profiles = [];
    }
  }

  typeChanged() {
    (<HTMLSelectElement>document.getElementById('combo-type'))
    const comboType = (<HTMLSelectElement>document.getElementById('combo-type'));
    const type = comboType.options[comboType.selectedIndex].value;
    this.isCourse = type === 'course';
  }
}
