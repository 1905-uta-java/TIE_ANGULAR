import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackpackComponent } from './components/backpack/backpack.component';
import { TeamInfoComponent } from './components/teamInfo/teamInfo.component';

const routes: Routes = [{
  path:'backpack',
  component: BackpackComponent
},{
  path:'teamInfo',
  component: TeamInfoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
