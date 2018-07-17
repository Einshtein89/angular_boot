import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorage} from "../../services/auth/token.storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  return: string = '';

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorage) {
    this.message = '';
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/main/home');
  }

  login(username: string, password: string): void {
    this.message = '';
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.parseToken(data.token);
        this.router.navigateByUrl(this.return);
      },
      err => {
        if (err.status === 401) {
          this.message = 'Incorrect credentials.';
          setTimeout(function() {
            this.message = '';
          }.bind(this), 2500);
        }
      }
    );
  }

  parseToken(token : string) {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
  }

  logout(): boolean {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
    return false;
  }

}
