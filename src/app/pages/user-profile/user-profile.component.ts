import { Component, OnInit } from '@angular/core';
import {Course, User} from '../../interfaces';
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
  triying: boolean;
  validUser: boolean;
  validEmail: boolean;

  constructor(private accountService: AccountService, private route: Router) {
    this.user = {
      username: 'Federico',
      email: 'federico@ld.com',
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      password: ''};
    this.disabled = 'false';
    this.courses = [{ courseName: 'uno', courseDescription: 'lid1'},
        { courseName: 'dos', courseDescription: 'lid2'},
        { courseName: 'tres', courseDescription: 'lid3'}];
    this.valuation = 5.4;

    this.triying = false;
    this.validUser = true;
    this.validEmail = true;

    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'description': new FormControl('')
    });


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
   * This method save the user modified data
   * (is not complete yet)
   */
  savechanges() {
    this.validEmail = true;
    this.validUser = true;
    this.triying = true;

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

  /**
   * This method deal with the errors from the backend requests
   * @param error: error message received from the backend
   * @private
   */
  private dealNotUser(error: JSON) {
    if (error['error'] === 'User does not exist') {
      this.route.navigate(['/login']);
    }
  }
}
