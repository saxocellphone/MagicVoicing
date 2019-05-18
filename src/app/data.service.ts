import { Injectable } from '@angular/core';
import { Tune } from './models/tune';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import MusicUtils from './utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchOption = [];
  public tuneData: Tune[];
  tuneUrl = 'assets/leadsheets/Alone.xml';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient) { }
  getTunes(): Observable<Tune[]> {
    return this.http.get<Tune[]>('/api/getAllTunes', this.httpOptions);
  }

  getTune(name: string): Observable<Tune> {
    return this.http.get<Tune>(`/api/getTune/${name}`, this.httpOptions);
  }

  addTune(name: string, chords: string) {
    // const tune: Tune = {
    //   name,
    //   chords: MusicUtils.parseChords(chords)
    // };
    // return this.http.post<Tune>('/api/addTune', tune, this.httpOptions);
  }
}
