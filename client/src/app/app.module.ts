import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EntityList } from './components/entity-list/entity-list.component';
import { EntityComponent } from './components/entity/entity.component';
import { AddEditEntityComponent } from './components/add-edit-entity/add-edit-entity.component';
import {UserService} from "./services/user.service";
import {constants} from "./constants/constants";
import {AppRoutingModule} from "./router/router.module";
import { HomeComponent } from './components/home-component/home.component';
import { SecondChildComponent } from './components/routeTest/second-child-component/second-child.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import * as bootstrap from "bootstrap";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/pagination/pagination.component';
import {PaginationService} from "./services/pagination.service";
import { EntitiesPerPageComponent } from './components/pagination/entities-per-page/entities-per-page.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatSelectModule } from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from '@angular/material/list';
import {AuthGuard} from "./auth/auth-guard.service";
import {AuthService} from "./auth/auth.service";
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultComponent } from './components/search/search-result/search-result.component';
import { SearchResultListComponent } from './components/search/search-result-list/search-result-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
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
    UserInfoComponent
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
    AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [AddEditEntityComponent, SearchResultListComponent]
})
export class AppModule { }
