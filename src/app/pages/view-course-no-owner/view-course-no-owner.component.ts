import { Component, OnInit } from '@angular/core';
import {Course, Video} from '../../interfaces';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {manageGenericError} from "../error/error.component";

@Component({
  selector: 'app-view-course-no-owner',
  templateUrl: './view-course-no-owner.component.html',
  styleUrls: ['./view-course-no-owner.component.scss']
})

/**
 * This class content the logic of the ViewCourseNoOwnerComponent component
 */
export class ViewCourseNoOwnerComponent implements OnInit {

  NUM_GET_VIDEOS = 10;

  course: Course;
  videos: Array<Video>;
  moreVideos: boolean;
  subscribed: boolean;
  isYourCourse: boolean;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router,
              private cookies: CookieService) {
    const sub = this.route.params.subscribe(params => {
      this.course = {
        id: params.courseId,
        coursename: '',
        category:  {name: '', imageUrl: ''},
        description: '',
        rate: 0,
        ownername: ''
      };
    });
    this.checkSubscribed(this.course.id);
    this.videos = [];
    this.moreVideos = true;
    this.getCourseData();
    this.getMoreVideos();
  }

  ngOnInit(): void {

  }

  /**
   * This method get videos of the course that is showing
   */
  getMoreVideos() {
    let numVideos;
    if (this.videos.length == 0) {
      numVideos = 1;
    } else {
      numVideos = this.videos.length + 1;
    }
    const observer = this.courseService.getVideos(this.course.id,
      numVideos,
      (this.videos.length + this.NUM_GET_VIDEOS));
    observer.subscribe(
      data => {
        this.showVideos(data);
      },
      error => {
        console.log(error.status);
        manageGenericError(error, this.router);
      }
    );
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
      data => {
        this.course = {
        id: this.course.id,
        coursename: data.name,
        description: data.description,
        category: data.category,
        rate: data.rate,
        ownername: data.ownername
      };
        this.isYourCourse = this.course.ownername === this.cookies.get('username');
      },
      error => {console.log(error.status);
        manageGenericError(error, this.router);
      }
    );
  }

  /**
   * This function subscribes a user to a course.
   */
  subscribeToCourse(){
    const observer = this.courseService.subscribe(this.course.id);
    observer.subscribe(
      data => {
        this.subscribed = true;
      },
      error => {console.log(error.status);
        this.subscribed = false;
        manageGenericError(error, this.router);
      }
    );
  }

  /**
   * This function unsubscribes a user to a course
   */
  unsubscribeToCourse(){
    const observer = this.courseService.unsubscribe(this.course.id);
    observer.subscribe(
      data => {
        this.subscribed = false;
      },
      error => {console.log(error.status);
        this.subscribed = true;
        manageGenericError(error, this.router);
      }
    );
  }

  /**
   * This function checks if a user is subscribed to a course.
   * @param id Identification of the course which you want to check the subscription.
   */
  checkSubscribed(id: number){
    const observer = this.courseService.checkSubscribed(id);
    observer.subscribe(
      data => {
        this.subscribed = false;
      },
      error => {console.log(error.status);
        this.subscribed = true;
      }
    );
  }
}
