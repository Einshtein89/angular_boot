import {Component, Input, OnInit} from '@angular/core';
import {EntityList} from "../entity-list/entity-list.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../services/user.service";

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


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  search(value: any) {
    if (value) {
      this.userService.searchByFirstOrLastName(value)
        .subscribe(
          data => this.entityListComponent.populateEntities(data),
          errorCode =>  this.entityListComponent.statusCode = errorCode,
          () => this.entityListComponent.loading = false
        );
    }
  }

  resetInput(searchInput: any) {
    searchInput.value = "";
  }
}
