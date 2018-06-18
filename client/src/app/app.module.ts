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
import { FirstChildComponent } from './components/routeTest/first-child-component/first-child.component';
import { SecondChildComponent } from './components/routeTest/second-child-component/second-child.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import * as bootstrap from "bootstrap";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './components/pagination/pagination.component';
import {PaginationService} from "./services/pagination.service";
import { EntitiesPerPageComponent } from './components/pagination/entities-per-page/entities-per-page.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityList,
    EntityComponent,
    AddEditEntityComponent,
    FirstChildComponent,
    SecondChildComponent,
    MainViewComponent,
    PaginationComponent,
    EntitiesPerPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserService,
    PaginationService,
    EntityList,
    constants],
  bootstrap: [AppComponent],
  entryComponents: [AddEditEntityComponent, PaginationComponent]
})
export class AppModule { }
