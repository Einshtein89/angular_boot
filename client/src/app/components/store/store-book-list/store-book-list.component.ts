import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'store-book-list',
  templateUrl: './store-book-list.component.html',
  styleUrls: ['./store-book-list.component.css']
})
export class StoreBookListComponent implements OnInit {
  private category: string;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.category = params['category']; });
  }

  ngOnInit() {
  }

}
