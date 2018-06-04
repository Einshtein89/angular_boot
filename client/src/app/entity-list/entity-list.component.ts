import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {User} from "../model/user.model";
import {UserService} from "../service/user.service";
import {AddEntityComponent} from "../add-entity/add-entity.component";
@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityList implements OnInit, OnDestroy, AfterViewChecked {
  entityList: User[] = [];
  loading: boolean;
  statusCode: number;
  user: User;
  links: any;
  @ViewChild('addEntity', {read: ViewContainerRef}) viewContainerRef;

  constructor(private userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private cdr: ChangeDetectorRef) {
  }


  showAddEntityForm () {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddEntityComponent);
    const expComponent =  this.viewContainerRef.createComponent(factory);
    expComponent.instance._ref = expComponent;
  }

  ngOnInit() {
    if(!this.userService.entityList) {
      this.getAllUsers();
    } else {
       this.entityList = this.userService.entityList;
    }
  }

  ngOnDestroy() {
    this.userService.entityList = this.entityList;
  }

  getAllUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.entityList = this.extractUsers(data); console.log(data);
          this.links = this.extractLinks(data);},
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }

  private extractUsers(data: any) {
    let users = data["_embedded"].users;
    return users;
  }

  private extractLinks(data: any) {
    let links = data["_links"];
    return links;
  }

  ngAfterViewChecked(): void {
    if (this.userService.entityList && this.entityList.length != this.userService.entityList.length) {
      this.ngOnInit();
      this.cdr.detectChanges();
    }
  }
}
