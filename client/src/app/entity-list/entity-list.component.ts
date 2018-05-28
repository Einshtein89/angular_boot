import {Component, Input, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user.model";
@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityList implements OnInit {
  @Input() entityList: User[];
  loading: boolean;
  statusCode: number;

  constructor(private http: Http) {
  }

  ngOnInit() {
    // this.makeRequest();
  }

  makeRequest(): void {
    this.loading = true;
    this.http.request('http://localhost:3000/users')
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(
        data => {this.entityList = data, console.log(this.entityList)},
        errorCode =>  this.statusCode = errorCode,
        () => this.loading = false
      );
  }

  private extractData(res: Response) {
    let body = res.json()._embedded.users;
    console.log(res.json());
    return body;
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
