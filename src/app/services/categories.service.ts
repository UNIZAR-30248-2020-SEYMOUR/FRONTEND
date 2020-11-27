import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://oc2.danielhuici.ml/categories';
  // private apiUrl = 'http://localhost:3000/categories';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  /**
   * Obtains the categories list
   @return Observable that receive the response of the server
   */
  getCategories(): Observable<any> {
    return this.http.post(this.apiUrl + '/get_list', null, this.httpOptions);
  }
}
