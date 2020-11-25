import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VideosService} from '../../services/videos.service';
import {Course, Video} from '../../interfaces';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})

/**
 * This class manages de view-course page.
 */
export class ViewCourseComponent implements OnInit {
  NUM_GET_VIDEOS = 10;

  files = [];
  uploadVideoForm: FormGroup;
  videoId: number;
  courseId: number;
  loadedVideo: boolean;
  visibleVideoPopUp: boolean;
  loadVideoError: boolean;
  descriptionError: boolean;
  titleError: boolean;
  detailsError: boolean;

  course: Course;
  videos: Array<Video>;
  moreVideos: boolean;

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private videoService: VideosService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.course = {
        id: params.courseId,
        coursename: '',
        category:  {name: '', imageUrl: ''},
        description: ''
      };
    });

    this.videos = [];
    this.moreVideos = true;
    this.getCourseData();
    this.getMoreVideos();

    this.uploadVideoForm = this.formBuilder.group({
      video: [''],
      title: new FormControl('', [Validators.required ]),
      description: new FormControl('', [Validators.required])
    });
    this.courseId = -1;
    this.videoId = -1;

    this.loadedVideo = false;
    this.visibleVideoPopUp = false;
    this.loadVideoError = false;
    this.titleError = false;
    this.descriptionError = false;
    this.detailsError = false;

    this.uploadVideoForm.controls['title'].disable();
    this.uploadVideoForm.controls['description'].disable();

  }

  ngOnInit(): void {

  }

  /**
   * This method get videos of the course that is showing
   */
  getMoreVideos() {
    const observer = this.courseService.getVideos(this.course.id, this.videos.length, (this.videos.length + this.NUM_GET_VIDEOS));
    observer.subscribe(
      data => {
        this.showVideos(data);
      },
      error => {
        console.log(error.status);
      }
    );
  }

  openEditCoursePopup() {

  }

  /**
   * Load the form with the loaded file.
   * @param event
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
    if (this.uploadVideoForm.valid && this.course.id !== -1 && this.videoId !== -1 && this.loadedVideo === true) {
      const details = {
        course: this.course.id,
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
        (error: HttpErrorResponse) => {
          this.detailsError = true;
        }
      );
    }
    this.titleError = this.uploadVideoForm.controls['title'].errors?.required;
    this.descriptionError = this.uploadVideoForm.controls['description'].errors?.required;
    const titleInput = document.getElementById('div-title');
    if (this.titleError) {
      titleInput.classList.add('invalid-input');
    } else {
      titleInput.classList.remove('invalid-input');
    }

    if (this.descriptionError) {
      document.getElementById('div-description').classList.add('invalid-input');
    } else {
      document.getElementById('div-description').classList.remove('invalid-input');
    }
  }

  /**
   * Close the create video popup.
   */
  closeCreateVideoPopUp() {
    this.visibleVideoPopUp = false;
    this.getMoreVideos();
  }

  /**
   * Open the create video popup
   */
  openCreateVideoPopUp() {
    this.visibleVideoPopUp = true;
  }

  /**
   * Add new videos to show in the GUI
   * @param videos: list of videos to add
   * @private
   */
  private showVideos(videos: Array<Video>) {
    this.moreVideos = videos.length >= this.NUM_GET_VIDEOS;
    videos.forEach(video => this.videos.push(video));
  }

  /**
   * Get the information of the course
   * @private
   */
  private getCourseData() {
    const observer = this.courseService.getCourseData(this.course.id);
    observer.subscribe(
      data => {this.course = {
        id: this.course.id,
        coursename: data.name,
        description: data.description,
        category: data.category
      }; },
      error => {console.log(error.status); }
    );
  }
}
