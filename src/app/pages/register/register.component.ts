import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  triying: boolean;
  private builder: FormBuilder;
  constructor() {
    this.triying = false;
    this.registerForm = new FormGroup({
      'nickname': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [Validators.required ]),
      'pswd': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'repeat_pswd': new FormControl('', [Validators.required]),
    });
  }

  checkPasswords() { // here we have the 'passwords' group
    const pass = this.registerForm.get('pswd').value;
    const confirmPass = this.registerForm.get('repeat_pswd').value;
    return pass === confirmPass;
  }

  submit() {
    this.triying = true;
    if (this.registerForm.valid && this.checkPasswords()) {
      this.http.post<Article>('https://jsonplaceholder.typicode.com/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
        this.postId = data.id;
      })
    }

    console.log(this.registerForm.value);
    console.log(this.registerForm );
  }



  ngOnInit() {
  }
  ngOnDestroy() {
  }
}

