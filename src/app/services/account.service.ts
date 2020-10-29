import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Login, User} from '../interfaces';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Do the petition of the user operation to the server and save some information of the user in the cookies.
 */
export class AccountService {
  private apiUrl = 'http://oc2.danielhuici.ml/users/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  /**
   * Do a register petition to the server using the post method.
   * @return Observable that receive the response of the server
   * @param user: contain the register information introduce by the user.
   */
  register(user: User): Observable<any> {
    const params = JSON.stringify(user);
    return this.http.post(this.apiUrl + 'register' , params, this.httpOptions);
  }

  /**
   * Do a login petition to the server using the post method.
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
   * Do a petition to change the user password to the server.
   * @return Observable that receive the response of the server
   * @param password: new password for the user
   */
  public changePassword(password: string) {
    const params = JSON.stringify(password);
    return this.http.post(this.apiUrl + '' , params, this.httpOptions);
  }

  sendEmail(email: string): Observable<any> {
    const params = JSON.stringify(email);
    return this.http.post(this.apiUrl + 'forgot', params, this.httpOptions);
  }
}
