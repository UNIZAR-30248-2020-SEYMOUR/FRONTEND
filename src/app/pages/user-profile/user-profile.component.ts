import { Component, OnInit } from '@angular/core';
import {Category, Course, User} from '../../interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * This class contains de logic of the user-profile.
 */
export class UserProfileComponent implements OnInit {
  user: User;

  courses: Course[];
  disabled: any;
  valuation: number;

  registerForm: FormGroup;
  createCourseForm: FormGroup;
  triyingUser: boolean;
  triyingCourse: boolean;
  validUser: boolean;
  validEmail: boolean;
  popupVisible: boolean;
  categories: Category[];
  constructor(private accountService: AccountService, private route: Router) {
   this.popupVisible = false;
    this.user = {
      username: 'Federico',
      email: 'federico@ld.com',
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      password: ''};
    this.disabled = 'false';
    this.courses = [{ coursename: 'uno', description: 'lid1', category: {name: 'Tech', imageUrl: '/assets/img/otros.png'}},
        { coursename: 'dos', description: 'lid2', category: {name: 'Tech', imageUrl: '/assets/img/otros.png'}},
        { coursename: 'tres', description: 'lid3', category: {name: 'Tech', imageUrl: '/assets/img/otros.png'}}],
    this.valuation = 5.4;

     this.initializeForms();
     this.getUserData();
     this.loadCategories();
  }

  /**
   * This method save the user modified data
   * (is not complete yet)
   */
  savechanges() {
    this.validEmail = true;
    this.validUser = true;
    this.triyingUser = true;

    if (this.registerForm.valid) {
      const user: User = {
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: '',
        description: this.registerForm.get('description').value
      };
    }
  }

  ngOnInit() {
  }

  /**
   * This method cancel the user edition blocking the profile form inptus.
   */
  cancel() {
    this.disabled = !this.disabled;
  }

  /**
   * This method updates the user data.
   * @private
   */
  private getUserData() {
    const observer = this.accountService.getCourses();
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
  closePopUp() {
    this.popupVisible = false;
    this.createCourseForm.reset();
    this.triyingCourse = false;
  }

  /**
   * This method open the create course popup.
   */
  openPopUp() {
    this.popupVisible = true;
  }

  /**
   * This method save the course entered in the form.
   */
  saveCourse() {
    this.triyingCourse = true;
    this.updateFeedback();
    if (this.createCourseForm.valid) {
      const combo = (<HTMLSelectElement>document.getElementById('comboCategories'));
      const strUser = combo.options[combo.selectedIndex].text;

      const course: Course = {
        coursename: this.createCourseForm.get('courseName').value,
        description: this.createCourseForm.get('courseDescription').value,
        category: {name: strUser, imageUrl: ''}};
      this.backendSave(course);
      this.closePopUp();
    }
  }

  /**
   * This method send a create course petition to the backend server.
   * @param course Course to save.
   */
  backendSave(course: Course) {
    const observer = this.accountService.saveCourse(course);
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
    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'description': new FormControl('')
    });

    this.triyingUser = false;
    this.validUser = true;
    this.validEmail = true;

    this.createCourseForm = new FormGroup({
      'courseName': new FormControl('', [Validators.required]),
      'courseDescription': new FormControl(''),
      'courseCategory': new FormControl('' , [Validators.required])
    });

    this.triyingCourse = false;
  }

  /**
   * This method get the categories information from the backend server.
   * @private
   */
  private loadCategories() {
    const observer = this.accountService.getCategories();
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
}
