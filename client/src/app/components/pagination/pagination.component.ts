import {AfterContentInit, AfterViewChecked, Component, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {EntityList} from "../entity-list/entity-list.component";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

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
  _currentPath: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.entityListComponent._page);
  }

  getFirstPage() {
    this._getPage("first", "first");
  }

  getLastPage() {
    this._getPage("last", "last");
  }

  getNextPage() {
    this._getPage("next", "next");
  }

  getPreviousPage() {
    this._getPage("prev", "prev");
  }

  private _getPage(page: string, navigateTo?: string) {

    // if (page != this._currentPath) {
      this.entityListComponent.loading = true;
      this.userService.getAllUsers(this.entityListComponent.links[page].href)
        .subscribe(
          data => {
            this.entityListComponent.entityList = this.entityListComponent.extractUsers(data);
            this.entityListComponent.links = this.entityListComponent.extractLinks(data);
            this.entityListComponent.page = this.entityListComponent.extractPage(data);
            if (navigateTo) {
              // this.entityListComponent.router.navigate(['../' + navigateTo + ''], { relativeTo: this.entityListComponent.route });
            }
            this._currentPath = page;
          },
          errorCode =>  this.entityListComponent.statusCode = errorCode,
          () => this.entityListComponent.loading = false
        )
    // }
  }

  ngAfterViewChecked(): void {
    // if (this.entityListComponent.links) {
    //   let path = this.entityListComponent._page;
    //   if (path) {
    //     this._getPage(path, path);
    //     path = null;
    //   }
    // }
  }

  // ngAfterContentInit(): void {
  //   const path = this.entityListComponent.route.snapshot["_urlSegment"].segments[2].path;
  //   this._getPage(path, path);
  // }
}
