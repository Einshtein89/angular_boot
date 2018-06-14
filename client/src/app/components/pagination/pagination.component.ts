import {Component, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {EntityList} from "../entity-list/entity-list.component";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() entityComponent: EntityList;

  constructor(private userService: UserService) { }

  ngOnInit() {
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

  private extractUsers(data: any) {
    let users = data["_embedded"].users;
    return users;
  }

  private extractLinks(data: any) {
    let links = data["_links"];
    return links;
  }

  private _getPage(page: string) {
    this.entityComponent.loading = true;
    this.userService.getAllUsers(this.entityComponent.links[page].href)
      .subscribe(
        data => {
          this.entityComponent.entityList = this.extractUsers(data);
          this.entityComponent.links = this.extractLinks(data);
        },
        errorCode =>  this.entityComponent.statusCode = errorCode,
        () => this.entityComponent.loading = false
      )
  }
}
