import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {AddEditEntityComponent} from "../add-edit-entity/add-edit-entity.component";
import {ComponentFactory} from "../../component-factory/component-factory";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, AfterViewChecked {

  id: string;
  user: User;
  updatedUser: User;
  @ViewChild('addEditEntity', {read: ViewContainerRef}) addEditContainerRef;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private componentFactory: ComponentFactory,
              private cdr: ChangeDetectorRef) {
     route.params.subscribe(params => { this.id = params['userId']; });
  }

  ngOnInit() {
    this.userService.changedUser.subscribe(user => this.updatedUser = user);
    this.user = this.userService.getSearchResultUserById(this.id);
    if (!this.user) {
      this.userService.getUserById(this.id)
        .subscribe(data => this.user = data);
    }
  }

  showEditEntityForm () {
    const expComponent =  this.componentFactory.getComponent(AddEditEntityComponent, this.addEditContainerRef);
    expComponent.instance._ref = expComponent;
    expComponent.instance._currentUser = this.user;
  }

  editUser() {
    this.showEditEntityForm();
  }

  ngAfterViewChecked(): void {
    if (this.updatedUser && this.user["_links"].self.href == this.updatedUser.link) {
      let links = this.user["_links"];
      this.user = this.updatedUser;
      this.user["_links"] = links;
    }
    this.cdr.detectChanges();
  }

}
