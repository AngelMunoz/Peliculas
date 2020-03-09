import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OnSearchEventArgs } from 'src/app/models';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output()
  search: EventEmitter<OnSearchEventArgs> = new EventEmitter<OnSearchEventArgs>();

  lookAheadSearch: Subscription;
  searchForm = new FormGroup({
    query: new FormControl(''),
    searchType: new FormControl('movie', [Validators.required])
  });


  ngOnInit(): void {
    this.lookAheadSearch = this.query.valueChanges
      .pipe(debounceTime(750))
      .subscribe({ next: (value: string) => this.emitSearch(value) });
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

  emitSearch(value: string) {
    this.search.emit({ search: value, type: this.searchType.value });
  }

}
