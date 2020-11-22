import { Component, OnInit } from '@angular/core';
import {Category, Course, SelfProfile} from '../../interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {CourseService} from '../../services/course.service';
import {CategoriesService} from '../../services/categories.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * This class contains de logic of the user-profile.
 */
export class UserProfileComponent implements OnInit {
  user: SelfProfile;

  courses: Course[];
  disabled: any;
  valuation: number;

  updateForm: FormGroup;
  createCourseForm: FormGroup;
  tryingUser: boolean;
  tryingCourse: boolean;
  validUser: boolean;
  validEmail: boolean;
  deleteError: boolean;
  updateError: boolean;
  popupNewCourseVisible: boolean;
  popupDeleteProfileVisible: boolean;
  categories: Category[];

  constructor(private accountService: AccountService, private courseService: CourseService, private categoriesService: CategoriesService,
              private route: Router, private cookie: CookieService) {
   this.popupNewCourseVisible = false;
   this.popupDeleteProfileVisible = false;
   this.deleteError = false;
   this.updateError = false;
    this.user = {
      uuid: '',
      username: 'No válido',
      email: 'noValido@ld.com',
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      password: ''};
    this.disabled = 'false';
    this.courses = [{ id: 1, coursename: 'uno', description: 'lid', category: {name: 'Tech', imageUrl: '/assets/img/categories/otros.jpg'}},
        {id: 2, coursename: 'dos', description: 'lid2', category: {name: 'Tech', imageUrl: '/assets/img/categories/otros.jpg'}},
        {id: 3, coursename: 'tres', description: 'lid3', category: {name: 'Tech', imageUrl: '/assets/img/categories/otros.jpg'}}],
    this.valuation = 5.4;


    this.initializeForms();
     this.getUserData();
     this.loadCategories();
  }

  /**
   * This method save the user modified data
   */
  saveChanges() {
    this.tryingUser = true;
    if (this.updateForm.valid) {
      const user: SelfProfile = {
        uuid: this.cookie.get('uuid'),
        username: this.updateForm.get('username').value,
        email: this.updateForm.get('email').value,
        password: '',
        description: this.updateForm.get('description').value
      };
      const observer = this.accountService.updateProfile(user);
      observer.subscribe(
        data => this.showUpdate(user),
        error => {console.log(error.error); this.updateError = true; }
      );
    } else {
      this.updateError = true;
      if (!this.updateForm.get('username').valid) {
        this.validUser = false;
        document.getElementById('input-username').classList.add('invalid-input');
      }
      if (!this.updateForm.get('email').valid) {
        this.validEmail = false;
        document.getElementById('input-email').classList.add('invalid-input');
      }
    }
  }

  /**
   * This method show the correct update of the user profile
   * @param user: is the information of the user profile updated
   */
  showUpdate(user: SelfProfile) {
    this.updateError = false;
    this.user = user;
    this.disabled = !this.disabled;
    this.validUser = true;
    this.validEmail = true;
    document.getElementById('input-username').classList.remove('invalid-input');
    document.getElementById('input-email').classList.remove('invalid-input');
  }

  ngOnInit() {
  }

  /**
   * This method active the user edition form.
   */
  openEdit() {
    this.disabled = !this.disabled;
    this.updateForm.controls['username'].enable();
    this.updateForm.controls['email'].enable();
    this.updateForm.controls['description'].enable();
  }

  /**
   * This method cancel the user edition blocking the profile form inptus.
   */
  cancelUpdate() {
    this.tryingUser = false;
    this.validUser = true;
    this.validEmail = true;
    document.getElementById('input-username').classList.remove('invalid-input');
    document.getElementById('input-email').classList.remove('invalid-input');
    this.updateForm.controls['username'].disable();
    this.updateForm.controls['email'].disable();
    this.updateForm.controls['description'].disable();
    this.disabled = !this.disabled;
  }

  /**
   * This method get the information of the user with his courses.
   * @private
   */
  private getUserData() {
    const observer = this.accountService.getUserData();
    observer.subscribe(
      data => {
        this.user.username = data.username;
        this.user.description = data.description;
        this.user.email = data.email;
        this.courses = data.courses;

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

  /**
   * This method close the create course popup.
   */
  closeNewCoursePopUp() {
    this.popupNewCourseVisible = false;
    this.createCourseForm.reset();
    this.tryingCourse = false;
  }

  /**
   * This method open the create course popup.
   */
  openNewCoursePopUp() {
    this.popupNewCourseVisible = true;
  }

  /**
   * This method save the course entered in the form.
   */
  saveCourse() {
    this.tryingCourse = true;
    this.updateFeedback();
    if (this.createCourseForm.valid) {
      const combo = (<HTMLSelectElement>document.getElementById('combo-categories'));
      const strUser = combo.options[combo.selectedIndex].text;

      const course: Course = {
        id: -1,
        coursename: this.createCourseForm.get('courseName').value,
        description: this.createCourseForm.get('courseDescription').value,
        category: {name: strUser, imageUrl: ''}};
      this.backendSave(course);
      this.closeNewCoursePopUp();
    }
  }

  /**
   * This method send a create course petition to the backend server.
   * @param course Course to save.
   */
  backendSave(course: Course) {
    const observer = this.courseService.saveCourse(course);
    observer.subscribe(
      data => { this.getUserData(); },
      (error: HttpErrorResponse) => {console.log(error.status); this.dealNotUser(error.error); }
    );
  }

  /**
   * This method initialize and set the validation rules to the forms
   * @private
   */
  private initializeForms() {
    this.updateForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'description': new FormControl('')
    });

    this.tryingUser = false;
    this.validUser = true;
    this.validEmail = true;

    this.createCourseForm = new FormGroup({
      'courseName': new FormControl('', [Validators.required]),
      'courseDescription': new FormControl(''),
      'courseCategory': new FormControl('' , [Validators.required])
    });


    this.updateForm.controls['username'].disable();
    this.updateForm.controls['email'].disable();
    this.updateForm.controls['description'].disable();
    this.tryingCourse = false;
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
   * Verifies that all fields of the form comply with the restrictions
   * @return boolean: true if the password and the confirm password have de same value.
   */
  validateNewCourseFields() {
    return this.createCourseForm.valid;
  }

  /**
   * Print the create course form feedback.
   * @private
   */
  private updateFeedback() {

    if (!this.createCourseForm.controls['courseName'].valid) {
      const nameInput = document.getElementById('div-courseName');
      nameInput.classList.remove('invalid-input');
      nameInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-courseName').classList.remove('invalid-input');
    }
    if (!this.createCourseForm.controls['courseDescription'].valid || !this.validEmail) {
      const emailInput = document.getElementById('div-courseDescription');
      emailInput.classList.remove('invalid-input');
      emailInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-courseDescription').classList.remove('invalid-input');
    }
    if (this.createCourseForm.controls['courseCategory'].errors?.required) {
      const categoryInput = document.getElementById('div-courseCategory');
      categoryInput.classList.remove('invalid-input');
      categoryInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-courseCategory').classList.remove('invalid-input');
    }

  }

  /**
   * Delete the user of the app.
   */
  deleteUserProfile() {
    const observer = this.accountService.deleteUser(this.cookie.get('uuid'));
    observer.subscribe(
      data => {this.route.navigate(['/login']); this.deleteError = false; this.closeDeletePopup(); },
      error => {console.log(error.status); this.dealErrorNotDelete(error.error); }
    );
  }

  /**
   * This method deal with the errors received from the backend

   * @param error: error message received from the backend
   * @private
   */
  private dealErrorNotDelete(error: JSON) {
    this.deleteError = true;
  }

  /**
   * Shows the user delete pop up
   */
  openDeletePopup() {
    this.popupDeleteProfileVisible = true;
  }

  /**
   * Closes the user delete pop up
   */
  closeDeletePopup() {
    this.deleteError = false;
    this.popupDeleteProfileVisible = false;
  }
}
