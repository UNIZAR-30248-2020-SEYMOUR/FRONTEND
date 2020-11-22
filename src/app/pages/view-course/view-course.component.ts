import { Component, OnInit } from '@angular/core';
import {Course, Video} from '../../interfaces';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})

/**
 * This class content the logic of the ViewCourseComponent component
 */
export class ViewCourseComponent implements OnInit {
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
        description: ''
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
    const observer = this.courseService.getVideos(this.course.id, this.videos.length, (this.videos.length + this.NUM_GET_VIDEOS));
    observer.subscribe(
      data => this.showVideos(data.videos),
      error => {
        console.log(error.status);
      }
    );
  }

  openCreateVideoPopup() {

  }

  openEditCoursePopup() {

  }

  /**
   * Add new videos to show in the GUI
   * @param videos: list of videos to add
   * @private
   */
  private showVideos(videos: Array<Video>) {
    if (videos.length < this.NUM_GET_VIDEOS) {
      this.moreVideos = false;
    }
    videos.forEach(video => this.videos.push(video));
    this.moreVideos = true;
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
