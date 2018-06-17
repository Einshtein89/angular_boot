import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export const USERS_API_URL = "";

@Injectable()
export class PaginationService {

  constructor(private http:HttpClient,
              @Inject(USERS_API_URL) private userUrl: string) {
  }

  getPageByNumber(page: number, pageSize: number = 10) {
    let params: string = [
      `size=${pageSize}`,
      `page=${page}`
    ].join('&');
    let queryUrl: string =`${this.userUrl}?${params}`;
    return this.http.get(queryUrl);
  }

  getPageByLink(pageLink: string) {
    return this.http.get(pageLink);
  }
}
