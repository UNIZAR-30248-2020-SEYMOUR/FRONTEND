import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Course, Login, User} from '../interfaces';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {placeholdersToParams} from '@angular/compiler/src/render3/view/i18n/util';

@Injectable({
  providedIn: 'root'
})

/**
 * This class contains de logic of do the requests for operations necessary for user accounts
 */
export class AccountService {
  // private apiUrl = 'http://oc2.danielhuici.ml/';
  private apiUrl = 'http://localhost:3000/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  /**
   * Do a register request to the server using the post method.
   * @return Observable that receive the response of the server
   * @param user: contain the register information introduce by the user.
   */
  register(user: User): Observable<any> {
    const params = JSON.stringify(user);
    return this.http.post(this.apiUrl + 'users/register' , params, this.httpOptions);
  }

  /**
   * Do a login request to the server using the post method.
   * @return Observable that receive the response of the server
   * @param loginData: contain the login information introduce by the user.
   */
  login(loginData: Login): Observable<any> {
    const params = JSON.stringify(loginData);

    return this.http.post(this.apiUrl + 'users/login' , params, this.httpOptions);
  }

  /**
   * Create a cookie with the user id
   * @param data: JSON with the user id
   */
  public saveUser(data: Object) {
    const uuid = data['UUID'];
    this.cookie.set('uuid', uuid);
  }

  /**
   * Obtains the courses of the open sesion user
   * @return Observable that receive the response of the server
   */
  getUserData(): Observable<any> {
    const json = {
      uuid: this.cookie.get('uuid')
    };

    const params = JSON.stringify(json);
    return this.http.post(this.apiUrl + 'users/user_profile' , params, this.httpOptions);
  }

  /**
   * Do a request to change the user password to the server.
   * @return Observable that receive the response of the server
   * @param password: new password for the user
   * @param idToken:
   */
  public changePassword(password: string, idToken: string) {
    const json = {
      newPassword: password,
      token: idToken
    };
    const params = JSON.stringify(json);
    return this.http.post(this.apiUrl + 'users/reset_password' , params, this.httpOptions);
  }

  /**
   * Do a request to the server for send the email for recover the password
   * @param email: email where to send the link of change password
   * @return Observable that receive the response of the server
   */
  sendEmail(email: string): Observable<any> {
    const json = {
      email: email
    };
    const params = JSON.stringify(json);
    return this.http.post(this.apiUrl + 'users/forgot_password', params, this.httpOptions);
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
    return this.http.post(this.apiUrl + 'courses/create_course', params, this.httpOptions);
  }

  /**
   * Obtains the categories list
   @return Observable that receive the response of the server
   */
  getCategories(): Observable<any> {
    return this.http.post(this.apiUrl + 'categories/get_list', null, this.httpOptions);
  }

  /**
   * Do a request to delete a user
   * @param uuid of the user to delete
   */
  deleteUser(uuid: string): Observable<any> {
    const json = {uuid: uuid};
    return this.http.post(this.apiUrl + 'users/delete', JSON.stringify(json), this.httpOptions);
  }

  /**
   * Do a request to update the information of a user
   * @param user to update the information
   */
  updateProfile(user: User): Observable<any> {
    alert('update');
    return this.http.post(this.apiUrl + 'users/update_profile', JSON.stringify(user), this.httpOptions);
  }
}
