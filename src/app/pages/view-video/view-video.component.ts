import { Component, OnInit } from '@angular/core';
import {Commentary, Course, Video} from '../../interfaces';
import {CourseService} from '../../services/course.service';
import {VideosService} from '../../services/videos.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss']
})

/**
 * This class content the logic of the ViewVideo component
 */
export class ViewVideoComponent implements OnInit {
  // private apiUrl = 'http://oc2.danielhuici.ml/';
  private apiUrl = 'http://localhost:3000/';
  // private apiUrl = 'http://91.250.180.41:3000/';

  NUM_GET_VIDEOS = 10;

  currentVideoObtained: boolean;
  owner: String;
  rate: number;
  video: Video;
  course: Course;
  videos: Array<Video>;
  comments: Array<Commentary>;
  moreVideos: boolean;
  tryingComment: boolean;
  commentForm: FormGroup;

  constructor(private courseService: CourseService,
              private videoService: VideosService,
              private accountService: AccountService,
              private route: ActivatedRoute) {
    this.initializeVariables();
    this.getParams();
    this.getVideoData();
    this.getCourseData();
    this.getMoreVideos();
  }

  ngOnInit(): void {
  }

  /**
   * This method initialize the variables of the class and set the validation rules to the forms
   * @private
   */
  private initializeVariables() {
    this.videos = [];
    this.comments = [];
    this.moreVideos = true;
    this.tryingComment = false;
    this.currentVideoObtained = false;
    this.owner = '';

    this.commentForm = new FormGroup({
      'comment' : new FormControl('', [ Validators.required])
    });
  }

  /**
   * Get the id of the video to show and the id of the course you belong to
   * @private
   */
  private getParams() {
    const sub = this.route.params.subscribe(params => {
      this.video = {
        id: params.videoId,
        name: '',
        description: '',
        videoUrl: '',
        imagePreview: '',
        rate: 0
      };

      this.course = {
        id: params.courseId,
        coursename: '',
        category:  {name: '', imageUrl: ''},
        description: '',
        rate: 0
      };
    });
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
      if (this.currentVideoObtained) {
        numVideos++;
      }
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
   * Add new videos to show in the GUI. This method doesn't add the video which is playing.
   * @param videos: list of videos to add
   * @private
   */
  private showVideos(videos: Array<Video>) {
    this.moreVideos = videos.length >= this.NUM_GET_VIDEOS;
    videos.forEach(video => {
      if (this.video.id != video.id) {
        this.videos.push(video);
      } else {
        this.currentVideoObtained = true;
      }
    });
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
          rate: 0
        };
      },
      error => {
        console.log(error.status);
      }
    );
  }

  /**
   * Get the information of the video to play
   * @private
   */
  private getVideoData() {
    const observer = this.videoService.getVideoData(this.video.id);
    observer.subscribe(
      data => {
        this.owner = data.owner;
        this.comments = data.comments;
        this.video = {
          id: this.video.id,
          name: data.title,
          description: data.description,
          videoUrl: this.apiUrl + data.location,
          imagePreview: data.imagePreview,
          rate: data.rate
        };
      },
      error => {console.log(error.status); }
    );
  }

  /**
   * This method verify if the comment is valid and if is valid send the comment do to the user
   */
  public comment() {
    const commentInput = document.getElementById('div-comment');
    this.tryingComment = true;
    if (this.commentForm.controls['comment'].valid) {
      const observer = this.videoService.comment(this.commentForm.get('comment').value, this.video.id);
      observer.subscribe(
        data => {this.tryingComment = false; this.comments = [];
        this.getVideoData();
        commentInput.classList.remove('invalid-input');
        },
        error => {console.log(error.status); }
      );
    } else {
      commentInput.classList.remove('invalid-input');
      commentInput.classList.add('invalid-input');
    }
  }

  setRatting(newRate: any) {


    const observer = this.videoService.addRatting(this.video.id, newRate);
    observer.subscribe(
      data => {
        this.video.rate = data.rate;
      },
      error => {console.log(error.status); }
    );
  }
}
