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
  createGroupForm: FormGroup;
  triyingUser: boolean;
  triyingCourse: boolean;
  validUser: boolean;
  validEmail: boolean;
  popupVisible: boolean;
  categories: Category[];
  constructor(private accountService: AccountService, private route: Router) {
   this.popupVisible = true;
    this.user = {
      username: 'Federico',
      email: 'federico@ld.com',
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      password: ''};
    this.disabled = 'false';
    this.courses = [{ name: 'uno', description: 'lid1', category: {categoryName: 'Tech'}},
        { name: 'dos', description: 'lid2', category: {categoryName: 'Tech'}},
        { name: 'tres', description: 'lid3', category: {categoryName: 'Tech'}}];
    this.valuation = 5.4;

     this.initializeForms();

    // this.getUserData();
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
  cancel() {
    this.disabled = !this.disabled;
  }

  private getUserData() {
    const observer = this.accountService.getCourses();
    observer.subscribe(
      data => {
        this.user.username = data.username;
        this.user.description = data.description;
        this.user.email = data.email;
        this.courses = data.courses;
      },
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
      alert(error['error']);
      this.route.navigate(['/login']);
    }
  }

  closePopUp() {
    this.popupVisible = false;
    this.registerForm.reset();
  }

  openPopUp() {
    this.popupVisible = true;
  }

  saveCourse() {
    if (this.createGroupForm.valid) {
      const course: Course = {
        name: this.registerForm.get('groupName').value,
        description: this.registerForm.get('groupDescription').value,
        category: {categoryName: this.registerForm.get('category').value}};
      this.backendSave(course);
    }
  }

  backendSave(course: Course) {
    const observer = this.accountService.saveCourse(course);
    observer.subscribe(
      data => { this.getUserData(); },
      (error: HttpErrorResponse) => {console.log(error.status); this.dealNotUser(error.error); }
    );
  }

  private initializeForms() {
    /*this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'description': new FormControl('')
    });

    this.triyingUser = false;
    this.validUser = true;
    this.validEmail = true;*/

    this.createGroupForm = new FormGroup({
      'courseName': new FormControl('', [Validators.required]),
      'courseDescription': new FormControl('', [Validators.required]),
      'courseCategory': new FormControl('')
    });

    this.triyingCourse = false;
  }

  private loadCategories() {
    const observer = this.accountService.getCategories();
    observer.subscribe(
      data => {  },
      (error: HttpErrorResponse) => {console.log(error.status); this.dealNotUser(error.error); }
    );
  }
}
