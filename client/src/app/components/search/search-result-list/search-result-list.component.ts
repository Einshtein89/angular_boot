import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";

@Component({
  selector: 'search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.less']
})
export class SearchResultListComponent implements OnInit {

  _searchResults: User[];

  constructor() {
  }

  ngOnInit() {
  }

}
