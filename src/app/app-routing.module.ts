import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Circle0Component} from "./circle0/circle0.component";
import {RipplesComponent} from "./ripples/ripples.component";


const routes: Routes = [
  {
    path: 'circle0',
    component: Circle0Component
  },
  {
    path: 'ripples',
    component: RipplesComponent
  },
  {
    path: '',
    redirectTo: '/circle0',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
