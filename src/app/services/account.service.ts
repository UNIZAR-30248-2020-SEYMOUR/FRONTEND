import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Course, Login, User} from '../interfaces';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * This class contains de logic of do the requests for operations necessary for user accounts
 */
export class AccountService {
  private apiUrl = 'http://oc2.danielhuici.ml/users/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  /**
   * Do a register request to the server using the post method.
   * @return Observable that receive the response of the server
   * @param user: contain the register information introduce by the user.
   */
  register(user: User): Observable<any> {
    const params = JSON.stringify(user);
    return this.http.post(this.apiUrl + 'register' , params, this.httpOptions);
  }

  /**
   * Do a login request to the server using the post method.
   * @return Observable that receive the response of the server
   * @param loginData: contain the login information introduce by the user.
   */
  login(loginData: Login): Observable<any> {
    const params = JSON.stringify(loginData);

    return this.http.post(this.apiUrl + 'login' , params, this.httpOptions);
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
   * Do a request to get the user data to the server.
   * @return Observable that receive the response of the server
   */
  getCourses(): Observable<any> {
    const json = {
      uuid: this.cookie.get('uuid')
    };
    // const params = new HttpParams().set('uuid', this.cookie.get('uuid'));
    const params = JSON.stringify(json);
    alert(params);
    const head = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.get(this.apiUrl + 'user_profile', {headers: head, params: params});
    return this.http.post(this.apiUrl + 'user_profile' , params, this.httpOptions);
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
    return this.http.post(this.apiUrl + 'reset_password' , params, this.httpOptions);
  }

  /**
   * Do a request to the server for send the email for recover the password
   * @param email: email where to send the link of change password
   */
  sendEmail(email: string): Observable<any> {
    const json = {
      email: email
    };
    const params = JSON.stringify(json);
    return this.http.post(this.apiUrl + 'forgot_password', params, this.httpOptions);
  }

  saveCourse(course: Course): Observable<any> {
    const json = {
      owner: this.cookie.get('uuid'),
      coursename: course.name,
      description: course.description,
      category: course.category.categoryName
    };
    const params = JSON.stringify(json);
    return this.http.post(this.apiUrl + 'courses/create_course', params, this.httpOptions);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + 'categories/get_list');
  }
}
