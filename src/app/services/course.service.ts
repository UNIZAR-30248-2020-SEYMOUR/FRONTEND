import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Course} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

// private apiUrl = 'http://oc2.danielhuici.ml/';
  private apiUrl = 'http://localhost:3000/courses';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  /**
   * Save a course in the backend
   @return Observable that receive the response of the server
   */
  saveCourse(course: Course): Observable<any> {
    const json = {
      owner: this.cookie.get('uuid'),
      coursename: course.coursename,
      description: course.description,
      category: course.category.name
    };
    const params = JSON.stringify(json);
    return this.http.post(this.apiUrl + '/create_course', params, this.httpOptions);
  }

  /**
   * This function get the data of the course
   * @param id: id of the course that the function get the data.
   */
  getCourseData(id: number): Observable<any> {
    const json = {
      id: id
    };
    return this.http.post(this.apiUrl + '/get_info', JSON.stringify(json), this.httpOptions);
  }

  /**
   * Get the next 10 videos of the course
   * @param courseId: id of the course to request the videos
   * @param lastVideo: number of the last video get from the course
   * @param firstVideo: number of the last video that the GUI have
   */
  getVideos(courseId: number, firstVideo: number, lastVideo: number): Observable<any> {
    if (firstVideo === 0) {
      firstVideo = 1;
    }
    const json = {
      id: courseId,
      firstVideo: firstVideo,
      lastVideo: lastVideo
    };
    return this.http.post(this.apiUrl + '/get_videos', JSON.stringify(json), this.httpOptions);
  }

  /**
   * Remove a course.
   * @param courseId Id of a course to delete.
   */
  removeCourse(courseId: number) {
    const json = {id: courseId};
    return this.http.post(this.apiUrl + '/delete', JSON.stringify(json), this.httpOptions);
  }
}
