import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackpackComponent } from './components/backpack/backpack.component';
import { TeamInfoComponent } from './components/teamInfo/teamInfo.component';
import { TeamexplorerComponent } from './components/teamexplorer/teamexplorer.component';
import { RequestsComponent } from './components/requests/requests.component';

const routes: Routes = [{
  path:'backpack',
  component: BackpackComponent
},{
  path:'teamInfo',
  component: TeamInfoComponent
},{
  path:'teamexplorer',
  component: TeamexplorerComponent
},{
  path:'requests',
  component: RequestsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
