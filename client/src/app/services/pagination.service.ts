import {Inject, Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export const USERS_API_URL = "";
export const DEFAULT_PAGE_SIZE = 0;

@Injectable()
export class PaginationService {

  currentPageSize: number = this.defaultPageSize;

  constructor(private http:HttpClient,
              @Inject(USERS_API_URL) private userUrl: string,
              @Inject(DEFAULT_PAGE_SIZE) public defaultPageSize: number) {
  }

  getPageByNumber(page: number) {
    let params: string = [
      `size=${this.currentPageSize ? this.currentPageSize : this.defaultPageSize}`,
      `page=${page}`
    ].join('&');
    let queryUrl: string =`${this.userUrl}?${params}`;
    return this.http.get(queryUrl);
  }

  getPageByLink(pageLink: string) {
    return this.http.get(pageLink);
  }
}
