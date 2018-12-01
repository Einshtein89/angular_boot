import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorage} from "../../services/auth/token.storage";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private tokenStorage: TokenStorage) { }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/main/login']);
  }
}
