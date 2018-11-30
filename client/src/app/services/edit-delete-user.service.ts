import {PaginationService} from "./pagination.service";
import {ChangeDetectorRef, Injectable, ViewContainerRef} from "@angular/core";
import {UserService} from "./user.service";
import {ComponentFactory} from "../component-factory/component-factory";
import {AddEditEntityComponent} from "../components/add-edit-entity/add-edit-entity.component";
import {User} from "../models/user.model";
declare var $ : any;

@Injectable()
export class EditDeleteUserService {

  constructor(private userService: UserService,
              private paginationService: PaginationService,
              private componentFactory: ComponentFactory) {}


  showEditEntityForm (entity: User, editForm: ViewContainerRef, isModal: boolean) {
    const expComponent =  this.componentFactory.getComponent(AddEditEntityComponent, editForm);
    expComponent.instance._ref = expComponent;
    expComponent.instance._isModal = isModal;
    expComponent.instance._currentUser = entity;
  }

  updateCurrentUser(component: any){
    if (component.updatedUser && component.entity["_links"].self.href == component.updatedUser.link) {
      let links = component.entity["_links"];
      component.entity = component.updatedUser;
      component.entity["_links"] = links;
    }
  }

  deleteUser(self) {
    $.confirm({
      animation: 'top',
      closeAnimation: 'top',
      title: 'Delete Confirmation',
      content: 'Do you really want to delete '
      + '<text class="userName">' + self.entity.firstName + '</text>' + '?',
      draggable: false,
      closeIcon: true,
      buttons: {
        confirm: {
          btnClass: 'btn-danger',
          action: function () {
            self.userService.deleteUser(self.entity, self.entity["_links"].self.href)
              .subscribe(
                () => {
                  if (!self.entityListComponent) {
                    self.getPageAfterRemove(0);
                  } else {
                    let lastUserOnPage = self.entityListComponent.entityList.length === 1;
                    if (!lastUserOnPage) {
                      // self._removeUserFromUi();
                      self.getPageAfterRemove(self.entityListComponent.page.number);
                    } else {
                      self.getPageAfterRemove(self.entityListComponent.page.number -1);
                    }
                  }
                },
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
}
