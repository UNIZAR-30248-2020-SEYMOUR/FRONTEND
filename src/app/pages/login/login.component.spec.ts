import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';

/**
 * Test the view of the component login
 */
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

  /**
   * Test the correct init of the component.
   */
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

  /**
   * Test the view when the email input is invalid because the input is empty.
   */
  it('should feedback invalid email login', function () {
    const docPassword = (<HTMLInputElement>document.getElementById('passwordInput'));
    const docEmail = (<HTMLInputElement>document.getElementById('emailInput'));
    component.loginData.setValue({'password': '123456789', 'email': ''});
    testErrorLogin(false, true, docEmail, docPassword);
  });

  /**
   * Test the view when the password input is invalid because the input is empty.
   */
  it('should feedback invalid password', function () {
    const docPassword = (<HTMLInputElement>document.getElementById('passwordInput'));
    const docEmail = (<HTMLInputElement>document.getElementById('emailInput'));
    component.loginData.setValue({'password': '', 'email': 'edu@edu.com'});
    testErrorLogin(true, false, docPassword, docEmail);
  });

  /**
   * Test the view when the login is correct.
   */
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


  /**
   * Test that the pop up is opened and closed correctly.
   */
  it('should open and close the pop up', function () {
    expect(fixture.debugElement.query(By.css('.overlay-recover-password'))).toBeNull();
    document.getElementById('open-pop-up').click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.overlay-recover-password'))).toBeDefined();
    document.getElementById('close-pop-up').click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.overlay-recover-password'))).toBeNull();
  });

  /**
   * Test the view when the email input of recover password is
   * invalid because the input is empty or the server detected that the email isn´t register.
   */
  it('should feedback invalid email send email', function () {
    const doc = (<HTMLInputElement>document.getElementById('emailRecoverPassword'));
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeNull();
    component.recoverPasswordData.setValue({'email': ''});
    document.getElementById('send-email-button').click();
    expect(doc.style.border).toBe('2px solid rgb(220, 53, 69)');
    component.recoverPasswordData.setValue({'email': 'test@test.com'});
    document.getElementById('send-email-button').click();
    component.invalidEmail = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeTruthy();
  });

  /**
   * Test the view when the email is sent correctly.
   */
  it('should feedback valid email send email', function () {
    const doc = (<HTMLInputElement>document.getElementById('emailRecoverPassword'));
    component.recoverPasswordData.setValue({'email': 'test@test.com'});
    expect(fixture.debugElement.query(By.css('.valid-backend-response'))).toBeNull();
    component.emailSent = true;
    component.triedSendEmail = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.valid-backend-response'))).toBeTruthy();
    const result = doc.style.border;
    expect(result).toBe('');
  });

  /**
   * Test that the login error messages show correctly
   * @param passwordInvalid: indicates if the input to test is the password input
   * @param emailInvalid: indicates if the input to test is the email input
   * @param docExpectedError: input that must show the error
   * @param docNotError: input that mustn't show the error
   */
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
