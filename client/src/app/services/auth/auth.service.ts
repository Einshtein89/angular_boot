import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {TokenStorage} from "./token.storage";

const APP_URL = "http://localhost:3000";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage) { }

  login(email: string, password: string): Observable<any> {
    const credentials = {username: email, password: password};
    return this.http.post(APP_URL + '/token/generate-token', credentials);
  }

  isLoggedIn(): boolean {
    return this.tokenStorage.getToken() !== null;
  }

  isAdmin(): boolean {
    return this.tokenStorage.getUserRoles().includes("ROLE_ADMIN");
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];



