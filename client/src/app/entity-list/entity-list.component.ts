import {Component, Injectable, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityList implements OnInit, OnDestroy {
  entityList: User[] = [];
  loading: boolean;
  statusCode: number;
  user: User;
  links: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
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
}
