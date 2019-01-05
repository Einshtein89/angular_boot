import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { EntityList } from './components/users/entity-list/entity-list.component';
import { EntityComponent } from './components/users/entity/entity.component';
import { AddEditEntityComponent } from './components/users/add-edit-entity/add-edit-entity.component';
import {UserService} from "./services/user/user.service";
import {constants} from "./constants/constants";
import {AppRoutingModule} from "./router/router.module";
import { MainPageComponent } from './components/main-page/main-page.component';
import { StoreMainComponent } from './components/store/store-main/store-main.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import * as bootstrap from "bootstrap";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import {PaginationService} from "./services/pagination.service";
import { EntitiesPerPageComponent } from './components/common/pagination/entities-per-page/entities-per-page.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatSelectModule } from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from '@angular/material/list';
import {AdminGuard} from "./services/auth/admin-guard.service";
import {AuthService} from "./services/auth/auth.service";
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SortingComponent } from './components/common/sorting/sorting.component';
import { SearchComponent } from './components/users/search/search.component';
import { SearchResultComponent } from './components/users/search/search-result/search-result.component';
import { SearchResultListComponent } from './components/users/search/search-result-list/search-result-list.component';
import { UserInfoComponent } from './components/users/user-info/user-info.component';
import { ComponentFactory } from './component-factory/component-factory';
import {EditDeleteUserService} from "./services/user/edit.delete.user.service";
import {TokenStorage} from "./services/auth/token.storage";
import {Interceptor} from "./services/auth/interceptor";
import { RegisterComponent } from './components/users/register/register.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { CabinetComponent } from './components/users/cabinet/myCabinet/cabinet.component';
import {FormCreateService } from './services/form.create.service';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LanguageService} from 'app/services/language.service';
import { ImageUploadModule } from "angular2-image-upload";
import {ImageService} from "./services/user/image.service";
import {UserUtils} from "./utils/users/user.utils";
import {UserGuard} from "./services/auth/user-guard.service";
import { CabinetMainComponent } from './components/users/cabinet/cabinet-main/cabinet-main.component';
import { MyOrdersComponent } from './components/users/cabinet/myOrders/my-orders.component';
import {SlideshowModule} from "ng-simple-slideshow";
import {BookService} from "./services/book/book.service";
import { BooksList } from './components/books/books-list/books-list.component';
import { BookSingleComponent } from './components/books/book-single/book-single.component';
import { StoreBookListComponent } from './components/store/store-book-list/store-book-list.component';
import {CatalogService} from "./services/book/catalog.service";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    EntityList,
    EntityComponent,
    AddEditEntityComponent,
    MainPageComponent,
    StoreMainComponent,
    MainViewComponent,
    PaginationComponent,
    EntitiesPerPageComponent,
    LoginComponent,
    LogoutComponent,
    SortingComponent,
    SearchComponent,
    SearchResultComponent,
    SearchResultListComponent,
    UserInfoComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    CabinetComponent,
    CabinetMainComponent,
    MyOrdersComponent,
    BooksList,
    BookSingleComponent,
    StoreBookListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ImageUploadModule.forRoot(),
    SlideshowModule
  ],
  providers: [
    UserService,
    PaginationService,
    BookService,
    CatalogService,
    EntityList,
    constants,
    AuthService,
    AdminGuard,
    UserGuard,
    ComponentFactory,
    EditDeleteUserService,
    TokenStorage,
    FormCreateService,
    LanguageService,
    ImageService,
    UserUtils,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      deps: [TokenStorage, Router, ActivatedRoute],
      multi : true
    }],
  bootstrap: [AppComponent],
  entryComponents: [AddEditEntityComponent, SearchResultListComponent]
})
export class AppModule { }
