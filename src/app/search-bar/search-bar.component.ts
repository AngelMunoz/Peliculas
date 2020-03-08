import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { of, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OnSearchEventArgs } from 'src/app/models/search-bar.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output()
  onSearch: EventEmitter<OnSearchEventArgs> = new EventEmitter<OnSearchEventArgs>();

  lookAheadSearch: Subscription;
  searchForm = new FormGroup({
    query: new FormControl(''),
    searchType: new FormControl('movie', [Validators.required])
  });


  ngOnInit(): void {
    this.lookAheadSearch = this.query.valueChanges
      .pipe(debounceTime(750))
      .subscribe({ next: (value: string) => this.search(value) });
  }

  ngOnDestroy(): void {
    this.lookAheadSearch.unsubscribe();
  }

  get query() {
    return this.searchForm.get('query');
  }

  get searchType() {
    return this.searchForm.get('searchType');
  }

  search(value: string) {
    this.onSearch.emit({ search: value, type: this.searchType.value });
  }

}
