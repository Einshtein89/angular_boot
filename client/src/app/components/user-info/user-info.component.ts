import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {AddEditEntityComponent} from "../add-edit-entity/add-edit-entity.component";
import {ComponentFactory} from "../../component-factory/component-factory";
import {EditDeleteUserService} from "../../services/edit-delete-user.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, AfterViewChecked {

  id: string;
  entity: User;
  updatedUser: User;
  @ViewChild('addEditEntity', {read: ViewContainerRef}) addEditContainerRef;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private cdr: ChangeDetectorRef,
              private editDeleteUserService: EditDeleteUserService) {
     route.params.subscribe(params => { this.id = params['userId']; });
  }

  ngOnInit() {
    this.userService.changedUser.subscribe(user => this.updatedUser = user);
    this.entity = this.userService.getSearchResultUserById(this.id);
    if (!this.entity) {
      this.userService.getUserById(this.id)
        .subscribe(data => this.entity = data);
    }
  }

  editUser() {
    this.editDeleteUserService.showEditEntityForm(this.entity, this.addEditContainerRef, true);
    this.cdr.detectChanges();
  }

  removeUser() {
    this.editDeleteUserService.deleteUser(this);
  }

  ngAfterViewChecked(): void {
    this.editDeleteUserService.updateCurrentUser(this);
    this.cdr.detectChanges();
  }

}
