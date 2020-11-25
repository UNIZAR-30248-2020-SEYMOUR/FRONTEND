import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseComponent } from './view-course.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';


describe('ViewCourseComponent', () => {
  let component: ViewCourseComponent;
  let fixture: ComponentFixture<ViewCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ ViewCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test that show and hide the upload video pop up
   */
  it('should open and close the open video pop up', () => {
    expect(document.getElementById('upload-video-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-create-video').click();
    fixture.detectChanges();
    expect(document.getElementById('upload-video-pop-up').hidden).toBeFalse();
    document.getElementById('btn-close-upload-video').click();
    fixture.detectChanges();
    expect(document.getElementById('upload-video-pop-up').hidden).toBeTrue();
  });

  /**
   * Tests that an error feedback is displayed if the description fields are empty
   */
  it('should show a error feedback in the title and descrition inputs', () => {
    expect(document.getElementById('upload-video-pop-up').hidden).toBeTrue();
    document.getElementById('btn-open-create-video').click();
    const btSendDetails  = (<HTMLInputElement>document.getElementById('btn-send-details'));

    /* Enable components which would be enabled after the upload video response to verify the input feedback */
    component.uploadVideoForm.get('description').setValue('');
    component.uploadVideoForm.controls['title'].enable();
    component.uploadVideoForm.controls['description'].enable();
    btSendDetails.disabled = false;
    fixture.detectChanges();
    btSendDetails.click();

    fixture.detectChanges();
    expect((<HTMLInputElement>document.getElementById('div-title')).classList.contains('invalid-input')).toBeTrue();
    expect((<HTMLInputElement>document.getElementById('div-description')).classList.contains('invalid-input')).toBeTrue();

    fixture.detectChanges();

  });
});
