import {
  AfterContentInit,
  AfterViewChecked, AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
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
export class EntityComponent implements OnInit {
  @Input() entity: User;
  @Input() editForm: ViewContainerRef;

  constructor(private userService: UserService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
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
    console.log(this.entity);
  }
}
