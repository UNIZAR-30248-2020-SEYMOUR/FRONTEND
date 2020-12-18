import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {RecoverPasswordComponent} from './recover-password.component';
import {invalid} from '@angular/compiler/src/render3/view/util';

/**
 * Test the view of the component recover-password
 */
describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ RecoverPasswordComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = () => '';
  });

  /**
   * Test the correct init of the component.
   */
  it('should create and initialize variables', function () {
    expect(component).toBeTruthy();
    expect(component.invalidToken).toBeFalse();
    expect(component.invalidPassword).toBeFalse();
    expect(component.invalidRepeatPassword).toBeFalse();
    expect(component.triedChange).toBeFalse();
    expect(component.changePasswordData.get('password').value).toEqual('');
    expect(component.changePasswordData.get('repeatPassword').value).toEqual('');
  });

  /**
   * Test the correct view when the password is changed
   */
  it('should change the password', function () {
    const docPassword = (<HTMLInputElement>document.getElementById('passwordInput'));
    const docRepeatPassword = (<HTMLInputElement>document.getElementById('repeatPasswordInput'));
    component.changePasswordData.setValue({'password' : '12345678', 'repeatPassword' : '12345678'});
    document.getElementById('change-password-button').click();
    component.invalidToken = false;
    expect(docPassword.style.border).toBe('');
    expect(docRepeatPassword.style.border).toBe('');
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.invalid-feedback'))).toBeNull();
  });

  /**
   * Test the view when the input password is invalid because the input is empty
   *  or the password is shorter than the minimum permitted
   */
  it('should show error message for invalid password', function () {
    const docPassword = (<HTMLInputElement>document.getElementById('passwordInput'));
    component.changePasswordData.setValue({'password' : '', 'repeatPassword' : '12345678'});
    testShowErrorInvalidInput(docPassword);
    component.changePasswordData.setValue({'password' : '12345', 'repeatPassword' : '12345678'});
    testShowErrorInvalidInput(docPassword);
  });

  /**
   * Test the view when the input repeat password is invalid because the input is empty
   *  or the password is different to repeat password
   */
  it('should show error message for invalid repeat password', function () {
    const docRepeatPassword = (<HTMLInputElement>document.getElementById('repeatPasswordInput'));
    component.changePasswordData.setValue({'password' : '12345678', 'repeatPassword' : ''});
    testShowErrorInvalidInput(docRepeatPassword);
    component.changePasswordData.setValue({'password' : '12345678', 'repeatPassword' : '12345978'});
    testShowErrorInvalidInput(docRepeatPassword);
  });

  /**
   * Test the view when the server response is that the token of validation is invalid
   */
  it('should show error message for invalid token', function () {
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeNull();
    document.getElementById('change-password-button').click();
    component.invalidToken = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeTruthy();
  });

  /**
   * Test that the messages of error is showing correctly
   * @param doc: the input element that must show the error
   */
  function testShowErrorInvalidInput(doc: any) {
    document.getElementById('change-password-button').click();
    fixture.detectChanges();
    expect(doc.style.border).toBe('2px solid rgb(220, 53, 69)');
    expect(fixture.debugElement.query(By.css('.invalid-feedback'))).toBeTruthy();
  }
});
