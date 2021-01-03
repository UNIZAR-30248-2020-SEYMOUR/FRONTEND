import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login, SelfProfile} from '../interfaces';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {SERVER_URL} from './services.configuration';

@Injectable({
  providedIn: 'root'
})

/**
 * This class contains de logic of do the requests for operations necessary for user accounts
 */
export class AccountService {
  private API_URL = SERVER_URL + '/users';

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
  register(user: SelfProfile): Observable<any> {
    const params = JSON.stringify(user);
    return this.http.post(this.API_URL + '/register' , params, this.httpOptions);
  }

  /**
   * Do a login request to the server using the post method.
   * @return Observable that receive the response of the server
   * @param loginData: contain the login information introduce by the user.
   */
  login(loginData: Login): Observable<any> {
    const params = JSON.stringify(loginData);

    return this.http.post(this.API_URL + '/login' , params, this.httpOptions);
  }

  /**
   * Create a cookie with the user id
   * @param data: JSON with the user id
   */
  public saveUser(data: Object) {
    const uuid = data['UUID'];
    this.cookie.delete('uuid');
    this.cookie.delete('username');
    this.cookie.delete('uuid');
    this.cookie.set('uuid', uuid);
  }

  /**
   * Obtains the courses of the open sesion user
   * @return Observable that receive the response of the server
   */
  getUserNoOwnerData(username: string): Observable<any> {
    const json = {
      username: username
    };

    const params = JSON.stringify(json);
    return this.http.post(this.API_URL + '/get_user' , params, this.httpOptions);
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
    return this.http.post(this.API_URL + '/user_profile' , params, this.httpOptions);
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
    return this.http.post(this.API_URL + '/reset_password' , params, this.httpOptions);
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
    return this.http.post(this.API_URL + '/forgot_password', params, this.httpOptions);
  }

  /**
   * Do a request to delete a user
   * @param uuid of the user to delete
   */
  deleteUser(uuid: string): Observable<any> {
    const json = {uuid: uuid};
    return this.http.post(this.API_URL + '/delete', JSON.stringify(json), this.httpOptions);
  }

  /**
   * Do a request to update the information of a user
   * @param user to update the information
   */
  updateProfile(user: SelfProfile): Observable<any> {
    return this.http.post(this.API_URL + '/update_profile', JSON.stringify(user), this.httpOptions);
  }

  /**
   * Search the profiles which contains the search string.
   * @param search String to search.
   */
  getProfiles(search: String): Observable<any> {
    return this.http.post(this.API_URL + '/search', {textToSearch: search}, this.httpOptions);
  }

  /**
   * This function do a request to get videos of the user feed
   * @param uuid: user id to get the fedd
   * @param firstVideo: position of the first video to get
   * @param lastVideo: position of the last video to get
   */
  getFeed(uuid: string, firstVideo: number, lastVideo: number): Observable<any> {
    const json = {
      uuid: uuid,
      firstVideo: firstVideo,
      lastVideo: lastVideo
    };
    return this.http.post(this.API_URL + '/feed', JSON.stringify(json), this.httpOptions);
  }
}
