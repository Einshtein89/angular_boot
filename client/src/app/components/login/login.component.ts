import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {ActivatedRoute, Router} from "@angular/router";

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
              private route: ActivatedRoute) {
    this.message = '';
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/main/home');
  }

  login(username: string, password: string): boolean {
    this.message = '';
    if (!this.authService.login(username, password)) {
      this.message = 'Incorrect credentials.';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
      return false;
    } else {
      this.router.navigateByUrl(this.return);
      return true;
    }
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
