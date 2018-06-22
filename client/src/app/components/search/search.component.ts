import {Component, Input, OnInit} from '@angular/core';
import {EntityList} from "../entity-list/entity-list.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('searchState', [
      state('inactive', style({
        width: '30px',
      })),
      state('active',   style({
        width: '200px',
      })),
      transition('inactive <=> active', animate('200ms ease-out'))
    ])
  ]
})
export class SearchComponent implements OnInit {

  @Input() entityListComponent: EntityList;
  searchState: string = 'inactive';


  constructor() { }

  ngOnInit() {
  }

  searchToggle() {
    this.searchState = this.searchState === 'active' ? 'inactive' : 'active';
  }

}
