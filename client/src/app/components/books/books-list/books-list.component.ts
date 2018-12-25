import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Book} from "../../../models/book.model";
import {BookService} from "../../../services/book/book.service";
import {CatalogService} from "../../../services/book/catalog.service";

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksList implements OnInit, AfterViewChecked {
  private loading: boolean;
  private statusCode: number;
  private books: Array<Book> = [];
  private links: any;
  private page: any;
  name: string = 'book';

  constructor(private bookService: BookService,
              private catalogService: CatalogService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllBooks();
  }

  private getAllBooks() {
    this.bookService.allBooksAsObservable.subscribe(books => this.books = books);
    if (!this.books) {
      this.loading = true;
      this.bookService.getAllBooks().subscribe(data => {
          this.populateEntities(data);
          this.populateCatalogs();
        },
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
    }
  }

  private populateEntities(data: Object) {
    this.books = this.bookService.extractBooks(data);
    this.links = this.bookService.extractLinks(data);
    this.page = this.bookService.extractPage(data);
  }

  private populateCatalogs() {
    this.books.forEach((book) => {
      this.catalogService.getCatalogByBook(book).subscribe(
        (catalog) =>  {
          book.catalog = catalog;
        }
    );
    })
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
