import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../model/user.model";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {assign} from "rxjs/util/assign";


export const USERS_API_URL = "";

@Injectable()
export class UserService {

  private options = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http:HttpClient,
              @Inject(USERS_API_URL) private userUrl: string) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(this.userUrl)
      .map(this.extractData)
      .catch(this.handleError)
  }

  createUser(user: User):Observable<number> {
    let headers = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    // let options = new RequestOptions({ options: options });
    return this.http.post(this.userUrl, user, this.options)
      .catch(this.handleError);
  }

  getUserById(userId: string): Observable<User> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new HttpParams();
    cpParams.append('id', userId);
    assign(this.options, { body: cpParams })
    // let options = new RequestOptions({ headers: cpHeaders, body: cpParams });
    return this.http.get(this.userUrl, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateUser(user: User):Observable<number> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.userUrl, user, this.options)
      // .map(success => success.status)
      .catch(this.handleError);
  }

  deleteUserById(userId: string): Observable<number> {
    // let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new HttpParams();
    cpParams.append('id', userId);
    assign(this.options, { body: cpParams })
    // let options = new RequestOptions({ headers: cpHeaders, body: cpParams });
    return this.http.delete(this.userUrl, this.options)
      // .map(success => success.status)
      .catch(this.handleError);
  }
  private extractData(res: HttpResponse<any>) : any {
    console.log(res);
    let body = res._embedded.users;
    return body;
  }
  private handleError (error: HttpResponse<any> | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
