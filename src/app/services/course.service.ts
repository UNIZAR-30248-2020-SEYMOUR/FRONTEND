import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Course} from '../interfaces';
import {Observable} from 'rxjs';
import {SERVER_URL} from "./services.configuration";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = SERVER_URL +'/courses';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  /**
   * Save a course in the backend
   @return Observable that receive the response of the server
   */
  saveNewCourse(course: Course): Observable<any> {
    const json = {
      owner: this.cookie.get('uuid'),
      coursename: course.coursename,
      description: course.description,
      category: course.category.name
    };
    const params = JSON.stringify(json);
    return this.http.post(this.API_URL + '/create_course', params, this.httpOptions);
  }

  /**
   * This function get the data of the course
   * @param id: id of the course that the function get the data.
   */
  getCourseData(id: number): Observable<any> {
    const json = {
      id: id
    };
    return this.http.post(this.API_URL + '/get_info', JSON.stringify(json), this.httpOptions);
  }

  /**
   * Get the next 10 videos of the course
   * @param courseId: id of the course to request the videos
   * @param lastVideo: number of the last video get from the course
   * @param firstVideo: number of the last video that the GUI have
   */
  getVideos(courseId: number, firstVideo: number, lastVideo: number): Observable<any> {
    const json = {
      id: courseId,
      firstVideo: firstVideo,
      lastVideo: lastVideo
    };
    return this.http.post(this.API_URL + '/get_videos', JSON.stringify(json), this.httpOptions);
  }

  /**
   * This method update a course in backend
   * @param course: data of the course updated
   */
  updateCourse(course: Course): Observable<any> {
    const json = {
      id: course.id,
      coursename: course.coursename,
      description: course.description,
      category: course.category.name
    };
    return this.http.post(this.API_URL + '/update_course', JSON.stringify(json), this.httpOptions);
  }

  /**
   * Remove a course.
   * @param courseId Id of a course to delete.
   */
  removeCourse(courseId: number) {
    const json = {id: courseId};
    return this.http.post(this.API_URL + '/delete', JSON.stringify(json), this.httpOptions);
  }

  /**
   * This function gets the courses which has similar name to the search text.
   * @param search Text to search.
   * @param category Category to filter the results.
   */
  getCourses(search: string, category: string): Observable<any> {
    return this.http.post(this.API_URL + '/search', {textToSearch: search, category: category}, this.httpOptions);
  }

  /**
   * This function subscribes a user to a course.
   * @param courseId Course to subscribe.
   */
  subscribe(courseId: number): Observable<any> {
    return this.http.post(this.API_URL + '/subscribe', {id_course: courseId, id_user: this.cookie.get('uuid')}, this.httpOptions);
  }

  /**
   * This function unsubscribes a user to a course
   * @param courseId Course to unsubscribe
   */
  unsubscribe(courseId: number): Observable<any> {
    return this.http.post(this.API_URL + '/unsubscribe', {id_course: courseId, id_user: this.cookie.get('uuid')}, this.httpOptions);
  }

  /**
   * This function check if a user is currently subscribed to a course.
   * @param courseId Course identification to check subscription.
   */
  checkSubscribed(courseId: number): Observable<any> {
    return this.http.post(this.API_URL + '/check_subscription', {id_course: courseId, id_user: this.cookie.get('uuid')}, this.httpOptions);
  }
}
