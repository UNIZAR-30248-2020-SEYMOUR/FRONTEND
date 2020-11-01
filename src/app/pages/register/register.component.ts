import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces';
import {AccountService} from '../../services/account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

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
  triying: boolean;
  validUser: boolean;
  validEmail: boolean;

  constructor(private registerService: AccountService, private route: Router) {
    this.triying = false;
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
      'repeat_pswd': new FormControl('', [Validators.required]),
      'description': new FormControl('')
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
    const confirmPass = this.registerForm.get('repeat_pswd').value;
    return pass === confirmPass;
  }

  /**
   * If the content of the form fields are correct it perform a http request with the form params to the backend
   * @return void
   */
  submit() {
    this.validEmail = true;
    this.validUser = true;
    this.triying = true;
    if (this.registerForm.valid && this.checkPasswords()) {
      const user: User = {
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('pswd').value,
        description: this.registerForm.get('description').value
      };
      const observer = this.registerService.register(user);
      observer.subscribe(
        data => {this.registerService.saveUser(data); this.route.navigate(['/user-profile']); },
        (error: HttpErrorResponse) => {this.dealNotRegister(error.error); }
      );
    } else {
      if (this.registerForm.controls['username'].errors?.required) {
        const usernameInput = document.getElementById('input-username');
        usernameInput.style.border = 'solid #dc3545';
        usernameInput.style.borderRadius = '5px';
        usernameInput.style.borderWidth = '2px';
      }
      if (this.registerForm.controls['email'].errors?.required) {
        const usernameInput = document.getElementById('input-email');
        usernameInput.style.border = 'solid #dc3545';
        usernameInput.style.borderRadius = '5px';
        usernameInput.style.borderWidth = '2px';
      }
      if (this.registerForm.controls['pswd'].errors?.required) {
        const pswdInput = document.getElementById('input-pswd');
        pswdInput.style.border = 'solid #dc3545';
        pswdInput.style.borderRadius = '5px';
        pswdInput.style.borderWidth = '2px';
        const repeatPswd = document.getElementById('input-repeat-pswd');
        repeatPswd.classList.add('invalid-input');
      }
      if (!this.checkPasswords() ) {
        const repeatPswd = document.getElementById('input-repeat-pswd');
        repeatPswd.style.border = 'solid #dc3545';
        repeatPswd.style.borderRadius = '5px';
        repeatPswd.style.borderWidth = '2px';
      }
    }
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
    } else if (error['error'] === ('Duplicate entry \'' + this.registerForm.get('email').value + '\' for key \'USERS.email\'')) {
      this.validEmail = false;
    }
  }
}

