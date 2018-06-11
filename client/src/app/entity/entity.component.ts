import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
import {AddEntityComponent} from "../add-entity/add-entity.component";
declare var $ : any;

@Component({
  selector: 'single-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit, AfterViewChecked {
  @Input() entity: User;
  @Input() editForm: ViewContainerRef;
  updatedUser: User;

  constructor(private userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.userService.changedUser.subscribe(user => this.updatedUser = user);
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  }

  showAddEntityForm () {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddEntityComponent);
    this.editForm.clear();
    const expComponent =  this.editForm.createComponent(factory);
    expComponent.instance._ref = expComponent;
    expComponent.instance._currentUser = this.entity;
    this.cdr.detectChanges();
  }

  editUser() {
    this.showAddEntityForm();
  }

  ngAfterViewChecked(): void {
    if (this.updatedUser && this.entity["_links"].self.href == this.updatedUser.link) {
      let links = this.entity["_links"];
      this.entity = this.updatedUser;
      this.entity._links = links;
    }
    this.cdr.detectChanges();
  }
}
