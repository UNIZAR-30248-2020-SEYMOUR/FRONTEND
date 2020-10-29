import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../interfaces';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  changePassword: FormGroup;
  triedChange: Boolean;
  invalidRepeatPassword: Boolean;
  invalidPassword: Boolean;

  constructor(private changeService: AccountService) {
    this.triedChange =  false;
    this.invalidRepeatPassword =  false;
    this.invalidPassword =  false;
    this.changePassword =  new FormGroup({
      'password' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      'repeatPassword' : new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  /**
   *
   */
  checkPasswords(): Boolean { // here we have the 'passwords' group
    const pass = this.changePassword.get('password').value;
    const confirmPass = this.changePassword.get('repeatPassword').value;
    return pass === confirmPass;
  }

  /**
   * Validate that the formulary is complete correctly and try to login in the app.
   * @private
   */
  submit() {
    this.invalidRepeatPassword = false;
    this.invalidPassword = false;
    const passwordInput = document.getElementById('passwordInput');
    const repeatPasswordInput = document.getElementById('repeatPasswordInput');
    this.triedChange = true;
    if (this.changePassword.get('repeatPassword').value === '') {
      repeatPasswordInput.style.border = 'solid #dc3545';
    }
    if (this.changePassword.get('password').value === '') {
      passwordInput.style.border = 'solid #dc3545';
    }
    alert();
    if (this.changePassword.valid && this.checkPasswords()) {
      alert(this.changePassword.get('passowrd').value);
     /* const observer = this.changeService.login(user);
      observer.subscribe(
        data => {this.changeService.saveUser(data); this.route.navigate(['/dashboard']); },
        (error: HttpErrorResponse) => {console.log(error.status); this.dealNotLogin(error.error); }
      );*/
    }
  }

}
