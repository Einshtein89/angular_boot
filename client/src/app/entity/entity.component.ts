import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input, OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
import {AddEditEntityComponent} from "../add-edit-entity/add-edit-entity.component";
declare var $ : any;

@Component({
  selector: 'single-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() entity: User;
  @Input() editForm: ViewContainerRef;
  updatedUser: User;
  errorList: any;

  constructor(private userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.userService.changedUser.subscribe(user => this.updatedUser = user);
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  }

  ngOnDestroy() {
  }

  showAddEntityForm () {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddEditEntityComponent);
    this.editForm.clear();
    const expComponent =  this.editForm.createComponent(factory);
    expComponent.instance._ref = expComponent;
    expComponent.instance._currentUser = this.entity;
    this.cdr.detectChanges();
  }

  editUser() {
    this.showAddEntityForm();
  }

  removeUser() {
    var self = this;
    $.confirm({
      animation: 'top',
      closeAnimation: 'top',
      title: 'Delete Confirmation',
      content: 'Do you really want to delete '
      + '<text class="userName">' + this.entity.firstName + '</text>' + '?',
      draggable: false,
      closeIcon: true,
      // container: '.main',
      // type: 'red',
      buttons: {
        confirm: {
          btnClass: 'btn-danger',
          action: function () {
            self.userService.deleteUser(self.entity, self.entity["_links"].self.href)
              .subscribe(
                () => self._removeUserFromUi(),
                error => self.errorList = error.error
              );
          }
        },
        cancel: {
          btnClass: 'btn-default',
          action: function () {
          }
        }
      }
    });
  }

  private _removeUserFromUi() {
    let entityList = this.editForm["_view"].component.entityList;
    let userIndex = entityList.indexOf(this.entity);
    entityList.splice(userIndex, 1)
  }

  ngAfterViewChecked(): void {
    if (this.updatedUser && this.entity["_links"].self.href == this.updatedUser.link) {
      let links = this.entity["_links"];
      this.entity = this.updatedUser;
      this.entity["_links"] = links;
    }
    this.cdr.detectChanges();
  }


}
