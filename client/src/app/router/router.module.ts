import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "../app.component";
import {AddEntityComponent} from "../add-entity/add-entity.component";
import {EntityList} from "../entity-list/entity-list.component";


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: EntityList, pathMatch: 'full' },
  { path: 'addUser', component: AddEntityComponent, pathMatch: 'full'  },
  // { path: 'projects', component: ProjectsOverviewComponent, pathMatch: 'full'  },
  // { path: 'project/:projectid', component: ProjectItemComponent, pathMatch: 'full'  },
  // { path: '**', component: MainViewComponent, pathMatch: 'full'  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
