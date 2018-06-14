import {Component, OnInit} from '@angular/core';
import {User} from "./models/user.model";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // entityList: User[];
  // loading: boolean;
  // statusCode: number;
  //
  // constructor(private userService: UserService) {
  // }
  //
  ngOnInit() {
    // this.getAllUsers();
  }
  //
  // getAllUsers(): void {
  //   this.loading = true;
  //   this.userService.getAllUsers()
  //     .subscribe(
  //       data => {this.entityList = data, console.log(this.entityList)},
  //       errorCode =>  this.statusCode = errorCode,
  //       () => this.loading = false
  //     );
  // }
}
