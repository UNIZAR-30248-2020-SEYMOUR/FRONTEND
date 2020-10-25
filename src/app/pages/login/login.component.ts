import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  triying: boolean;
  constructor() {
    this.triying = false;
    this.form = new FormGroup({
      'nickname': new FormControl('', [
        Validators.required,
        Validators.minLength(30)
      ]),
      'pswd': new FormControl('', [
        Validators.required
      ])
    });

  }

 submit() {
    console.log(this.form.value);
    console.log(this.form );
  }



  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
