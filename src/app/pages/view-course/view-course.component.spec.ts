import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseComponent } from './view-course.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Video} from '../../interfaces';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

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
  /**
   * Verifies that the component in correctly loaded.
   */
   it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test that show correctly the option get more videos
   */
  it('should show the button that get more videos', () => {
    expect(document.getElementById('btn-get-videos').hidden).toBeFalse();
    component.moreVideos = true;
    fixture.detectChanges();
    expect(document.getElementById('btn-get-videos').hidden).toBeFalse();
  });

  /**
   * Test that the button get more videos is not showing
   */
  it('should not show the button that get more videos', () => {
    expect(document.getElementById('btn-get-videos').hidden).toBeFalse();
    component.moreVideos = false;
    fixture.detectChanges();
    expect(document.getElementById('btn-get-videos').hidden).toBeTrue();
  });

  /**
   * Test that show a message error if the coursename is empty when the user try to update course
   */
  it('should ',  () => {
    openUpdateCoursePopUp();

  });


  function openUpdateCoursePopUp() {
    document.getElementById('btn-open-edit-popup').click();
    fixture.detectChanges();
    expect(document.getElementById('update-course-pop-up').hidden).toBeFalse();
  }

  function closeUpdateCoursePopUp() {
    document.getElementById('btn-close-update-course').click();
    fixture.detectChanges();
    expect(document.getElementById('update-course-pop-up').hidden).toBeTrue();
  }

  function createVideos(numVideos: number): Array<Video> {
     const videos: Array<Video> = [];
     for (let i = 0; i < numVideos; i++) {
       videos.push({id: i, name: i.toString(), description: i.toString(), videoUrl: i.toString()});
     }
     return videos;
   }
});
