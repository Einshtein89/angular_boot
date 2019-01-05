import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorage} from "../../../services/auth/token.storage";
import {TranslateService} from "@ngx-translate/core";
declare var $ : any;

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  // private userRoles: string[];
  private languages: Map<string, string> = new Map<string, string>();
  private localeUpdated: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private tokenStorage: TokenStorage,
              public translate: TranslateService) { }

  ngOnInit() {
    // this.userRoles = this.tokenStorage.getUserRoles();
    this.languages.set('en', 'English');
    this.languages.set('ru', 'Russian');
    let langShortNames = Array.from(this.languages.keys());
    this.translate.addLangs(langShortNames);
    this.translate.setDefaultLang('en');
    if (!localStorage['language']) {
      localStorage['language'] = "en"
    }

    const browserLang = localStorage['language'] || "";
    this.translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['.']);
  }

  private showMenu() {
    $(".language_menu").addClass('visible');
  }

  private hideMenu() {
    $(".language_menu").removeClass('visible');
  }

  getFullName(lang: string) {
    return this.languages.get(lang);
  }

  makeTranslation(lang: string) {
    this.translate.use(lang);
    localStorage['language'] = lang;
    // this.languageService.setLocale(lang).subscribe(
    //   () => this.localeUpdated = true
    // )
    // this.router.navigateByUrl(this.router.url + '?lang=' + lang);
  }

  removeActiveFromCatalogList() {
    if ($("#categoryName").length != 0) {
      $('.ui.vertical.menu').children().removeClass('active')
    }
  }
}
