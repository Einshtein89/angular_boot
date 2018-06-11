import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
import {AddEntityComponent} from "../add-entity/add-entity.component";
import * as  _ from "underscore"


@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityList implements OnInit, OnDestroy, AfterViewChecked {
  entityList: User[] = [];
  loading: boolean;
  statusCode: number;
  user: User;
  links: any;
  @ViewChild('addEntity', {read: ViewContainerRef}) viewContainerRef;

  constructor(private userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }


  showAddEntityForm () {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddEntityComponent);
    this.viewContainerRef.clear();
    const expComponent =  this.viewContainerRef.createComponent(factory);
    expComponent.instance._ref = expComponent;
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user);
    if(!this.userService.entityList) {
      this.getAllUsers();
    } else {
       this.entityList = this.userService.entityList;
    }
  }

  ngOnDestroy() {
    this.userService.entityList = this.entityList;
  }

  getAllUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.entityList = this.extractUsers(data); console.log(data);
          this.links = this.extractLinks(data);},
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }

  private extractUsers(data: any) {
    let users = data["_embedded"].users;
    return users;
  }

  private extractLinks(data: any) {
    let links = data["_links"];
    return links;
  }

  ngAfterViewChecked(): void {
    if (this.user && !_.contains(this.entityList, this.user)) {
      console.log(_.contains(this.entityList, this.user));
      this.entityList.push(this.user);
      console.log(this.entityList);
    }
  }


}
