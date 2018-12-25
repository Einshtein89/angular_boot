import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EntityList} from "../../entity-list/entity-list.component";
import {PaginationService} from "../../../../services/pagination.service";

@Component({
  selector: 'entities-per-page',
  templateUrl: './entities-per-page.component.html',
  styleUrls: ['./entities-per-page.component.css'],
})
export class EntitiesPerPageComponent implements OnInit {

  @Input() entityListComponent: EntityList;
  pageSizes: Array<number>;

  constructor(public paginationService: PaginationService) {
    this.pageSizes = [3,5,10,25,100];
  }

  ngOnInit() {}

  changePageSize(value: any) {
    this.entityListComponent.loading = true;
    this.paginationService.currentPageSize = value;
    this.paginationService.sortBy = "";
    this.paginationService.getPageByNumber(0, 'user')
      .subscribe(
        data => this.entityListComponent.populateEntities(data),
        errorCode =>  this.entityListComponent.statusCode = errorCode,
        () => this.entityListComponent.loading = false)
  }
}
