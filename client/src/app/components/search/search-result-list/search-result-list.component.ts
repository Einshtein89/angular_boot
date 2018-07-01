import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";

@Component({
  selector: 'search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.css']
})
export class SearchResultListComponent implements OnInit {

  _searchResults: User[];
  _loading: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

}
