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

@NgModule({
  declarations: [
    AppComponent,
    EntityList,
    EntityComponent,
    AddEntityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    constants],
  bootstrap: [AppComponent]
})
export class AppModule { }
