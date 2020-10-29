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
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'pswd': new FormControl('', [Validators.required, Validators.minLength(10)]),
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
    alert(this.registerForm.get('description').value);
    if (this.registerForm.valid && this.checkPasswords()) {
      const user: User = {
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('pswd').value,
        description: this.registerForm.get('description').value
      };
      const observer = this.registerService.register(user);
      observer.subscribe(
        data => {this.registerService.saveUser(data); alert('REGISTRADO'); this.route.navigate(['/dashboard']); },
        (error: HttpErrorResponse) => {this.dealNotRegister(error.error); }
      );
    }
  }

  /**
   * Verifies that all fields of the form comply with the restrictions
   * @return boolean: true if the password and the confirm password have de same value.
   */
  validateFields() {
    return this.registerForm.valid && this.checkPasswords();
  }

  private dealNotRegister(error: JSON) {
    if (error['error'] === ('Duplicate entry \'' + this.registerForm.get('username').value + '\' for key \'USERS.username\'')) {
      this.validUser = false;
    } else if (error['error'] === ('Duplicate entry \'' + this.registerForm.get('email').value + '\' for key \'USERS.email\'')) {
      this.validEmail = false;
    }
  }
}

