import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {SERVER_URL} from './services.configuration';

@Injectable({
  providedIn: 'root'
})

export class VideosService {
  private API_URL = SERVER_URL + '/videos';
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
    return this.http.post(this.API_URL + '/upload', formData);
  }

  /**
   * Send the details to the backend.
   * @param details Details of the video.
   */
  sendDetails(details: {course: number, video: number, title: string, description: string}) {
    const params = JSON.stringify(details);
    return this.http.post(this.API_URL + '/details' , params, this.httpOptions);
  }

  /**
   * Do a request to get the information of the video
   * @param id Id of the video to get the information
   */
  getVideoData(id: number): Observable<any> {
    const json = {id: id};
    return this.http.post(this.API_URL + '/get_video', JSON.stringify(json), this.httpOptions);
  }

  /**
   * Do a request to add a comment to a video
   * @param comment: Comment to add in the video
   * @param video: Video which wants to add the comment
   */
  comment(comment, video: number): Observable<any> {
    const json = {
      video: video,
      uuid: this.cookie.get('uuid'),
      comment: comment
    };
    return this.http.post(this.API_URL + '/comment', JSON.stringify(json), this.httpOptions);
  }

  /**
   * This function send a video rating to the server
   * @param videoID video identification.
   * @param newRate Rating number.
   */
  addRatting(videoID: number, newRate: number): Observable<any> {
    const json = {
      video: videoID,
      uuid: this.cookie.get('uuid'),
      rate: newRate
    };
    return this.http.post(this.API_URL + '/rate', JSON.stringify(json), this.httpOptions);
  }
}
