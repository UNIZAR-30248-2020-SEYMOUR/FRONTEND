import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Category} from '../../interfaces';

/**
 * Test the correct function of the component UserProfile
 */
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

  /**
   * Tests the correct functioning of enabling and disabling the update profile form
   */
  it('should enable and disable the update profile form', () => {
    testCorrectStartState();
    testEnableUpdateProfile();
    testDisableUpdateProfile();
  });

  /**
   * Test that show a message error if the username is empty when the user try to update profile
   */
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

  /**
   * Test that show a message error if the username isn't enough long when the user try to update profile
   */
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

  /**
   * Test that show a message error if the username is too long when the user try to update profile
   */
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

  /**
   * Test that show a message error if the email is empty when the user try to update profile
   */
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

  /**
   * Test that show a message error if the backend response is a error message when the user try to update profile
   */
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

  /**
   * Test that show a success message when the profile is updated
   */
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

  /**
   * Test that show and hide the delete profile pop up
   */
  it('should open and close the delete profile pop up', () => {
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-delete-profile-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeFalse();
    document.getElementById('btn-close-delete-profile-pop-up').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeTrue();
  });

  /**
   * Tests the correct functioning of cancel the deletion of a course
   */
  it('should cancel the deletion of the course', () => {
    expect(document.getElementById('delete-course-pop-up').hidden).toBeTrue();
    component.user.courses = [{ id: 1, coursename: 'testCourse', description: 'test', category: { name: 'Desarrollo personal', imageUrl: 'assets/img/categories/desarrolloPersonal.jpg' }}];
    fixture.detectChanges();
    document.getElementById('btn-open-delete-course-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-course-pop-up').hidden).toBeFalse();
    document.getElementById('btn-cancel-delete-course').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-course-pop-up').hidden).toBeTrue();
  });

  /**
   * Test that show an error message if the backend response is a error message when the user try to delete a profile
   */
  it('should show an error message when trying to delete the profile', () => {
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeTrue();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeFalsy();
    document.getElementById('btn-open-delete-profile-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeFalse();
    document.getElementById('btn-delete').click();
    component.deleteProfileError = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.invalid-backend-response'))).toBeTruthy();
  });

  /**
   * Tests the correct functioning of cancel the deleted of a profile
   */
  it('should cancel the deletion of the profile', () => {
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-delete-profile-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeFalse();
    document.getElementById('btn-cancel-delete-profile').click();
    fixture.detectChanges();
    expect(document.getElementById('delete-profile-pop-up').hidden).toBeTrue();
  });

  /**
   * Test that show and hide the new course pop up
   */
  it('should open and close the new course pop up', () => {
    expect(document.getElementById('new-course-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-new-course').click();
    fixture.detectChanges();
    expect(document.getElementById('new-course-pop-up').hidden).toBeFalse();
    document.getElementById('btn-close-new-course').click();
    fixture.detectChanges();
    expect(document.getElementById('new-course-pop-up').hidden).toBeTrue();
  });

  /**
   * Test that show a message error if the course name is empty when the user try to create a new course
   */
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

  /**
   * Test that show a message error if the course category is not select when the user try to create a new course
   */
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

  /**
   * Test the correct functioning when enable the update profile form
   */
  function testEnableUpdateProfile() {
    document.getElementById('btn-enable-update').click();
    fixture.detectChanges();
    expect(document.getElementById('btn-update').hidden).toBeFalse();
    expect(document.getElementById('btn-cancel-update').hidden).toBeFalse();
    expect(component.updateForm.get('username').disabled).toBeFalse();
    expect(component.updateForm.get('email').disabled).toBeFalse();
    expect(component.updateForm.get('description').disabled).toBeFalse();
  }

  /**
   * Test the correct functioning when disable the update profile form
   */
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

  /**
   * Test that initial state of the GUI is correct
   */
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
