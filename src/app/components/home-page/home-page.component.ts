import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Tune } from '../../tune';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  tune: Tune[];
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getTunes().subscribe(tunes => {
      this.tune = tunes;
      this.dataService.tuneData = tunes;
    });
  }

}
