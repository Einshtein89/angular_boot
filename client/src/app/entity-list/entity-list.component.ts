import {Component, Input, OnInit} from '@angular/core';
import {Entity} from "../model/entity";

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityList implements OnInit {
  @Input() entityList: Entity[];


  constructor() { }

  ngOnInit() {
  }
}
