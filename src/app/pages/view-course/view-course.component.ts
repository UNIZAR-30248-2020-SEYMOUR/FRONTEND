import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VideosService} from '../../services/videos.service';
import {Category, Course, Video} from '../../interfaces';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';

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
  updateCourseForm: FormGroup;
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
  popupUpdateCourseVisible: boolean;
  tryingUpdateCourse: boolean;
  errorUpdateCourseBackend: boolean;
  categories: Array<Category>;

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private videoService: VideosService,
              private categoriesService: CategoriesService,
              private router: ActivatedRoute,
              private route: Router) {
    this.router.params.subscribe(params => {
        this.course = {
          id: params.courseId,
          coursename: '',
          category:  {name: '', imageUrl: ''},
          description: ''
        };
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
    this.loadCategories();
    this.getMoreVideos();

    this.initForms();

    this.courseId = -1;
    this.initVariables();

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

  /**
   * Open the update pop up
   */
  openUpdateCoursePopup() {
    this.popupUpdateCourseVisible = true;
  }
  /**
   * Close the update pop up and put the initial values to the variables and inputs.
   */
  closeUpdateCoursePopUp() {
    this.updateCourseForm.get('courseName').setValue('');
    this.updateCourseForm.get('courseDescription').setValue('');
    this.popupUpdateCourseVisible = false;
    this.tryingUpdateCourse = false;
    this.errorUpdateCourseBackend = false;
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
    this.uploadVideoForm.reset();
    this.uploadVideoForm.get('title').setValue('');
    this.uploadVideoForm.get('description').setValue('');
    this.uploadVideoForm.get('title').disable();
    this.uploadVideoForm.get('description').disable();
    (<HTMLInputElement> document.getElementById('file')).value = '';
    this.loadedVideo = false;
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
   * This method initialize and set the validation rules to the forms
   * @private
   */
  private initForms() {
    this.uploadVideoForm = this.formBuilder.group({
      video: [''],
      title: new FormControl('', [Validators.required ]),
      description: new FormControl('', [Validators.required])
    });
    this.updateCourseForm = new FormGroup({
      'courseName': new FormControl('', [Validators.required]),
      'courseDescription': new FormControl(''),
      'courseCategory': new FormControl('' , [Validators.required])
    });
  }

  /**
   * Init de global variables.
   */
  initVariables() {
    this.videoId = -1;
    this.loadedVideo = false;
    this.visibleVideoPopUp = false;
    this.popupUpdateCourseVisible = false;
    this.tryingUpdateCourse = false;
    this.errorUpdateCourseBackend = false;
    this.loadVideoError = false;
    this.titleError = false;
    this.descriptionError = false;
    this.detailsError = false;
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

  /**
   * This method get the categories information from the backend server.
   * @private
   */
  private loadCategories() {
    const observer = this.categoriesService.getCategories();
    observer.subscribe(
      data => { this.categories = data; },
      (error: HttpErrorResponse) => {console.log(error.status); this.dealNotUser(error.error); }
    );
  }

  /**
   * This method handles the errors from the backend requests
   * @param error: error message received from the backend
   * @private
   */
  private dealNotUser(error: JSON) {
    if (error['error'] === 'User does not exist') {
      this.route.navigate(['/login']);
    }
  }

  /**
   * This method update the course entered in the form.
   */
  updateCourse() {
    this.tryingUpdateCourse = true;
    if (this.updateCourseFormValid()) {
      const combo = (<HTMLSelectElement>document.getElementById('combo-categories'));
      const strUser = combo.options[combo.selectedIndex].text;
      const auxCourse = {
        id: this.course.id,
        coursename: this.updateCourseForm.get('courseName').value,
        description: this.updateCourseForm.get('courseDescription').value,
        category: {name: strUser, imageUrl: ''}
      };
      this.backendUpdateCourse(auxCourse);
    }
  }

  /**
   * This function verify if the update course is valid.
   * In case it is valid return true. In case it isn't valid show the error and return false
   * @private
   */
  private updateCourseFormValid(): boolean {
    let valid = true;
    if (this.updateCourseForm.get('courseName').value === '') {
      const courseNameInput = document.getElementById('input-course-name');
      courseNameInput.classList.remove('invalid-input');
      courseNameInput.classList.add('invalid-input');
      valid = false;
    }
    if (this.updateCourseForm.get('courseCategory').value === '') {
      const courseNameInput = document.getElementById('combo-categories');
      courseNameInput.classList.remove('invalid-input');
      courseNameInput.classList.add('invalid-input');
      valid = false;
    }
    return valid;
  }

  /**
   * This method send a update course petition to the backend server.
   * @param auxCourse course to update
   * @private
   */
  private backendUpdateCourse(auxCourse: Course) {
    const observer = this.courseService.updateCourse(auxCourse);
    observer.subscribe(
      data => {  this.course.description = data.description;
                      this.course.coursename = data.coursename;
                      this.course.category.name = data.name;
                      this.course.category.imageUrl = data.imageUrl;
                      this.closeUpdateCoursePopUp(); },
      error => { console.log(error.status); this.errorUpdateCourseBackend = true; }
    );
  }
}
