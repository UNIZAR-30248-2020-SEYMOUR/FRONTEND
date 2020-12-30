import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SelfProfile} from '../../interfaces';
import {AccountService} from '../../services/account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * This class contains de logic of the register page mainly the form validation.
 */
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  trying: boolean;
  validUser: boolean;
  validEmail: boolean;

  constructor(private registerService: AccountService, private cookie: CookieService, private route: Router) {
    this.trying = false;
    this.validUser = true;
    this.validEmail = true;

    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'pswd': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'repeat-pswd': new FormControl('', [Validators.required]),
      'description':  new FormControl('', [
        Validators.maxLength(500)
      ]),
    });
  }

  ngOnInit() {
  }

  /**
   * Verifies that the content of the password fields contains the same value
   * @return boolean: true if the password and the confirm password have de same value.
   */
  checkPasswords() { // here we have the 'passwords' group
    const pass = this.registerForm.get('pswd').value;
    const confirmPass = this.registerForm.get('repeat-pswd').value;
    return pass === confirmPass;
  }

  /**
   * If the content of the form fields are correct it perform a http request with the form params to the backend
   * @return void
   */
  submit() {
    this.trying = true;
    if (this.registerForm.valid && this.checkPasswords()) {
      const user: SelfProfile = {
        uuid: '',
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('pswd').value,
        description: this.registerForm.get('description').value,
        rate: 0,
        courses: []
      };
      const observer = this.registerService.register(user);
      observer.subscribe(
        data => {
          this.registerService.saveUser(data);
          this.cookie.set('username', user.username)
          this.route.navigate(['/user-profile']);
          },
        (error: HttpErrorResponse) => {
          this.dealNotRegister(error.error);
        }
      );
    }
    this.updateFeedback();
  }

  /**
   * Verifies that all fields of the form comply with the restrictions
   * @return boolean: true if the password and the confirm password have de same value.
   */
  validateFields() {
    return this.registerForm.valid && this.checkPasswords();
  }

  /**
   * This method deal with the errors received from the backend
   * @param error: error message received from the backend
   * @private
   */
  private dealNotRegister(error: JSON) {
    if (error['error'] === ('Duplicate entry \'' + this.registerForm.get('username').value + '\' for key \'USERS.username\'')) {
      this.validUser = false;
      this.validEmail = true;
    } else if (error['error'] === ('Duplicate entry \'' + this.registerForm.get('email').value + '\' for key \'USERS.email\'')) {
      this.validEmail = false;
      this.validUser = true;
    }
    this.updateFeedback();

  }

  /**
   * Print the form feedback.
   * @private
   */
  private updateFeedback() {
    this.updateUsernameFeedback();
    this.updateEmailFeedback();
    this.updatePasswordFeedback();
    this.updateDescriptionFeedback();
  }

  /**
   * Print the description feedback
   * @private
   */
  private updateDescriptionFeedback() {
    if (!this.registerForm.controls['description'].valid) {
      const usernameInput = document.getElementById('div-description');
      usernameInput.classList.remove('invalid-input');
      usernameInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-description').classList.remove('invalid-input');
    }
  }
  /**
   * Print the password feedback
   * @private
   */
  private updatePasswordFeedback() {
    if (this.registerForm.controls['pswd'].errors?.required) {
      const pswdInput = document.getElementById('div-pswd');
      pswdInput.classList.remove('invalid-input');
      pswdInput.classList.add('invalid-input');
      const repeatPswdInput = document.getElementById('div-repeat-pswd');
      repeatPswdInput.classList.remove('invalid-input');
      repeatPswdInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-pswd').classList.remove('invalid-input');
    }
    if (!this.checkPasswords() || this.registerForm.controls['pswd'].errors?.required) {
      const repeatPswdInput = document.getElementById('div-repeat-pswd');
      repeatPswdInput.classList.remove('invalid-input');
      repeatPswdInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-repeat-pswd').classList.remove('invalid-input');
    }
  }
  /**
   * Print the email feedback
   * @private
   */
  private updateEmailFeedback() {
    if (!this.registerForm.controls['email'].valid || !this.validEmail) {
      const emailInput = document.getElementById('div-email');
      emailInput.classList.remove('invalid-input');
      emailInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-email').classList.remove('invalid-input');
    }
  }
  /**
   * Print the username feedback
   * @private
   */
  private updateUsernameFeedback() {
    if (!this.registerForm.controls['username'].valid || !this.validUser) {
      const usernameInput = document.getElementById('div-username');
      usernameInput.classList.remove('invalid-input');
      usernameInput.classList.add('invalid-input');
    } else {
      document.getElementById('div-username').classList.remove('invalid-input');
    }
  }
}

