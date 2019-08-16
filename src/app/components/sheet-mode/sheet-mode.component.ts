import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tune } from 'src/app/models/tune';
import * as ABCJS from 'abcjs';
import * as octavian from 'octavian';
import MusicUtils from 'src/app/utils';
import { AudioContext} from 'audio-context';

declare var AudioContext, webkitAudioContext: any;

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
                  `L: 1/4\n` +
                  `Q: 1/4=120\n` +
                  `C: ${t.composer}\n` +
                  `S: \n` +
                  `R: ${t.style}\n` +
                  `K:C\n` +
                  `${MusicUtils.generateABCString(t.measures)}`;
      const tuneObjectArray = ABCJS.renderAbc('notation', abc);
      var visualObj = ABCJS.renderAbc("notation", abc)[0];
      var midiBuffer;
      var startAudioButton = document.querySelector(".activate-audio");
      var stopAudioButton = document.querySelector(".stop-audio");
      startAudioButton.addEventListener("click", function () {
        startAudioButton.setAttribute("style", "display:none;");
        stopAudioButton.setAttribute("style", "");        
        var audioContext = new AudioContext();
        midiBuffer = new ABCJS.synth.CreateSynth();

        return midiBuffer.init({
          visualObj: visualObj,
          audioContext: audioContext,
          millisecondsPerMeasure: visualObj.millisecondsPerMeasure()
        }).then(function() {
          return midiBuffer.prime();
        }).then(function() {
          midiBuffer.start();
          return Promise.resolve();
        }).catch(function(error) {
          console.warn("synth error", error);
        })
      });

      stopAudioButton.addEventListener("click", function() {
        startAudioButton.setAttribute("style", "");
				stopAudioButton.setAttribute("style", "display:none;");
				midiBuffer.stop();
      });
     

      this.measures = this.tune.measures.length;
    });
  }

}
