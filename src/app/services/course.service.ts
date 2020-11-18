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
}
