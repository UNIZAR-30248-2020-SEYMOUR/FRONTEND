import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VideosService} from '../../services/videos.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})

/**
 * This class manages de view-course page.
 */
export class ViewCourseComponent implements OnInit {

  files = [];
  uploadVideoForm: FormGroup;
  videoDetailsForm: FormGroup;
  videoId: number;
  courseId: number;
  loadedVideo: boolean;
  visibleVideoPopUp: boolean;
  loadVideoError: boolean;
  descriptionError: boolean;
  titleError: boolean;
  detailsError: boolean;

  constructor(private videoService: VideosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.uploadVideoForm = this.formBuilder.group({
        video: [''],
        title: new FormControl('', [Validators.required ]),
        description: new FormControl('', [Validators.required])
      });
      this.courseId = -1;
      this.videoId = -1;

      this.loadedVideo = false;
      this.visibleVideoPopUp = true;
      this.loadVideoError = false;
      this.titleError = false;
      this.descriptionError = false;
      this.detailsError = false;

      this.uploadVideoForm.controls['title'].disable();
      this.uploadVideoForm.controls['description'].disable();
      /* TODO CHANGE THIS WITH THE REAL COURSE ID */
      this.courseId = 2;
  }

  /**
   * Load the form with the loaded file.
   * @param UI event with the file selection
   */
  loadVideo(event) {
   if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadVideoForm.get('video').setValue(file);
      this.loadVideoError = false;
    } else {
      this.loadVideoError = true;
   }
  }

  /**
   * Send the file loaded in the form to the backend
   */
  sendVideo() {
    if (this.uploadVideoForm.get('video').value !== '') {
      const formData = new FormData();
      formData.append('video', this.uploadVideoForm.get('video').value);

      const observer = this.videoService.uploadVideo(formData);
      observer.subscribe(
        data => {
          this.videoId = data;
          this.loadedVideo = true;
          this.loadVideoError = false;
          this.uploadVideoForm.controls['title'].enable();
          this.uploadVideoForm.controls['description'].enable();
        },
        (error: HttpErrorResponse) => {
          this.loadedVideo = false;
          this.loadVideoError = true;
          this.uploadVideoForm.controls['title'].disable();
          this.uploadVideoForm.controls['description'].disable();
        }
      );
    } else {
      this.loadVideoError = true;
    }
  }

  /**
   * Send the video details to the backend
   */
  sendDetails() {
    if (this.uploadVideoForm.valid && this.courseId !== -1 && this.videoId !== -1 && this.loadedVideo === true) {
      const details = {
        course: this.courseId,
        video: this.videoId,
        title: this.uploadVideoForm.get('title').value,
        description: this.uploadVideoForm.get('description').value,
      };
      const observer = this.videoService.sendDetails(details);
      observer.subscribe(
        data => {
          this.closeCreateVideoPopUp();
          this.detailsError = false;
        },
        (error: HttpErrorResponse) => { /* TODO TERMINAR ESTO */
          this.detailsError = true;
        }
      );
    }
    this.titleError = this.uploadVideoForm.controls['title'].errors?.required;
    this.descriptionError = this.uploadVideoForm.controls['description'].errors?.required;
  }

  /**
   * Close the create video popup.
   */
  closeCreateVideoPopUp() {
    this.visibleVideoPopUp = false;
  }

  /**
   * Open the create video popup
   */
  openCreateVideoPopUp() {
    this.visibleVideoPopUp = true;
  }
}
