import { Component, OnInit } from '@angular/core';
import {Course, Video} from '../../interfaces';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private courseService: CourseService, private route: ActivatedRoute) {
    const sub = this.route.params.subscribe(params => {
      this.course = {
        id: params.courseId,
        coursename: '',
        category:  {name: '', imageUrl: ''},
        description: '',
        rate: 0
      };
    });

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
      }
    );
  }

  /**
   * Add new videos to show in the GUI
   * @param videos: list of videos to add
   * @private
   */
  private showVideos(videos: Array<Video>) {
    if (videos.length < this.NUM_GET_VIDEOS) {
      this.moreVideos = false;
    } else {
      this.moreVideos = true;
    }
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
        rate: data.rate
      }; },
      error => {console.log(error.status); }
    );
  }

}
