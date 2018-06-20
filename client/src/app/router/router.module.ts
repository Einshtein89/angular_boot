import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntityList} from "../components/entity-list/entity-list.component";
import {HomeComponent} from "../components/home-component/home.component";
import {SecondChildComponent} from "../components/routeTest/second-child-component/second-child.component";
import {MainViewComponent} from "../components/main-view/main-view.component";
import {PaginationComponent} from "../components/pagination/pagination.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {LoginComponent} from "../components/login/login.component";
import {LogoutComponent} from "../components/logout/logout.component";

export const paginationRoutes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: 'full' },
  { path: 'first', component: EntityList, pathMatch: 'full' },
  { path: 'last', component: EntityList, pathMatch: 'full' }
];

export const childRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'second', component: SecondChildComponent, pathMatch: 'full' },
  { path: 'allUsers', component: EntityList, canActivate: [AuthGuard] },
  // { path: 'allUsers', redirectTo: 'allUsers/first', pathMatch: 'full' },d
  // { path: 'allUsers/first', component: EntityList },
  // { path: 'allUsers/:page', component: EntityList }
];

const routes: Routes = [
  { path: '', redirectTo: '/main/home', pathMatch: 'full' },
  { path: 'main', component: MainViewComponent, children: childRoutes },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  // { path: 'projects', component: ProjectsOverviewComponent, pathMatch: 'full'  },
  // { path: 'project/:projectid', component: ProjectItemComponent, pathMatch: 'full'  },
  // { path: '**', component: MainViewComponent, pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
