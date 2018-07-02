import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

  @Input() searchResult: User;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.searchUser = this.searchResult;
  }

  getUserId() : string {
    const userSelfHref = this.searchResult["_links"].self.href;
    let userId = userSelfHref.substring(userSelfHref.lastIndexOf("/") + 1, userSelfHref.length);
    return userId;
  }

  getToolTipText() : string {
    return "Click to see " + this.searchResult.firstName + "!";
  }
}
