import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Tune } from '../../models/tune';
import { Observable, Observer } from 'rxjs';
import { staggerAnimation, slideInLeft } from 'src/app/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [staggerAnimation, slideInLeft]
})
export class CardsComponent implements OnInit {
  autocontrol = new FormControl();
  tunes$: Observable<Tune[]>;
  tunes = [];
  sum = 30;
  throttle = 1500;
  scrollDistance = 0;
  scrollUpDistance = 3;
  direction = '';
  nullPic = 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png';
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.tunes$ = this.dataService.getTunes({}, 30);
    this.tunes$.subscribe(t => {
      this.tunes = t;
    });
    this.autocontrol.valueChanges.subscribe(input => {
      this.filterTunes(input);
    });
  }

  filterTunes(input: string) {

  }

  onScrollDown() {
    this.dataService.getTunes({}, 30, this.tunes[this.tunes.length - 1].name).subscribe(ts => [
      this.tunes = [...this.tunes, ...ts]
    ]);
  }
}
