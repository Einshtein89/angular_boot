import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EntityList } from './entity-list/entity-list.component';
import { EntityComponent } from './entity/entity.component';
import { AddEntityComponent } from './add-entity/add-entity.component';
import {UserService} from "./service/user.service";
import {constants} from "./constants/constants";
import {AppRoutingModule} from "./router/router.module";
import { FirstChildComponent } from './routeTest/first-child-component/first-child.component';
import { SecondChildComponent } from './routeTest/second-child-component/second-child.component';
import { TopComponent } from './routeTest/top-component/top.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityList,
    EntityComponent,
    AddEntityComponent,
    FirstChildComponent,
    SecondChildComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    EntityList,
    constants],
  bootstrap: [AppComponent],
  entryComponents: [AddEntityComponent]
})
export class AppModule { }
