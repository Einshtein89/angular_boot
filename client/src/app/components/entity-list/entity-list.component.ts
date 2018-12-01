import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AddEditEntityComponent} from "../add-edit-entity/add-edit-entity.component";
import * as  _ from "underscore"
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationService} from "../../services/pagination.service";
import {ComponentFactory} from "../../component-factory/component-factory";

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],

})
export class EntityList implements OnInit, OnDestroy, AfterViewChecked {
  entityList: User[] = [];
  loading: boolean;
  statusCode: number;
  user: User;
  links: any;
  page: any;
  _page: string;

  @ViewChild('addEditEntity', {read: ViewContainerRef}) addEditContainerRef;
  // @ViewChild(PaginationComponent) pagination: PaginationComponent;

  constructor(private userService: UserService,
              private paginationService: PaginationService,
              private cdr: ChangeDetectorRef,
              public router: Router,
              public route: ActivatedRoute,
              private componentFactory: ComponentFactory) {
    route.params.subscribe(params => { this._page = params['page']; });
  }


  showAddEntityForm () {
    const expComponent =  this.componentFactory.getComponent(AddEditEntityComponent, this.addEditContainerRef);
    expComponent.instance._ref = expComponent;
    expComponent.instance._links = this.links;
    expComponent.instance.options = {_isModal: true};
    expComponent.instance._entityListComponent = this;
  }

  ngOnInit() {
    this.paginationService.currentPageSize = this.paginationService.defaultPageSize;
    this.userService.addedUser.subscribe(user => this.user = user);
    // if(!this.userService.entityList) {
      this.getAllUsers();
    // } else {
    //    this.entityList = this.userService.entityList;
    // }
  }

  ngOnDestroy() {
    this.userService.entityList = this.entityList;
  }

  getAllUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.entityList = this.extractUsers(data);
          this.links = this.extractLinks(data);
          this.page = this.extractPage(data);
          },
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }

  populateEntities(data: Object) {
    this.entityList = this.extractUsers(data);
    this.links = this.extractLinks(data);
    this.page = this.extractPage(data);
  }

  extractUsers(data: any) {
    let users = data["_embedded"].users;
    return users;
  }

  extractLinks(data: any) {
    let links = data["_links"];
    return links;
  }

  extractPage(data: any) {
    let page = data["page"];
    return page;
  }

  ngAfterViewChecked(): void {
    // if (this.user && !_.contains(this.entityList, this.user)) {
    //   this.entityList.push(this.user);
    // }
    this.cdr.detectChanges();
  }
}
