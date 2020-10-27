import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../interfaces';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: FormGroup;
  triedLogin: Boolean;
  invalidEmail: boolean;
  invalidPassword: boolean;


  constructor(private loginService: AccountService, private route: Router) {
    this.triedLogin = false;
    this.invalidPassword = false;
    this.invalidEmail = false;
    this.loginData =  new FormGroup({
      'email' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {

  }
  ngOnDestroy() {
  }


  /**
   * Validate that the formulary is complete correctly and try to login in the app.
   * @author: Eduardo Ruiz
   * @revisor:
   * @private
   */
  submit() {
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    this.triedLogin = true;
    if (this.loginData.get('email').value === '') {
      emailInput.style.border = 'solid #dc3545';
    }
    if (this.loginData.get('password').value === '') {
       passwordInput.style.border = 'solid #dc3545';
    }
    if (this.loginData.valid) {
      const user: Login = {
        email: this.loginData.get('email').value,
        password: this.loginData.get('password').value
      };
      const observer = this.loginService.login(user);
      observer.subscribe(
          data => {this.loginService.saveUser(data); this.route.navigate(['/dashboard']); },
          (error: HttpErrorResponse) => {console.log(error.status); this.dealNotLogin(error.error); },
        );
    }
    alert(this.loginData.get('email').value);
    alert(this.loginData.get('password').value);
  }

  private dealNotLogin(error: JSON) {
    alert(error['error']);
    if (error['error'] === 'Invalid email') {
      this.invalidEmail = true;
    } else if (error['error'] === 'Invalid password') {
      this.invalidPassword = true;
    }
  }

}
