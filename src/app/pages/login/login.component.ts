import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../interfaces';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * This class control the logic of the login component. Do the login and redirect to the main
 * page of the web unless there is some mistake in that case show a error message.
 */
export class LoginComponent implements OnInit, OnDestroy {
  loginData: FormGroup;
  recoverPasswordData: FormGroup;
  triedLogin: Boolean;
  triedSendEmail: Boolean;
  invalidEmail: boolean;
  invalidPassword: boolean;
  emailSent: boolean;

  constructor(private loginService: AccountService, private cookie: CookieService, private route: Router) {
    this.triedLogin = false;
    this.triedSendEmail = false;
    this.invalidPassword = false;
    this.invalidEmail = false;
    this.emailSent = false;
    this.loginData =  new FormGroup({
      'email' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required]),
    });
    this.recoverPasswordData = new FormGroup({
      'email' : new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }
  ngOnDestroy() {
  }


  /**
   * Validate that the form is complete correctly and try to login in the app.
   * @private
   */
  submit() {
    this.invalidEmail = false;
    this.invalidPassword = false;
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    this.triedLogin = true;
    if (this.loginData.get('email').value === '') {
      emailInput.style.border = '2px solid rgb(220, 53, 69)';
    }
    if (this.loginData.get('password').value === '') {
       passwordInput.style.border = '2px solid rgb(220, 53, 69)';
    }
    if (this.loginData.valid) {
      const user: Login = {
        email: this.loginData.get('email').value,
        password: this.loginData.get('password').value
      };
      const observer = this.loginService.login(user);
      observer.subscribe(
          data => {
            this.loginService.saveUser(data);
            this.cookie.set('username', data.username);
            this.route.navigate(['/feed']);
            },
          (error: HttpErrorResponse) => {
            console.log(error.status);
            this.dealNotLogin(error.error); }
        );
    }
  }

  /**
   * This method handles the errors received from the backend
   * @param error: error message received from the backend
   * @private
   */
  private dealNotLogin(error: JSON) {
    if (error['error'] === 'Invalid email') {
      this.invalidEmail = true;
    } else if (error['error'] === 'Invalid password') {
      this.invalidPassword = true;
    }
  }

  /**
   * Validate that the formulary is complete correctly and try to send the email of change password.
   * Treat with the response from the server
   * @private
   */
  sendEmail() {
    this.invalidEmail = false;
    this.invalidPassword = false;
    this.triedSendEmail = true;
    const emailInput = document.getElementById('emailRecoverPassword');

    if (this.recoverPasswordData.get('email').value === '') {
      emailInput.style.border = '2px solid rgb(220, 53, 69)';
    }
    if (this.recoverPasswordData.valid) {
      const observer = this.loginService.sendEmail(this.recoverPasswordData.get('email').value);
      observer.subscribe(
        data => this.emailSent = true,
        (error: HttpErrorResponse) => {console.log(error.status); this.invalidEmail = true; }
      );
    }
  }

  /**
   * Open the pop up of send a email to recover password
   */
  showPopupRecoverPassword() {
    const popUpRecoverPassword = document.getElementById('overlay-recover-password');
    popUpRecoverPassword.classList.add('active');
  }

  /**
   * Close the pop up of send a email to recover password
   */
  closeRecoverPassword() {
    const popUpRecoverPassword = document.getElementById('overlay-recover-password');
    popUpRecoverPassword.classList.remove('active');
  }
}
