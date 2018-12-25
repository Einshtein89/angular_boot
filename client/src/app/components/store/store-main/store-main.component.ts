import { Component, OnInit } from '@angular/core';
import {BookService} from "../../../services/book/book.service";
import {Book} from "../../../models/book.model";
import {CatalogService} from "../../../services/book/catalog.service";
import {Catalog} from "../../../models/catalog.model";

@Component({
  selector: 'store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.less']
})
export class StoreMainComponent implements OnInit {
  private loading: boolean;
  private statusCode: number;
  private catalogs: Array<Catalog> = [];
  private links: any;
  private page: any;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getAllCatalogs();
  }

  private getAllCatalogs() {
    this.catalogService.allCatalogsAsObservable.subscribe(catalogs => this.catalogs = catalogs);
    if (!this.catalogs) {
      this.loading = true;
      this.catalogService.getAllCatalogs().subscribe(data => {
          this.populateEntities(data)
        },
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
    }
  }

  populateEntities(data: Object) {
    this.catalogs = this.catalogService.extractCatalogs(data);
    this.links = this.catalogService.extractLinks(data);
    this.page = this.catalogService.extractPage(data);
  }
}
