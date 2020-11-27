import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private apiUrl = 'http://oc2.danielhuici.ml/videos';
 // private apiUrl = 'http://localhost:3000/videos';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  /**
   * Send a video to the backend
   * @param formData form with the video.
   */
  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + '/upload', formData);
  }

  /**
   * Send the details to the backend.
   * @param details Details of the video.
   */
  sendDetails(details: {course: number, video: number, title: string, description: string}) {
    const params = JSON.stringify(details);
    return this.http.post(this.apiUrl + '/details' , params, this.httpOptions);
  }
}
