import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() searchResult: User;
  constructor() { }

  ngOnInit() {
  }

}
