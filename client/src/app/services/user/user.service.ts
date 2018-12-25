import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {User} from "../../models/user.model";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {assign} from "rxjs/util/assign";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as  _ from "underscore"
import {TranslateService} from "@ngx-translate/core";

export const USERS_API_URL = "";
export const REGISTER_API_URL = 'http://localhost:3000/signup';
export const DEFAULT_PAGE_SIZE = 0;
export const PASSWORD_CHANGE_URL = 'http://localhost:3000/changePassword';

@Injectable()
export class UserService {
  public entityList: User[];
  private options = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  private newUser = new BehaviorSubject<User>(null);
  private updatedUser = new BehaviorSubject<any>(null);
  private loggedInUser = new BehaviorSubject<any>(null);
  private allUsers = new BehaviorSubject<any>(null);
  addedUserAsObservable = this.newUser.asObservable();
  changedUserAsObservable = this.updatedUser.asObservable();
  loggedInUserAsObservable = this.loggedInUser.asObservable();
  allUsersAsObservable = this.allUsers.asObservable();
  public searchResults: User[];
  private registerUrl: string = REGISTER_API_URL;

  constructor(private http: HttpClient,
              private translate: TranslateService,
              @Inject(USERS_API_URL) private userUrl: string,
              @Inject(DEFAULT_PAGE_SIZE) private defaultPageSize: number) {
  }

  getAllUsers(url?: string): Observable<any> {
    let params: string = [
      `size=${this.defaultPageSize}`
    ].join('&');
    let queryUrl: string = url ? url : `${this.userUrl}?${params}`;
    return this.http.get(queryUrl)
      .do((res) => this.allUsers.next(this.extractUsers(res)))
      .catch(this._handleError)
  }

  createUser(user: User, isRegister: boolean):Observable<User> {
    return this.http.post(isRegister ? this.registerUrl : this.userUrl, user, this.options)
      .do(() => this.newUser.next(user))
      .catch(this._handleError);
  }

  getUserById(userId: string): Observable<User> {
    let queryUrl: string = `${this.userUrl}/${userId}`;
    return this.http.get(queryUrl)
      .catch(this._handleError);
  }
  getUserByUserName(userName: string) {
    let params: string = [
      `email=${userName}`
    ].join('&');
    let queryUrl: string = `${this.userUrl}/search/findByEmail?${params}`;
    return this.http.get(queryUrl)
      .do((user) => this.loggedInUser.next(user))
      .catch(this._handleError);
  }


  updateUser(user: User, userUrl: string):Observable<User> {
    return this.http.put(userUrl, user, this.options)
      .do((newUser) => {
        user.link = userUrl;
        this.updatedUser.next(newUser)
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

  changePassword(oldPassword: string, newPassword: string, userId: string): Observable<any> {
    return this.http.post(PASSWORD_CHANGE_URL, {oldPassword, newPassword, userId})
      .catch(this._handleError);
  }

  processErrors(errors: Array<string>) {
    let result = [];
    errors.forEach((error) => result.push(this.translate.instant("backend.validation.errors." + error)));
    return result;
  }

  public extractUsers(res: any) : any {
    let body = res["_embedded"].users;
    let result = [];
    if (body instanceof Array) {
      body.forEach((user) => result.push(new User(user)))
    }
    return result;
  }

  extractLinks(data: any) {
    let links = data["_links"];
    return links;
  }

  extractPage(data: any) {
    let page = data["page"];
    return page;
  }
  private _handleError (error: HttpResponse<any> | any) {
    return Observable.throw(error);
  }
}
