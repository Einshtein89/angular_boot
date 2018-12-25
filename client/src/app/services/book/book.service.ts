import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {User} from "../../models/user.model";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Book} from "../../models/book.model";
import {CatalogService} from "./catalog.service";

export const BOOKS_API_URL = 'http://localhost:3000/books';
export const DEFAULT_PAGE_SIZE = 10;

@Injectable()
export class BookService {
  public entityList: User[];
  private options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private allBooks = new BehaviorSubject<any>(null);
  public allBooksAsObservable = this.allBooks.asObservable();
  public searchResults: User[];
  private bookUrl: string = BOOKS_API_URL;
  private defaultPageSize: number = DEFAULT_PAGE_SIZE;

  constructor(private http: HttpClient,
              private catalogService: CatalogService) {
  }

  getAllBooks() {
    let params: string = [
      `size=${this.defaultPageSize}`
    ].join('&');
    return this.http.get(this.bookUrl + `?${params}`)
      .do((res) => {
          let books = this.extractBooks(res);
          books.forEach((book) => this.catalogService.getCatalogByBook(book)
            .subscribe((catalog) => book['catalog'] = catalog));
          this.allBooks.next(books);

      })
      .catch(this._handleError)
  }

  public extractBooks(res: any): any {
    let result = [];
    if (res) {
      let body = res["_embedded"].books;
      if (body instanceof Array) {
        body.forEach((book) => result.push(new Book(book)))
      }
    }
    return result;
  }

  private _handleError(error: HttpResponse<any> | any) {
    return Observable.throw(error);
  }


  public extractLinks(data: any) {
    return data["_links"];
  }

  public extractPage(data: any) {
    return data["page"];
  }


}
