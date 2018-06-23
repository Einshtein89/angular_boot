import {AfterContentInit, AfterViewChecked, Component, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {EntityList} from "../entity-list/entity-list.component";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {PaginationService} from "../../services/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewChecked {

  // entityList: User[] = [];
  // loading: boolean;
  // statusCode: number;
  // user: User;
  // @Input() links: any;

  @Input() entityListComponent: EntityList;
  // _currentPath: string;
  private pageArray: any[];

  constructor(private userService: UserService,
              private paginationService: PaginationService) {
    // this.paginationService.currentPageSize = 10;
  }

  ngOnInit() {}

  getFirstPage() {
    this._getPage("first");
  }

  getLastPage() {
    this._getPage("last");
  }

  getNextPage() {
    this._getPage("next");
  }

  getPreviousPage() {
    this._getPage("prev");
  }

  getPage(pageNumber: number) {
    this.paginationService.getPageByNumber(pageNumber, this.paginationService.sortBy)
      .subscribe(
        data => this.entityListComponent.populateEntities(data),
        errorCode =>  this.entityListComponent.statusCode = errorCode,
        () => this.entityListComponent.loading = false
      );
  }

  ngAfterViewChecked(): void {
    if (this.entityListComponent.page) {
      this.pageArray = Array.from(Array(this.entityListComponent.page.totalPages).keys());
    }
  }

  private _getPage(pageName: string) {
    this.entityListComponent.loading = true;
    this.paginationService.getPageByLink(this.entityListComponent.links[pageName].href)
      .subscribe(
        data => this.entityListComponent.populateEntities(data),
        errorCode => this.entityListComponent.statusCode = errorCode,
        () => this.entityListComponent.loading = false
      );
  }
}
