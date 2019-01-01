import {Inject, Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export const USERS_API_URL = "";
export const DEFAULT_PAGE_SIZE = 0;
export const DEFAULT_SORT = "";
export const BOOKS_API_URL = 'http://localhost:3000/books';

@Injectable()
export class PaginationService {

  currentPageSize: number = this.defaultPageSize;
  sortBy: string = "";
  booksUrl: string = BOOKS_API_URL;

  constructor(private http:HttpClient,
              @Inject(USERS_API_URL) private userUrl: string,
              @Inject(DEFAULT_PAGE_SIZE) public defaultPageSize: number) {
    this.urls();
  }

  getPageByNumber(page: number, key: string, sortOption?:string, specialLink?: string) {
    let params: string = [
      `size=${this.currentPageSize ? this.currentPageSize : this.defaultPageSize}`,
      `page=${page}`,
      `sort=${sortOption}`
    ].join('&');
    let queryUrl: string = specialLink ? specialLink : `${this.urls().get(key)}?${params}`;
    return this.http.get(queryUrl);
  }

  getPageByLink(pageLink: string) {
    return this.http.get(pageLink);
  }

  private urls() {
    let urls = new Map();
    urls.set("user", this.userUrl);
    urls.set("book", this.booksUrl);
    return urls;
  }
}
