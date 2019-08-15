import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tune } from 'src/app/models/tune';
import * as ABCJS from 'abcjs';
import * as octavian from 'octavian';
import MusicUtils from 'src/app/utils';

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
      const el: HTMLElement = document.getElementById('test');
      const abc = 'X: 1\n' +
                  `T: ${t.name}\n` +
                  `M: 4/4\n` +
                  `L: 1/2\n` +
                  `Q: 1/4=${t.bpm}\n` +
                  `C: ${t.composer}\n` +
                  `S: \n` +
                  `R: ${t.style}\n` +
                  `K:C\n` +
                  `${MusicUtils.generateABCString(t.measures)}`;
      const tuneObjectArray = ABCJS.renderAbc('notation', abc);

      this.measures = this.tune.measures.length;
    });
    console.log(MusicUtils.parseChords('C7'));
  }

}
