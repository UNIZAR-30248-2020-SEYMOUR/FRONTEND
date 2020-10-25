import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: FormGroup;
  triedLogin: Boolean;

  constructor() {
    this.triedLogin = false;
    this.loginData =  new FormGroup({
      'user' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }
  ngOnDestroy() {
  }


  private login() {
    const userInput = document.getElementById('userInput');
    const passwordInput = document.getElementById('passwordInput');
    this.triedLogin = true;
    if (this.loginData.get('user').value === '') {
      userInput.style.border = 'solid #dc3545';
    }
    if (this.loginData.get('password').value === '') {
       passwordInput.style.border = 'solid #dc3545';
    }
    alert(this.loginData.get('user').value);
    alert(this.loginData.get('password').value);
  }


}
