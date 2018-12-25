import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {User} from "../../../models/user.model";
import {EntityList} from "../../users/entity-list/entity-list.component";
import {Book} from "../../../models/book.model";
import {BooksList} from "../books-list/books-list.component";
import {ImageService} from "../../../services/user/image.service";
import {CatalogService} from "../../../services/book/catalog.service";

@Component({
  selector: 'book-single',
  templateUrl: './book-single.component.html',
  styleUrls: ['./book-single.component.css']
})
export class BookSingleComponent implements OnInit {
  @Input() book: Book;
  @Input() editForm: ViewContainerRef;
  @Input() bookListComponent: BooksList;
  imgSrc: any;

  constructor(private imageService: ImageService,
              private catalogService: CatalogService) {
  }

  ngOnInit() {
    // this.catalogService.bookCatalogsAsObservable.subscribe(catalog => this.book.catalog = catalog);
    this.imgSrc = this.imageService.getImgSrc(this.book);
  }

  getUserPhoto() {
    return this.imgSrc;
  }
}
