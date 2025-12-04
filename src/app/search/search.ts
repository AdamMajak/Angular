import { Component, EventEmitter, Output, signal } from '@angular/core';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [Field],
  templateUrl: './search.html',
  styleUrls: ['./search.css']  
})
export class Search {
  private searchModel = signal({ q: '' });
  searchForm = form(this.searchModel);
  @Output() searchChange = new EventEmitter<string>();

  onInputChange() {
    this.searchChange.emit(this.searchModel().q);
  }
}
