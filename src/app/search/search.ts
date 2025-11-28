import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']  
})
export class Search {
  query = '';
  @Output() searchChange = new EventEmitter<string>();

  onInputChange() {
    this.searchChange.emit(this.query);
  }
}
