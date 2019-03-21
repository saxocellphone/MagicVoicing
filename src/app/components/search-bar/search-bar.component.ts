import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../../data.service';
import { Tune } from '../../tune';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  autoControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  allTunes: Tune[];
  autoCompleteList: any[];

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() selectedOption = new EventEmitter();

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getTunes().subscribe(tunes => {
      this.allTunes = tunes;
    });

    this.autoControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    });
  }

  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    // var categoryList = []
    // if (typeof val != 'string') {
    //     return [];
    // }
    // if (val === '' || val === null) {
    //     return [];
    // }
    return this.allTunes;
  }

  displayFn(tune: Tune) {
    const k = tune ? tune.name : tune;
    return k;
  }

  filterPostList(event) {
    const posts = event.source.value;
    if (!posts) {
        this.dataService.searchOption = [];
    } else {
        this.dataService.searchOption.push(posts);
        this.selectedOption.emit(this.dataService.searchOption);
    }
    this.focusOnPlaceInput();
  }

  removeOption(option) {
    const index = this.dataService.searchOption.indexOf(option);
    if (index >= 0){
      this.dataService.searchOption.splice(index, 1);
    }
    this.focusOnPlaceInput();

    this.selectedOption.emit(this.dataService.searchOption);
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }
}
