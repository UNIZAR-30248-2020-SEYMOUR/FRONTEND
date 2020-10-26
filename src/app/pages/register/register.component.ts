import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * This class contains de logic of the register page mainly the form validation.
 */
export class RegisterComponent implements OnInit {
  public registerUrl: string;
  registerForm: FormGroup;
  triying: boolean;

  constructor() {
    this.registerUrl = 'http://oc2.danielhuici.ml/users/';
    this.triying = false;
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

  /**
   * Verifies that all fields of the form comply with the restrictions
   */
  validateFields() {
    return this.registerForm.valid && this.checkPasswords();
  }

  /**
   * Verifies that the content of the password fields contains the same value
   */
  checkPasswords() { // here we have the 'passwords' group
    const pass = this.registerForm.get('pswd').value;
    const confirmPass = this.registerForm.get('repeat_pswd').value;
    return pass === confirmPass;
  }

  /**
   * If the content of the form fields are correct it perform a http request with the form params to the backend
   */
  submit() {
    this.triying = true;
    if (this.validateFields()) {
      const user: User = {
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        description: this.registerForm.get('description').value,
        password: this.registerForm.get('pswd').value
      };
      // console.log(JSON.stringify(this.register(user)) + ' /888888888888888888888888888888888888888888888888888888888888888888888888');
    }

    console.log(this.registerForm.value);
    console.log(this.registerForm );
  }

  /*private register(user: User): string {
    const json = JSON.stringify(user);
    const params = 'json=' + json;

    // Establecemos cabeceras
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    alert(JSON.stringify(params));
    this.http.post(this.registerUrl + 'register', params ).subscribe(data => {
      console.log(data + '**********************************');
      alert(data + '**********************************');
    });
    return ''; //this.http.post(this.registerUrl + 'register', params, {headers: headers});
  }*/

  ngOnInit() {
  }
  ngOnDestroy() {
  }
}

