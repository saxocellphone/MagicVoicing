import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tune } from 'src/app/models/tune';

@Component({
  selector: 'app-sheet-mode',
  templateUrl: './sheet-mode.component.html',
  styleUrls: ['./sheet-mode.component.css']
})
export class SheetModeComponent implements OnInit {

  tune$: Observable<Tune>;
  tune: Tune;
  name: string;
  measures: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: DataService) { }

  ngOnInit() {
    this.tune$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getTune(params.get('name')))
    );
    this.name = this.route.snapshot.paramMap.get('name');
    this.service.getTune(this.name).subscribe(t => {
      this.tune = t;
      this.measures = this.tune.measures.length;
    });
  }

}
