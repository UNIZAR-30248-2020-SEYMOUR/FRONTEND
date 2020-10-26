import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../interfaces';
import {AccountService} from '../../services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: FormGroup;
  triedLogin: Boolean;
  loginUrl: string;

  constructor(private loginService: AccountService) {
    this.loginUrl = 'http://oc2.danielhuici.ml/users/login';
    this.triedLogin = false;
    this.loginData =  new FormGroup({
      'email' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required])
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
        email: 'eduardo@gmail.com',
        password: '12345678910'
      };
      this.loginService.login(user);
    }
    alert(this.loginData.get('email').value);
    alert(this.loginData.get('password').value);
  }

}
