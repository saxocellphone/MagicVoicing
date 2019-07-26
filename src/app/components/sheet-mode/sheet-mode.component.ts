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
      //normalize all chords
      var temp = "";
      for(var i = 0; i < this.measures; i++) {
       for(var j = 0; j < this.tune.measures[i].length; j++) {
         if(this.tune.measures[i][j].includes("^")) {
           var str_a = this.tune.measures[i][j].split("^");
           for(var k = 0; k < str_a.length; k++) {
             temp += str_a[k];
             console.log(temp);
           }
          //  this.tune.measures[i][j].replace(this.tune.measures[i][j], temp);
          this.tune.measures[i][j] = temp;
          console.log(this.tune.measures[i][j]);
         }
         temp = "";

       } 
      }
    });
    
  }

  //doesn't actually change the measures of the tune yet
  normalizeMeasures(measures) {
    var temp = "";
    measures.forEach(function(element){
      for(var i = 0; i < element.length; i++) {
        if(element[i].includes("^")) {
          var str_a = element[i].split("^");
          for(var j = 0; j < str_a.length; j++) {
            temp+= str_a[j];
            console.log(temp);
          }
        }
        temp = "";
      }
    });
  }


  mouseEnter(div: string) {
    //display chord
    var chords = div.split(" ");
    for(var i = 0; i < chords.length; i++) {
      if(chords[i] != "undefined") {
        console.log('measure[' + i +']: ' + chords[i]);
      }
    }
    //no need to display image right now
    // var img = document.createElement("img");
    // img.src = 'https://www.basicmusictheory.com/img/b-flat-dominant-7th-chord-on-bass-clef.png';
    // img.width = 200;
    // img.height = 200;
    // img.alt = 'hi';
    // img.id = 'cat';

    // document.body.appendChild(img);
  }

  mouseLeave(div : string) {
    //remove chord display from page
    // console.log('mouse leave: ' + div);
    // console.log('leave name: ' + this.name);
    // console.log('leave measures: '  + this.measures);
    this.count++;
    console.log('leave: '+this.count);
    // var image_x = document.getElementById('cat');
    // image_x.parentNode.removeChild(image_x);

  }

}
