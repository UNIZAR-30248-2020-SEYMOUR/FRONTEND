import { Component, OnInit } from '@angular/core';
import {Course, User} from '../../interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;

  courses: Course[];
  disabled: any;
  valuation: number;

  registerForm: FormGroup;
  triying: boolean;
  validUser: boolean;
  validEmail: boolean;

  constructor(private accountService: AccountService) {
    this.user = {
      username: 'Federico',
      email: 'federico@ld.com',
      description: 'lorem ipsum dolor asdfas csadcasdcsadca sdcasd csadcsac',
      password: ''};
    this.disabled = 'false';
    this.courses = [{ courseName: 'uno', courseDescription: 'lid1'},
        { courseName: 'dos', courseDescription: 'lid2'},
        { courseName: 'tres', courseDescription: 'lid3'}];
    this.valuation = 5.4;

    this.triying = false;
    this.validUser = true;
    this.validEmail = true;

    this.registerForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'description': new FormControl('')
    });


    const observer = this.accountService.getCourses();
    observer.subscribe(
      data => {this.accountService.saveUser(data); },
      (error: HttpErrorResponse) => {console.log(error.status); this.dealNotLogin(error.error); }
    );
  }

  savechanges() {
    this.validEmail = true;
    this.validUser = true;
    this.triying = true;

    if (this.registerForm.valid) {
      const user: User = {
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: '',
        description: this.registerForm.get('description').value
      };
      // const observer = this.registerService.register(user);
      /*observer.subscribe(
        data => {alert('REGISTRADO'); },
        (error: HttpErrorResponse) => {this.dealNotRegister(error.error); }
      );*/
    }
  }


  /*private dealNotRegister(error: JSON) {
    if (error['error'] === ('Duplicate entry \'' + this.registerForm.get('username').value + '\' for key \'USERS.username\'')) {
      this.validUser = false;
    } else if (error['error'] === ('Duplicate entry \'' + this.registerForm.get('email').value + '\' for key \'USERS.email\'')) {
      this.validEmail = false;
    }
  }*/
  ngOnInit() {
  }
  cancel() {
    this.disabled = !this.disabled;
  }

  private dealNotLogin(error: JSON) {
    if (error['error'] === 'Invalid email') {
      this.invalidEmail = true;
    } else if (error['error'] === 'Invalid password') {
      this.invalidPassword = true;
    }
  }
}
