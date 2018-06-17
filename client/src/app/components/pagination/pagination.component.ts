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
              private paginationService: PaginationService) { }

  ngOnInit() {
    console.log(this.entityListComponent._page);
  }

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
    this.paginationService.getPageByNumber(pageNumber)
      .subscribe(
        data => this._populateEntities(data),
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
    this.paginationService.getPageByLink(this.entityListComponent.links[pageName].href)
      .subscribe(
        data => this._populateEntities(data),
        errorCode => this.entityListComponent.statusCode = errorCode,
        () => this.entityListComponent.loading = false
      );
  }

  private _populateEntities(data: Object) {
    this.entityListComponent.entityList = this.entityListComponent.extractUsers(data);
    this.entityListComponent.links = this.entityListComponent.extractLinks(data);
    this.entityListComponent.page = this.entityListComponent.extractPage(data);
    // if (navigateTo) {
    //   // this.entityListComponent.router.navigate(['../' + navigateTo + ''], { relativeTo: this.entityListComponent.route });
    // }
  }
}
