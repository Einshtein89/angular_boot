import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {DEFAULT_PAGE_SIZE, USERS_API_URL} from "./user.service";
import {User} from "../models/user.model";
import {Observable} from "rxjs";

export const LANGUAGE_API_URL = "";

@Injectable()
export class LanguageService {

  constructor(private http:HttpClient, @Inject(LANGUAGE_API_URL) private languageUrl: string) {
  }

  setLocale(lang: string):Observable<User> {
    let params: string = [
      `lang=${lang}`
    ].join('&');
    return this.http.get(`${this.languageUrl}?${params}`)
      .catch(this._handleError);
  }

  private _handleError (error: HttpResponse<any> | any) {
    console.error(error.message || error);
    return Observable.throw(error);
  }
}
