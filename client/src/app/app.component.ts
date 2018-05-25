import {Component} from '@angular/core';
import {Entity} from "./model/entity";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  entities: Entity[] = [];

  constructor() {
  }
}
