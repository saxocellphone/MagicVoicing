import { Injectable } from '@angular/core';
import { Tune, TuneQuery } from './models/tune';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import MusicUtils from './utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchOption = [];
  public tuneData: Tune[];
  tuneUrl = 'assets/leadsheets/Alone.xml';
  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });

  constructor(private http: HttpClient) { }

  getTunes(queries?: TuneQuery, perPage?: number, lastResult?: string): Observable<Tune[]> {
    let params = new HttpParams();
    Object.keys(queries).forEach(q => {
      params = params.set(q, queries[q]);
    });
    console.log(lastResult);
    if (lastResult) {
      params = params.set('lastResult', lastResult);
    }
    return this.http.get<Tune[]>('/api/getTunes', {headers: this.headers, params});
  }

  getTune(name: string): Observable<Tune> {
    return this.http.get<Tune>(`/api/getTune/${name}`, {headers: this.headers});
  }

  addTune(name: string, chords: string) {
    // const tune: Tune = {
    //   name,
    //   chords: MusicUtils.parseChords(chords)
    // };
    // return this.http.post<Tune>('/api/addTune', tune, this.httpOptions);
  }
}
