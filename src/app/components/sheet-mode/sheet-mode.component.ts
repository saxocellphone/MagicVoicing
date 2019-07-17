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
    
  }

  mouseEnter(div: string) {
    var chords = div.split(" ");
    for(var i = 0; i < chords.length; i++) {
      if(chords[i] != "undefined") {
        console.log('measure[' + i +']: ' + chords[i]);
      }
    }
  }

  mouseLeave(div : string) {
    //remove chord display from page
    // console.log('mouse leave: ' + div);
    // console.log('leave name: ' + this.name);
    // console.log('leave measures: '  + this.measures);
    this.count++;
    console.log('leave: '+this.count);

  }

}
