import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ RegisterComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = () => '';
  });

  it('should feedback invalid username', () => {
    component.registerForm.get('username').setValue('');
    component.registerForm.get('email').setValue('valid@email.com');
    component.registerForm.get('pswd').setValue('validpassword');
    component.registerForm.get('repeat-pswd').setValue('validpassword');

    document.getElementById('register-button').click();

    expect((<HTMLInputElement>document.getElementById('div-username')).classList.contains('invalid-input')).toBeTrue();
    expect((<HTMLInputElement>document.getElementById('div-email')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-pswd')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-repeat-pswd')).classList.contains('invalid-input')).toBeFalse();
  });

  it('should feedback invalid email', () => {
    component.registerForm.get('username').setValue('validusername');
    component.registerForm.get('email').setValue('');
    component.registerForm.get('pswd').setValue('validpassword');
    component.registerForm.get('repeat-pswd').setValue('validpassword');

    document.getElementById('register-button').click();

    expect((<HTMLInputElement>document.getElementById('div-username')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-email')).classList.contains('invalid-input')).toBeTrue();
    expect((<HTMLInputElement>document.getElementById('div-pswd')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-repeat-pswd')).classList.contains('invalid-input')).toBeFalse();
  });
  it('should feedback invalid password', () => {
    component.registerForm.get('username').setValue('validusername');
    component.registerForm.get('email').setValue('valid@email.com');
    component.registerForm.get('pswd').setValue('');
    component.registerForm.get('repeat-pswd').setValue('');

    document.getElementById('register-button').click();

    expect((<HTMLInputElement>document.getElementById('div-username')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-email')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-pswd')).classList.contains('invalid-input')).toBeTrue();
    expect((<HTMLInputElement>document.getElementById('div-repeat-pswd')).classList.contains('invalid-input')).toBeTrue();
  });
  it('should feedback invalid repeat password', () => {
    component.registerForm.get('username').setValue('validusername');
    component.registerForm.get('email').setValue('valid@email.com');
    component.registerForm.get('pswd').setValue('validpassword');
    component.registerForm.get('repeat-pswd').setValue('differentpassword');

    document.getElementById('register-button').click();

    expect((<HTMLInputElement>document.getElementById('div-username')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-email')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-pswd')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-repeat-pswd')).classList.contains('invalid-input')).toBeTrue();
  });
  it('should feedback invalid repeat password', () => {
    component.registerForm.get('username').setValue('validusername');
    component.registerForm.get('email').setValue('valid@email.com');
    component.registerForm.get('pswd').setValue('validpassword');
    component.registerForm.get('repeat-pswd').setValue('validpassword');

    document.getElementById('register-button').click();

    expect((<HTMLInputElement>document.getElementById('div-username')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-email')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-pswd')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('div-repeat-pswd')).classList.contains('invalid-input')).toBeFalse();
  });
});
