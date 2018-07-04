import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  id: string;
  user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
     route.params.subscribe(params => { this.id = params['userId']; });
  }

  ngOnInit() {
    this.user = this.userService.getSearchResultUserById(this.id);
  }

}
