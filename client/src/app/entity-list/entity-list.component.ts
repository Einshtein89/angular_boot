import {Component, Injectable, Input, OnInit, Optional} from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
@Injectable()
export class EntityList implements OnInit {
  entityList: User[] = [];
  loading: boolean;
  statusCode: number;
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe(
        data => {this.entityList = data},
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }
}
