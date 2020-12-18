import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})

/**
 * This class contains de logic of the change password page mainly the form validation.
 */
export class RecoverPasswordComponent implements OnInit {
  changePasswordData: FormGroup;
  triedChange: Boolean;
  invalidRepeatPassword: Boolean;
  invalidPassword: Boolean;
  invalidToken: Boolean;
  urlTree;

  constructor(private changeService: AccountService, private route: ActivatedRoute, private router: Router) {
    this.triedChange =  false;
    this.invalidRepeatPassword =  false;
    this.invalidPassword =  false;
    this.invalidToken = false;
    this.changePasswordData =  new FormGroup({
      'password' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      'repeatPassword' : new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  /**
   * Verifies that the content of the password fields contains the same value
   * @return boolean: true if the password and the confirm password have de same value.
   */
  checkPasswords(): Boolean { // here we have the 'passwords' group
    const pass = this.changePasswordData.get('password').value;
    const confirmPass = this.changePasswordData.get('repeatPassword').value;
    return pass === confirmPass;
  }

  /**
   * Validate that the formulary is complete correctly and try to change the password in the app.
   * @private
   */
  submit() {
    this.urlTree = this.router.parseUrl(this.router.url);
    this.invalidRepeatPassword = false;
    this.invalidPassword = false;
    this.triedChange = true;
    const passwordInput = document.getElementById('passwordInput');
    const repeatPasswordInput = document.getElementById('repeatPasswordInput');

    if (this.changePasswordData.get('repeatPassword').value === '') {
      repeatPasswordInput.style.border = '2px solid rgb(220, 53, 69)';
    }
    if (this.changePasswordData.get('password').value === '') {
      passwordInput.style.border = '2px solid rgb(220, 53, 69)';
    }
    if (this.changePasswordData.valid && this.checkPasswords()) {
      this.changePassword();
    }
  }

  /**
   * Try to change the password of the user
   * @private
   */
  private changePassword() {
    const observer = this.changeService.changePassword(this.changePasswordData.get('password').value,
      this.urlTree.queryParams['token']);
    observer.subscribe(
      data => this.router.navigate(['/login']),
      (error: HttpErrorResponse) => {
        console.log(error.status);
        this.invalidToken = true;
      }
    );
  }

}
