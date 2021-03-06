import { Component, OnInit } from '@angular/core';
import {Category, Course, SelfProfile, Video, VideoFeed} from '../../interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {CourseService} from '../../services/course.service';
import {CategoriesService} from '../../services/categories.service';
import {manageGenericError} from '../error/error.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * This class contains de logic of the user-profile.
 */
export class UserProfileComponent implements OnInit {
  NUM_GET_FEED = 10;

  user: SelfProfile;

  disabled: any;

  updateForm: FormGroup;
  createCourseForm: FormGroup;
  tryingUser: boolean;
  tryingCourse: boolean;
  deleteProfileError: boolean;
  deleteCourseError: boolean;
  updateError: boolean;
  popupNewCourseVisible: boolean;
  popupDeleteProfileVisible: boolean;
  categories: Category[];
  popupDeleteCourseVisible: boolean;

  private validUser: boolean;
  private validEmail: boolean;
  private courseToDelete: number;

  constructor(private accountService: AccountService, private courseService: CourseService,
              private categoriesService: CategoriesService, private router: Router,
              private route: Router, private cookie: CookieService) {

   this.popupNewCourseVisible = false;
   this.popupDeleteProfileVisible = false;
   this.deleteProfileError = false;
   this.deleteCourseError = false;
   this.updateError = false;
    this.user = {
      uuid: '',
      username: 'No válido',
      email: 'noValido@ld.com',
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      password: '',
      courses: [],
      rate: 0};
    this.disabled = 'false';

    this.initializeForms();
    this.getUserData();
    this.loadCategories();
  }

  ngOnInit() {
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
        description: this.updateForm.get('description').value,
        courses: [],
        rate: 0
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
    this.getUserData();
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
        this.user.courses = data.courses;
        this.user.rate = data.rate;
        this.cookie.set('username', this.user.username);
      },
      error => {
        console.log(error.status + 'getUserData');
        manageGenericError(error, this.router);
      }
    );
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
        category: {name: strUser, imageUrl: ''},
        rate: 0,
        ownername: ''
      };
      this.backendSave(course);
      this.closeNewCoursePopUp();
    }
  }

  /**
   * This method send a create course petition to the backend server.
   * @param course Course to save.
   */
  backendSave(course: Course) {
    const observer = this.courseService.saveNewCourse(course);
    observer.subscribe(
      data => { this.getUserData(); },
      (error: HttpErrorResponse) => {
        console.log(error.status);
        manageGenericError(error, this.router);
      }
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
      error => {
        console.log(error.status + 'loadCategories');
        manageGenericError(error, this.router);
      }
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
      data => {this.route.navigate(['/login']);
      this.deleteProfileError = false;
      this.closeDeleteProfilePopup(); },
      error => {console.log(error.status); this.dealErrorNotDeleteProfile(error.error); }
    );
  }

  /**
   * This method deal with the errors received from the backend
   * @param error: error message received from the backend
   * @private
   */
  private dealErrorNotDeleteProfile(error: JSON) {
    this.deleteProfileError = true;
  }

  /**
   * Shows the user delete pop up
   */
  openDeleteProfilePopup() {
    this.popupDeleteProfileVisible = true;
  }

  /**
   * Closes the user delete pop up
   */
  closeDeleteProfilePopup() {
    this.deleteProfileError = false;
    this.popupDeleteProfileVisible = false;
  }

  /**
   * Shows the user delete pop up
   */
  openDeleteCoursePopup() {
    this.popupDeleteCourseVisible = true;
  }

  /**
   * Closes the user delete pop up
   */
  closeDeleteCoursePopup() {
    this.deleteCourseError = false;
    this.popupDeleteCourseVisible = false;
  }

  /**
   * Tries to delete a course (Opening a confirm dialog);
   */
  tryDeleteCourse(id: number) {
    this.courseToDelete = id;
    this.openDeleteCoursePopup();
  }

  private dealErrorNotDeleteCourse() {
    this.deleteCourseError = true;
  }

  /**
   * Send a deletion course request to the backend;
   */
  deleteCourse() {
    const observer = this.courseService.removeCourse(this.courseToDelete);
    observer.subscribe(
      data => {this.getUserData(); this.closeDeleteCoursePopup(); },
      error => {console.log(error.status);
        this.dealErrorNotDeleteCourse();
      }
    );
  }
}
