import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntityList} from "../entity-list/entity-list.component";
import {FirstChildComponent} from "../routeTest/first-child-component/first-child.component";
import {SecondChildComponent} from "../routeTest/second-child-component/second-child.component";
import {TopComponent} from "../routeTest/top-component/top.component";


export const childRoutes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: 'full' },
  { path: 'first', component: FirstChildComponent},
  { path: 'second', component: SecondChildComponent },
];

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: EntityList, children: childRoutes },
  // { path: 'test', component: TopComponent, children: childRoutes  },
  // { path: 'projects', component: ProjectsOverviewComponent, pathMatch: 'full'  },
  // { path: 'project/:projectid', component: ProjectItemComponent, pathMatch: 'full'  },
  // { path: '**', component: MainViewComponent, pathMatch: 'full'  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
