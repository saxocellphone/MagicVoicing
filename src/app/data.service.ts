import { Injectable } from '@angular/core';
import { Tune } from './tune';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  searchOption = [];
  public tuneData: Tune[];
  tuneUrl = 'assets/leadsheets/Alone.xml';
  constructor(private http: HttpClient) { }
  getTunes(): Observable<Tune[]> {
    return this.http.get<Tune[]>(this.tuneUrl);
  }
}
