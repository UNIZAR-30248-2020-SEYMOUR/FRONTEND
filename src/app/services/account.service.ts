import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Login, User} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://oc2.danielhuici.ml/users/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  register(user: User) {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    this.http.post(this.apiUrl + 'register' , params).subscribe(
      data => console.log(data),
      (error: HttpErrorResponse) => console.log(error.status),
      () => console.log('Llegamos al final')
    );
  }

  /**
   * Do a login petition to the server, receive and deal with the response.
   * @param loginData: contain the email and the password uses to try login.
   * @author: Eduardo Ruiz
   * @revisor:
   * @private
   */
  login(loginData: Login) {
    const json = JSON.stringify(loginData);
    const params = 'json=' + json;
    this.http.post(this.apiUrl + 'login' , params).subscribe(
      data => console.log(data),
      (error: HttpErrorResponse) => console.log(error.status),
      () => console.log('Llegamos al final')
    );
  }
}
