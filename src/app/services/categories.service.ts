import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_URL} from "./services.configuration";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  API_URL = SERVER_URL +'/categories';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Obtains the categories list
   @return Observable that receive the response of the server
   */
  getCategories(): Observable<any> {
    return this.http.post(this.API_URL + '/get_list', null, this.httpOptions);
  }
}
