import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input, OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AddEditEntityComponent} from "../add-edit-entity/add-edit-entity.component";
import {EntityList} from "../entity-list/entity-list.component";
import {PaginationService} from "../../services/pagination.service";
declare var $ : any;

@Component({
  selector: 'single-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit, OnDestroy {
  @Input() entity: User;
  @Input() editForm: ViewContainerRef;
  @Input() entityListComponent: EntityList;
  updatedUser: User;
  errorList: any;

  constructor(private userService: UserService,
              private paginationService: PaginationService,
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

  showEditEntityForm () {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddEditEntityComponent);
    this.editForm.clear();
    const expComponent =  this.editForm.createComponent(factory);
    expComponent.instance._ref = expComponent;
    expComponent.instance._currentUser = this.entity;
    this.cdr.detectChanges();
  }

  editUser() {
    this.showEditEntityForm();
  }

  removeUser() {
    let self = this;
    $.confirm({
      animation: 'top',
      closeAnimation: 'top',
      title: 'Delete Confirmation',
      content: 'Do you really want to delete '
      + '<text class="userName">' + this.entity.firstName + '</text>' + '?',
      draggable: false,
      closeIcon: true,
      buttons: {
        confirm: {
          btnClass: 'btn-danger',
          action: function () {
            self.userService.deleteUser(self.entity, self.entity["_links"].self.href)
              .subscribe(
                () => {
                  let lastUserOnPage = self.entityListComponent.entityList.length === 1;
                  if (!lastUserOnPage) {
                    // self._removeUserFromUi();
                    self.getPageAfterRemove(self.entityListComponent.page.number);
                  } else {
                    self.getPageAfterRemove(self.entityListComponent.page.number -1);
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
  };

  private getPageAfterRemove(pageNumber: number) {
    this.paginationService.getPageByNumber(pageNumber)
      .subscribe(
        data => {
          this.entityListComponent.entityList = this.entityListComponent.extractUsers(data);
          this.entityListComponent.links = this.entityListComponent.extractLinks(data);
          this.entityListComponent.page = this.entityListComponent.extractPage(data);
        },
        () => error => this.errorList = error.error,
      )
  }

  private _removeUserFromUi() {
    let entityList = this.editForm["_view"].component.entityList;
    let userIndex = entityList.indexOf(this.entity);
    entityList.splice(userIndex, 1)
  }
}
