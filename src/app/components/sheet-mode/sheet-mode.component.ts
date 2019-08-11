import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tune } from 'src/app/models/tune';
import * as ABCJS from 'abcjs'
import * as octavian from 'octavian';
import { S_IFDIR } from 'constants';
import MusicUtils from 'src/app/utils'


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
  count: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: DataService) { }

  ngOnInit() {
    this.count = 0;
    this.tune$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getTune(params.get('name')))
    );
    this.name = this.route.snapshot.paramMap.get('name');
    this.service.getTune(this.name).subscribe(t => {
    this.tune = t;
    this.measures = this.tune.measures.length;
      
      
    });




    /*X: 22
T:Money Lost
M:3/4
L:1/8
Q:1/4=100
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:Klezmer
K:Dm
Ade|:"Dm"(f2d)e gf|"A7"e2^c4|"Gm"B>>^c BA BG|"A"A3Ade|"Dm"(f2d)e gf|"A7"e2^c4|
"Gm"A>>B "A7"AG FE|1"Dm"D3Ade:|2"Dm"D3DEF||:"Gm"(G2D)E FG|"Dm"A2F4|"Gm"B>>c "A7"BA BG|
"Dm"A3 DEF|"Gm"(G2D)EFG|"Dm"A2F4|"E°"E>>Fy "(A7)"ED^C2|1"Dm"D3DEF:|2"Dm"D6||
 */
    console.log(MusicUtils.parseChord("C7"));
    var abcString = "X: 22\nT:Money Lost]\nM:3/4\nL:1/8\nQ:1/4=100\mC:Paul Rosen\nS:Copyright 2007, Paul Rosen\nR:Klezmer\nK:Dm\nAde|: [EGB] [GBd]|";
    const tuneObjectArray = ABCJS.renderAbc('notation', abcString);
    
  }
  

}
