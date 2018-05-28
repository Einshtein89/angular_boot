import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user.model";

@Component({
  selector: 'single-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  @Input() entity: User;
  isShowContent: boolean;

  constructor() { }

  ngOnInit() {
  }

  showHideContent() {
    this.isShowContent = !this.isShowContent;
  }
}
