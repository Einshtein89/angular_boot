import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntityList} from "../entity-list/entity-list.component";
import {FirstChildComponent} from "../routeTest/first-child-component/first-child.component";
import {SecondChildComponent} from "../routeTest/second-child-component/second-child.component";
import {MainViewComponent} from "../main-view/main-view.component";


export const childRoutes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: 'full' },
  { path: 'first', component: FirstChildComponent},
  { path: 'second', component: SecondChildComponent },
  { path: 'allUsers', component: EntityList, pathMatch: 'full' }
];

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainViewComponent, children: childRoutes },
  // { path: 'projects', component: ProjectsOverviewComponent, pathMatch: 'full'  },
  // { path: 'project/:projectid', component: ProjectItemComponent, pathMatch: 'full'  },
  // { path: '**', component: MainViewComponent, pathMatch: 'full'  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
