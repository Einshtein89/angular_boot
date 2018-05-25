import {Component, Input, OnInit} from '@angular/core';
import {Entity} from "../model/entity";

@Component({
  selector: 'single-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  @Input() entity: Entity;
  isShowContent: boolean;

  constructor() { }

  ngOnInit() {
  }

  showHideContent() {
    this.isShowContent = !this.isShowContent;
  }
}
