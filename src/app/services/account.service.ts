import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Login, User} from '../interfaces';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private SUCCESS = 'success';

  private apiUrl = 'http://oc2.danielhuici.ml/users/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  register(user: User): Observable<any> {
    const params = JSON.stringify(user);
    return this.http.post(this.apiUrl + 'register' , params, this.httpOptions);
  }

  /**
   * Do a login petition to the server, receive and deal with the response.
   * @param loginData: contain the email and the password uses to try login.
   */
  login(loginData: Login): Observable<any> {
    const params = JSON.stringify(loginData);

    return this.http.post(this.apiUrl + 'login' , params, this.httpOptions);
  }

  public saveUser(data: Object) {

    const uuid = data['UUID'];
    this.cookie.set('uuid', uuid);
  }
}
