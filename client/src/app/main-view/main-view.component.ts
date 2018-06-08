import { Component, OnInit } from '@angular/core';
declare var $ : any;
import * as bootstrap from "bootstrap";
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $('.ui.modal').modal('show');
  }

}
