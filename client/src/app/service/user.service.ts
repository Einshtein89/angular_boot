import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {User} from "../model/user.model";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {assign} from "rxjs/util/assign";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export const USERS_API_URL = "";

@Injectable()
export class UserService {
  public entityList: User[];
  private options = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  private newUser = new BehaviorSubject<User>(null);
  private updatedUser = new BehaviorSubject<any>(null);
  addedUser = this.newUser.asObservable();
  changedUser = this.updatedUser.asObservable();

  constructor(private http:HttpClient,
              @Inject(USERS_API_URL) private userUrl: string) {
  }

  getAllUsers(): Observable<any> {
    let params: string = [
      `size=50`
    ].join('&');
    let queryUrl: string = `${this.userUrl}?${params}`;
    return this.http.get(queryUrl)
      // .map(this._extractData)
      .catch(this._handleError)
  }

  createUser(user: User):Observable<User> {
    // let headers = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    // let options = new RequestOptions({ options: options });
    // this.newUser.next(user);
    return this.http.post(this.userUrl, user, this.options)
      .do(() => this.newUser.next(user))
      .catch(this._handleError);
  }

  getUserById(userId: string): Observable<User> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new HttpParams();
    cpParams.append('id', userId);
    assign(this.options, { body: cpParams })
    // let options = new RequestOptions({ headers: cpHeaders, body: cpParams });
    return this.http.get(this.userUrl, this.options)
      .map(this._extractData)
      .catch(this._handleError);
  }

  updateUser(user: User, userUrl: string):Observable<User> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(userUrl, user, this.options)
      .do(() => {
        user.link = userUrl;
        this.updatedUser.next(user)
      })
      .catch(this._handleError);
  }

  deleteUser(user: User, userUrl: string): Observable<User> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let cpParams = new HttpParams();
    // cpParams.append('id', 2);
    // assign(this.options, { body: cpParams })
    // let options = new RequestOptions({ headers: cpHeaders, body: cpParams });
    return this.http.delete(userUrl, this.options)
      .catch(this._handleError);
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
