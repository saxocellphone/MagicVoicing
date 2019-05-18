import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-new-tune',
  templateUrl: './new-tune.component.html',
  styleUrls: ['./new-tune.component.css']
})
export class NewTuneComponent implements OnInit {

  info = new FormGroup({
    name: new FormControl(''),
    chords: new FormControl('')
  });  
  
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  onSubmit(){
    // const values = this.info.value;
    // this.dataService.addTune(values.name, values.chords)
    //   .subscribe(tune =>  {
    //       console.log('Added');
    //   });
  }

}
