import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EntityList} from "../../entity-list/entity-list.component";
import {PaginationService} from "../../../services/pagination.service";

@Component({
  selector: 'entities-per-page',
  templateUrl: './entities-per-page.component.html',
  styleUrls: ['./entities-per-page.component.css'],
})
export class EntitiesPerPageComponent implements OnInit {

  @Input() entityListComponent: EntityList;
  pageSizes: Array<number>;

  constructor(public paginationService: PaginationService) {
    this.pageSizes = [3,5,10];
    console.log(this.paginationService.currentPageSize);
  }

  ngOnInit() {}

  changePageSize(value: any) {
    this.entityListComponent.loading = true;
    this.paginationService.currentPageSize = value;
    this.paginationService.getPageByNumber(0)
      .subscribe(
        data => this._populateEntities(data),
        errorCode =>  this.entityListComponent.statusCode = errorCode,
        () => this.entityListComponent.loading = false)
  }

  private _populateEntities(data: Object) {
    this.entityListComponent.entityList = this.entityListComponent.extractUsers(data);
    this.entityListComponent.links = this.entityListComponent.extractLinks(data);
    this.entityListComponent.page = this.entityListComponent.extractPage(data);
  }
}
