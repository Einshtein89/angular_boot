import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../services/auth/token.storage";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private userRoles: string[];

  constructor(private authService: AuthService,
              private router: Router,
              private tokenStorage: TokenStorage) { }

  ngOnInit() {
    this.userRoles = this.tokenStorage.getUserRoles();
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main/login']);
  }

}
