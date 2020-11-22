import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ UserProfileComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component in correctly loaded.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable and disable the update profile form', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    testDisableUpdateProfile();
  });

  it('should feedback invalid username because is empty', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeFalsy();
    expect((<HTMLInputElement>document.getElementById('input-username')).classList.contains('invalid-input')).toBeFalse();
    component.updateForm.get('username').setValue('');
    component.updateForm.get('email').setValue('test@test.com');
    component.updateForm.get('description').setValue('');
    document.getElementById('btn-update').click();
    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById('input-username')).classList.contains('invalid-input')).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeTruthy ();
  });

  it('should feedback invalid username because is short', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeFalsy();
    expect((<HTMLInputElement>document.getElementById('input-username')).classList.contains('invalid-input')).toBeFalse();
    component.updateForm.get('username').setValue('tes');
    component.updateForm.get('email').setValue('test@test.com');
    component.updateForm.get('description').setValue('');
    document.getElementById('btn-update').click();
    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById('input-username')).classList.contains('invalid-input')).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeTruthy ();
  });

  it('should feedback invalid username because is long', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    component.updateForm.get('username').setValue('testtesttesttesttesttesttesttesttesttesttest');
    component.updateForm.get('email').setValue('test@test.com');
    component.updateForm.get('description').setValue('');
    document.getElementById('btn-update').click();
    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById('input-username')).classList.contains('invalid-input')).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeTruthy ();
  });

  it('should feedback invalid email because is empty', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    component.updateForm.get('username').setValue('testOne');
    component.updateForm.get('email').setValue('');
    component.updateForm.get('description').setValue('');
    document.getElementById('btn-update').click();
    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById('input-email')).classList.contains('invalid-input')).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeTruthy ();
  });

  it('should feedback error to update because backend response error', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    component.updateForm.get('username').setValue('testOne');
    component.updateForm.get('email').setValue('test@test.com');
    component.updateForm.get('description').setValue('');
    document.getElementById('btn-update').click();
    component.updateError = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeTruthy ();
  });

  it('should feedback success to update', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    component.updateForm.get('username').setValue('testOne');
    component.updateForm.get('email').setValue('test@test.com');
    component.updateForm.get('description').setValue('');
    document.getElementById('btn-update').click();
    component.updateError = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.valid-backend-response'))).toBeTruthy ();
  });

  it('should open and close the delete profile pop up', () => {
    expect(document.getElementById('delete-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-delete-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-pop-up').hidden).toBeFalse();
    document.getElementById('btn-close-delete-pop-up').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-pop-up').hidden).toBeTrue();
  });

  it('should show an error message when trying to delete the profile', () => {
    expect(document.getElementById('delete-pop-up').hidden).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeFalsy();
    document.getElementById('btn-open-delete-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-pop-up').hidden).toBeFalse();
    document.getElementById('btn-delete').click();
    component.deleteError = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeTruthy();
  });

  it('should cancel the deletion of the profile', () => {
    expect(document.getElementById('delete-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-delete-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-pop-up').hidden).toBeFalse();
    document.getElementById('btn-cancel-delete').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-pop-up').hidden).toBeTrue();
  });

  it('should open and close the new course pop up', () => {
    expect(document.getElementById('new-course-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-new-course').click();
    fixture.detectChanges();
    expect(document.getElementById('new-course-pop-up').hidden).toBeFalse();
    document.getElementById('btn-close-new-course').click();
    fixture.detectChanges();
    expect(document.getElementById('new-course-pop-up').hidden).toBeTrue();
  });

  it('should feedback invalid course name  because is empty', () => {
    expect(document.getElementById('new-course-pop-up').hidden).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeFalsy();
    document.getElementById('btn-open-new-course').click();
    fixture.detectChanges();
    expect(document.getElementById('new-course-pop-up').hidden).toBeFalse();
    component.createCourseForm.get('courseName').setValue('');
    component.createCourseForm.get('courseDescription').setValue('testing');
    component.createCourseForm.get('courseCategory').setValue({name: 'Otro', imageUrl: ''});
    document.getElementById('btn-create-course').click();
    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById('div-courseName')).classList.contains('invalid-input')).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeTruthy ();
  });

  it('should feedback invalid course category  because is not select', () => {
    expect(document.getElementById('new-course-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-new-course').click();
    fixture.detectChanges();
    expect(document.getElementById('new-course-pop-up').hidden).toBeFalse();
    component.createCourseForm.get('courseName').setValue('testing');
    component.createCourseForm.get('courseDescription').setValue('testing');
    document.getElementById('btn-create-course').click();
    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById('div-courseCategory')).classList.contains('invalid-input')).toBeTrue();
  });

  function testEnableUpdateProfile() {
    document.getElementById('btn-enable-update').click();
    fixture.detectChanges();
    expect(document.getElementById('btn-update').hidden).toBeFalse();
    expect(document.getElementById('btn-cancel-update').hidden).toBeFalse();
    expect(component.updateForm.get('username').disabled).toBeFalse();
    expect(component.updateForm.get('email').disabled).toBeFalse();
    expect(component.updateForm.get('description').disabled).toBeFalse();
  }

  function testDisableUpdateProfile() {
    expect(document.getElementById('btn-update').hidden).toBeFalse();
    expect(document.getElementById('btn-cancel-update').hidden).toBeFalse();
    expect(component.updateForm.get('username').disabled).toBeFalse();
    expect(component.updateForm.get('email').disabled).toBeFalse();
    expect(component.updateForm.get('description').disabled).toBeFalse();
    document.getElementById('btn-cancel-update').click();
    fixture.detectChanges();
    expect(document.getElementById('btn-update').hidden).toBeTrue();
    expect(document.getElementById('btn-cancel-update').hidden).toBeTrue();
    expect(component.updateForm.get('username').disabled).toBeTrue();
    expect(component.updateForm.get('email').disabled).toBeTrue();
    expect(component.updateForm.get('description').disabled).toBeTrue();
  }

  function testCorrectStartState() {
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.valid-backend-response'))).toBeFalsy();
    expect(document.getElementById('btn-update').hidden).toBeTrue();
    expect(document.getElementById('btn-cancel-update').hidden).toBeTrue();
    expect(component.updateForm.get('username').disabled).toBeTrue();
    expect(component.updateForm.get('email').disabled).toBeTrue();
    expect(component.updateForm.get('description').disabled).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-input'))).toBeFalsy();
    expect((<HTMLInputElement>document.getElementById('input-email')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('input-username')).classList.contains('invalid-input')).toBeFalse();
    expect((<HTMLInputElement>document.getElementById('input-description')).classList.contains('invalid-input')).toBeFalse();
  }
});
