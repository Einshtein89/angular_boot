import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { EntityList } from './components/users/entity-list/entity-list.component';
import { EntityComponent } from './components/users/entity/entity.component';
import { AddEditEntityComponent } from './components/users/add-edit-entity/add-edit-entity.component';
import {UserService} from "./services/user.service";
import {constants} from "./constants/constants";
import {AppRoutingModule} from "./router/router.module";
import { HomeComponent } from './components/home-component/home.component';
import { SecondChildComponent } from './components/second-child-component/second-child.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import * as bootstrap from "bootstrap";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/users/pagination/pagination.component';
import {PaginationService} from "./services/pagination.service";
import { EntitiesPerPageComponent } from './components/users/pagination/entities-per-page/entities-per-page.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatSelectModule } from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from '@angular/material/list';
import {AuthGuard} from "./services/auth/auth-guard.service";
import {AuthService} from "./services/auth/auth.service";
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SortingComponent } from './components/users/sorting/sorting.component';
import { SearchComponent } from './components/users/search/search.component';
import { SearchResultComponent } from './components/users/search/search-result/search-result.component';
import { SearchResultListComponent } from './components/users/search/search-result-list/search-result-list.component';
import { UserInfoComponent } from './components/users/user-info/user-info.component';
import { ComponentFactory } from './component-factory/component-factory';
import {EditDeleteUserService} from "./services/edit-delete-user.service";
import {TokenStorage} from "./services/auth/token.storage";
import {Interceptor} from "./services/auth/interceptor";
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
@NgModule({
  declarations: [
    AppComponent,
    EntityList,
    EntityComponent,
    AddEditEntityComponent,
    HomeComponent,
    SecondChildComponent,
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
    CabinetComponent
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
    MatListModule
  ],
  providers: [
    UserService,
    PaginationService,
    EntityList,
    constants,
    AuthService,
    AuthGuard,
    ComponentFactory,
    EditDeleteUserService,
    TokenStorage,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true
    }],
  bootstrap: [AppComponent],
  entryComponents: [AddEditEntityComponent, SearchResultListComponent]
})
export class AppModule { }
