import {Component, Input, OnInit} from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityList implements OnInit {
  @Input() entityList: User[];
  loading: boolean;
  statusCode: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // this.makeRequest();
  }

  getAllUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe(
        data => {this.entityList = data, console.log(this.entityList)},
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }
}
