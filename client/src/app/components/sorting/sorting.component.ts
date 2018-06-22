import {Component, Input, OnInit} from '@angular/core';
import {EntityList} from "../entity-list/entity-list.component";
import {PaginationService} from "../../services/pagination.service";

@Component({
  selector: 'sorting-entities',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  @Input() entityListComponent: EntityList;
  sortOptions: Array<object>;

  constructor(public paginationService: PaginationService) {
    this.sortOptions = [
      {displayName: "", name: ""},
      {displayName: "First Name up", name: "firstName,asc"},
      {displayName: "First Name down", name: "firstName,desc"}
    ];
  }

  ngOnInit() {
  }

  sortPage(value: any) {
    this.entityListComponent.loading = true;
    this.paginationService.sortBy = value;
    this.paginationService.getPageByNumber(0, value)
      .subscribe(
        data => this.entityListComponent.populateEntities(data),
        errorCode =>  this.entityListComponent.statusCode = errorCode,
        () => this.entityListComponent.loading = false)
  }
}
