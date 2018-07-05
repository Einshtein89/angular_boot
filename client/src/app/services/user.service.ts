import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {assign} from "rxjs/util/assign";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as  _ from "underscore"

export const USERS_API_URL = "";
export const DEFAULT_PAGE_SIZE = 0;

@Injectable()
export class UserService {
  public entityList: User[];
  private options = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  private newUser = new BehaviorSubject<User>(null);
  private updatedUser = new BehaviorSubject<any>(null);
  addedUser = this.newUser.asObservable();
  changedUser = this.updatedUser.asObservable();
  public searchResults: User[];

  constructor(private http:HttpClient,
              @Inject(USERS_API_URL) private userUrl: string,
              @Inject(DEFAULT_PAGE_SIZE) private defaultPageSize: number) {
  }

  getAllUsers(url?: string): Observable<any> {
    let params: string = [
      `size=${this.defaultPageSize}`
    ].join('&');
    let queryUrl: string = url ? url : `${this.userUrl}?${params}`;
    return this.http.get(queryUrl)
      .catch(this._handleError)
  }

  createUser(user: User):Observable<User> {
    return this.http.post(this.userUrl, user, this.options)
      .do(() => this.newUser.next(user))
      .catch(this._handleError);
  }

  getUserById(userId: string): Observable<User> {
    let queryUrl: string = `${this.userUrl}/${userId}`;
    return this.http.get(queryUrl)
      .catch(this._handleError);
  }

  updateUser(user: User, userUrl: string):Observable<User> {
    return this.http.put(userUrl, user, this.options)
      .do(() => {
        user.link = userUrl;
        this.updatedUser.next(user)
      })
      .catch(this._handleError);
  }

  deleteUser(user: User, userUrl: string): Observable<User> {
    return this.http.delete(userUrl, this.options)
      .catch(this._handleError);
  }

  searchByFirstOrLastName(value: string) {
    let params: string = [
      `firstName=${value}`,
      `lastName=${value}`
    ].join('&');
    let queryUrl: string = `${this.userUrl}/search/findByFirstNameContainsOrLastNameContains?${params}`;
    return this.http.get(queryUrl)
      .catch(this._handleError)
  }

  getSearchResultUserById(id: string) : User {
    return _.find(this.searchResults, result => result.id == id)
  }

  private _extractData(res: HttpResponse<any>) : any {
    console.log(res);
    let body = res["_embedded"].users;
    return body;
}
  private _handleError (error: HttpResponse<any> | any) {
    console.error(error.message || error);
    return Observable.throw(error);
  }


}
