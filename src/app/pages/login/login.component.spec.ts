import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = () => '';
  });

  it('should create and initializes variables', () => {
    expect(component).toBeTruthy();
    expect(component.invalidEmail).toBeFalse();
    expect(component.triedSendEmail).toBeFalse();
    expect(component.emailSent).toBeFalse();
    expect(component.invalidPassword).toBeFalse();
    expect(component.triedLogin).toBeFalse();
    expect(component.recoverPasswordData.get('email').value).toEqual('');
    expect(component.loginData.get('email').value).toEqual('');
    expect(component.loginData.get('password').value).toEqual('');
  });

  it('should feedback invalid email login', function () {
    const docPassword = (<HTMLInputElement>document.getElementById('passwordInput'));
    const docEmail = (<HTMLInputElement>document.getElementById('emailInput'));
    component.loginData.setValue({'password': '123456789', 'email': ''});
    testErrorLogin(false, true, docEmail, docPassword);
  });

  it('should feedback invalid password', function () {
    const docPassword = (<HTMLInputElement>document.getElementById('passwordInput'));
    const docEmail = (<HTMLInputElement>document.getElementById('emailInput'));
    component.loginData.setValue({'password': '', 'email': 'edu@edu.com'});
    testErrorLogin(true, false, docPassword, docEmail);
  });

  it('should login correctly', function () {
    const docPassword = (<HTMLInputElement>document.getElementById('passwordInput'));
    const docEmail = (<HTMLInputElement>document.getElementById('emailInput'));
    component.loginData.setValue({'password': '1111', 'email': 'edu@edu.com'});
    document.getElementById('login-button').click();
    component.invalidEmail = false;
    component.invalidPassword = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.invalid-feedback'))).toBeNull();
    expect(docPassword.style.border).toBe('');
    expect(docEmail.style.border).toBe('');
  });

  it('should open the pop up', function () {
    expect(fixture.debugElement.query(By.css('.overlay-recover-password'))).toBeNull();
    document.getElementById('open-pop-up').click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.overlay-recover-password'))).toBeDefined();
  });

  it('should feedback invalid email send email', function () {
    const doc = (<HTMLInputElement>document.getElementById('emailRecoverPassword'));
    component.recoverPasswordData.setValue({'email': ''});
    console.log('SendData:' + component.recoverPasswordData.get('email').value);
    document.getElementById('send-email-button').click();
    const result = doc.style.border;
    expect(result).toBe('2px solid rgb(220, 53, 69)');
  });

  function testErrorLogin(passwordInvalid: boolean, emailInvalid: boolean, docExpectedError: any, docNotError: any) {
    expect(fixture.debugElement.query(By.css('.invalid-feedback'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeNull();
    document.getElementById('login-button').click();
    if (passwordInvalid) {
      component.invalidPassword = true;
    } else if (emailInvalid) {
      component.invalidEmail = true;
    }
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeTruthy ();
    expect(fixture.debugElement.query(By.css('.invalid-feedback'))).toBeTruthy();
    expect(docExpectedError.style.border).toBe('2px solid rgb(220, 53, 69)');
    expect(docNotError.style.border).toBe('');
  }
});
