import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../services/book/book.service";
import {Book} from "../../../models/book.model";
import {CatalogService} from "../../../services/book/catalog.service";
import {Catalog} from "../../../models/catalog.model";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.less']
})
export class StoreMainComponent implements OnInit {
  private loading: boolean;
  private statusCode: number;
  private catalogs: Array<Catalog> = [];
  // private books: Array<Book> = [];
  private links: any;
  private page: any;

  constructor(private catalogService: CatalogService,
              private bookService: BookService) {
  }

  ngOnInit() {
    this.catalogService.allCatalogsAsObservable.subscribe(catalogs => this.catalogs = catalogs);
    // this.bookService.allBooksAsObservable.subscribe(books => this.books = books);
    if (!this.catalogs) {
      this.getAllCatalogs();
    }
  }

  private getAllCatalogs() {
    this.loading = true;
    this.catalogService.getAllCatalogs().subscribe(data => {
        this.populateEntities(data)
      },
      errorCode =>  this.statusCode = errorCode,
      () => this.loading = false
    );
  }

  populateEntities(data: Object) {
    this.catalogs = this.catalogService.extractCatalogs(data);
    this.links = this.catalogService.extractLinks(data);
    this.page = this.catalogService.extractPage(data);
  }

  filterByCategory(id: string) {
    this.bookService.getBooksByCategoryId(id).subscribe(
      res => {
        this.bookService.populateBooks(res, true);
        this.bookService.populateLinks(res);
        this.bookService.refreshFilteredView = false;
        this.links = this.catalogService.extractLinks(res);
        this.page = this.catalogService.extractPage(res);
      }

    );
  }

  makeActive($event) {
    $(event.target).siblings().removeClass('active');
    $(event.target).addClass('active');
  }
}
