import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from './models/youtube_response';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apikey = 'AIzaSyCjIeU80Kva2dzUCIczl-3pzJSrli73TFc';
  constructor(private http: HttpClient) { }

  searchSong(q: string): Observable<YoutubeResponse>{
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${this.apikey}&q=${q}-jazz`)
      .pipe(map((data: any) => {
        console.log(data.items[0].snippet);
        return {
          title: data.items[0].snippet.title,
          thumbnailUrl: data.items[0].snippet.thumbnails.high.url
        };
      }));
  }
}
